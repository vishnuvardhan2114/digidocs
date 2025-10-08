# DigiDocs Database Schema Documentation

## Overview

The DigiDocs database schema is designed for a document service platform that allows users to apply for various government and legal documents through an online portal. The schema follows a multi-tenant architecture with support for both guest and authenticated users, integrated with Zoho CRM and Cloudflare R2 for file storage.

---

## Schema Architecture

### **Admin Setup Tables** (Configuration)

#### 1. `documents`
Main service categories offered by the platform.

**Purpose:** Admin-managed catalog of document types (e.g., Passport, PAN Card, E-Stamp)

**Key Fields:**
- `name` - Display name (e.g., "Passport Services")
- `slug` - URL-friendly identifier (e.g., "passport")
- `category` - Classification: "government", "legal", "identity", "business"
- `image` - Hero image URL for service page
- `isActive` - Enable/disable without deletion

**Relations:**
- Has many `documentServices`
- Has many `applications`

---

#### 2. `document_services`
Specific services available for each document type.

**Purpose:** Individual service offerings like "New Application", "Renewal", "Correction"

**Key Fields:**
- `documentId` - Parent document (FK)
- `governmentFee` - Government charges in paise
- `serviceFee` - Platform service charge in paise
- `totalAmount` - Total = governmentFee + serviceFee
- `estimatedDays` - Processing time estimate
- `formFields` - JSON schema for dynamic form generation

**Example:**
```json
{
  "documentId": "passport-uuid",
  "name": "New Passport Application",
  "governmentFee": 150000,  // ₹1,500
  "serviceFee": 150000,
  "totalAmount": 300000,    // ₹3,000
  "estimatedDays": 15
}
```

**Relations:**
- Belongs to `documents`
- Has many `serviceRequiredDocuments`
- Has many `applications`

---

#### 3. `service_required_documents`
Defines what documents users must upload for each service.

**Purpose:** Requirement specification for file uploads

**Key Fields:**
- `documentServiceId` - Parent service (FK)
- `name` - Document name (e.g., "Passport Size Photo")
- `description` - Plain text upload instructions
- `allowedFileTypes` - Array: ["pdf", "jpg", "png"]
- `maxFileSize` - Maximum bytes allowed
- `maxFiles` - Number of files (e.g., 2 for front/back)
- `isMandatory` - Required vs optional
- `sampleFileUrl` - Optional example file

**Example:**
```json
{
  "name": "Aadhar Card",
  "description": "Upload both front and back sides. Ensure all 12 digits are clearly visible.",
  "allowedFileTypes": ["pdf", "jpg", "png"],
  "maxFileSize": 5242880,  // 5MB
  "maxFiles": 2,
  "isMandatory": true
}
```

**Relations:**
- Belongs to `documentServices`
- Has many `applicationUploadedFiles`

---

### **User Journey Tables** (Runtime)

#### 4. `applications`
Core business entity - user's document service requests.

**Purpose:** Track applications from draft to completion

**Key Fields:**

**Ownership** (exactly one must be set):
- `userId` - Authenticated user (FK → users)
- `guestId` - Guest session (FK → guests)

**Service Selection:**
- `documentId` - Which document type
- `documentServiceId` - Which service

**Status Tracking:**
- `status` - Current state
  - `draft` - User filling form
  - `pending_payment` - Ready to pay
  - `submitted` - Payment completed, sent to Zoho
  - `processing` - Being processed in Zoho
  - `completed` - Service delivered
  - `rejected` / `cancelled`

**Form Data:**
- `formData` - JSON string of user responses
- `governmentFee`, `serviceFee`, `totalAmount` - Pricing snapshot

**Payment (Zoho):**
- `paymentId` - Zoho payment transaction ID
- `paymentStatus` - "pending", "completed", "failed"
- `paymentMethod` - "card", "upi", "netbanking", "wallet"
- `paymentCompletedAt` - Payment timestamp

**Zoho CRM Integration:**
- `zohoLeadId` - CRM Lead ID after sync
- `zohoSyncStatus` - "pending", "synced", "failed"
- `zohoSyncedAt` - Last sync timestamp
- `zohoSyncError` - Error details if sync fails

**Timeline:**
- `createdAt` - Application started
- `submittedAt` - Payment completed
- `completedAt` - Service delivered

**Constraints:**
- CHECK: Exactly one of `userId` or `guestId` must be set
- UNIQUE: `applicationNumber`

**Relations:**
- Belongs to `users` OR `guests`
- Belongs to `documents`
- Belongs to `documentServices`
- Has many `applicationUploadedFiles`

---

#### 5. `application_uploaded_files`
Files uploaded by users for their applications.

**Purpose:** Track all uploaded documents with Cloudflare R2 storage

**Key Fields:**

**File Info:**
- `fileName` - Original filename from user
- `fileSize` - Size in bytes
- `mimeType` - e.g., "image/jpeg", "application/pdf"

**Cloudflare R2 Storage:**
- `r2Url` - Public CDN URL (sent to Zoho)
- `r2Key` - Object key in R2 (for deletion)
- `r2Bucket` - Bucket name

**Metadata:**
- `fileIndex` - 1, 2, etc. (for front/back)
- `fileLabel` - "Front", "Back", "Page 1"

**Example:**
```json
{
  "fileName": "aadhar-front.jpg",
  "fileSize": 2048576,
  "mimeType": "image/jpeg",
  "r2Url": "https://files.digidocs.com/applications/abc-123/aadhar-front.jpg",
  "r2Key": "applications/abc-123/1735456789-x7k2m.jpg",
  "r2Bucket": "digidocs-files",
  "fileIndex": 1,
  "fileLabel": "Front"
}
```

**Relations:**
- Belongs to `applications`
- Belongs to `serviceRequiredDocuments`
- Belongs to `users` (uploadedBy)

---

## Data Flow

### **1. Admin Setup Flow**

```
Admin → Create Document ("Passport")
     → Create Service ("New Application")
     → Add Required Documents ("Photo", "Aadhar", etc.)
     → Set pricing (governmentFee + serviceFee)
```

### **2. User Application Flow**

```
1. User lands on site
   ├─ Authenticated? Use userId
   └─ Guest? Create guest session, use guestId

2. Select Document → Select Service
   ├─ Load document services
   └─ Show pricing

3. Create Application (status: 'draft')
   ├─ INSERT INTO applications
   └─ Lock pricing snapshot

4. Fill Form + Upload Documents
   ├─ Save formData as JSON
   ├─ Upload each file to Cloudflare R2
   └─ INSERT INTO application_uploaded_files

5. Checkout
   ├─ If guest → Show auth modal
   ├─ Sign up/Sign in
   └─ Migrate: UPDATE applications SET userId, guestId = NULL

6. Payment (Zoho)
   ├─ Create Zoho payment order
   ├─ UPDATE applications SET paymentId
   └─ Redirect to Zoho gateway

7. Payment Webhook
   ├─ UPDATE applications SET paymentStatus = 'completed'
   ├─ UPDATE status = 'submitted'
   └─ Trigger Zoho CRM sync

8. Sync to Zoho CRM
   ├─ Send user details
   ├─ Send application data
   ├─ Send R2 URLs of all documents
   └─ UPDATE zohoLeadId, zohoSyncStatus
```

### **3. Guest-to-User Migration**

```sql
-- When guest signs up
UPDATE applications
SET userId = 'new-user-uuid',
    guestId = NULL
WHERE guestId = 'guest-uuid';

DELETE FROM guests
WHERE id = 'guest-uuid';
```

---

## Key Design Decisions

### **1. Pricing in Smallest Unit (Paise)**
- Avoids floating-point precision issues
- `₹150.00` stored as `15000` paise
- Helper functions: `rupeesToPaise()`, `paiseToRupees()`

### **2. Pricing Snapshot**
- Fees copied to `applications` at creation
- Prevents retroactive price changes affecting existing applications

### **3. Dynamic Forms**
- `formFields` JSON schema enables form changes without migrations
- Example:
```json
{
  "fields": [
    {
      "name": "fullName",
      "type": "text",
      "label": "Full Name",
      "required": true
    },
    {
      "name": "dob",
      "type": "date",
      "label": "Date of Birth",
      "required": true
    }
  ]
}
```

### **4. Cloudflare R2 Storage**
- Files stored in R2 buckets
- Public URLs sent to Zoho CRM
- R2 keys stored for management/deletion
- CDN URLs for fast global access

### **5. No Status History Table**
- Application status history retrieved from Zoho CRM API
- Reduces database complexity
- Single source of truth in Zoho

---

## Indexes

Optimized for common query patterns:

**Documents:**
- `slug`, `category`, `isActive`, `displayOrder`

**Document Services:**
- `documentId`, `slug`, composite `(documentId, slug)`

**Applications:**
- `applicationNumber`, `userId`, `guestId`, `status`
- `documentId`, `documentServiceId`, `createdAt`
- `paymentStatus`, `zohoLeadId`

**Uploaded Files:**
- `applicationId`, `serviceRequiredDocumentId`
- Composite `(applicationId, serviceRequiredDocumentId)`
- `r2Key`, `uploadedAt`

---

## Helper Functions

See `schema/helpers.ts` for:
- `generateApplicationNumber()` - Unique ID generation
- `rupeesToPaise()` / `paiseToRupees()` - Currency conversion
- `formatCurrency()` - Display formatting
- `isFileTypeAllowed()` - Validation
- `formatFileSize()` - Display formatting

---

## Type Safety

All tables export TypeScript types:

```typescript
import { 
  Application, 
  NewApplication,
  Document,
  DocumentService 
} from '@repo/database/schema';

// Inferred select type
const app: Application = await db.query.applications.findFirst();

// Inferred insert type
const newApp: NewApplication = {
  documentId: '...',
  documentServiceId: '...',
  // TypeScript ensures all required fields
};
```

---

## Relational Queries

Use Drizzle's relational API for type-safe joins:

```typescript
const application = await db.query.applications.findFirst({
  where: eq(applications.id, applicationId),
  with: {
    user: true,
    document: true,
    documentService: true,
    uploadedFiles: {
      with: {
        serviceRequiredDocument: true,
      },
    },
  },
});
```

---

## Migration Commands

```bash
# Generate migration files
pnpm db:generate

# Apply migrations to database
pnpm db:migrate

# Open Drizzle Studio (GUI)
pnpm db:studio

# Push schema directly (development only)
pnpm db:push
```

---

## Environment Variables

Required in `.env.local`:

```env
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
R2_ENDPOINT="https://abc123.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="digidocs-files"
R2_PUBLIC_URL="https://files.digidocs.com"
```

---

## Best Practices

1. **Always use transactions** for multi-table operations
2. **Validate file types** before R2 upload
3. **Lock pricing** at application creation
4. **Use prepared statements** for repeated queries
5. **Batch R2 uploads** when possible
6. **Index foreign keys** for join performance
7. **Use status enums** from `helpers.ts` constants
8. **Handle Zoho sync failures** gracefully with retry logic

---

## Example Queries

### Create Application
```typescript
const [app] = await db.insert(applications).values({
  applicationNumber: generateApplicationNumber(),
  userId: user.id,
  documentId: 'passport-uuid',
  documentServiceId: 'new-app-uuid',
  status: APPLICATION_STATUS.DRAFT,
  governmentFee: 150000,
  serviceFee: 150000,
  totalAmount: 300000,
}).returning();
```

### Upload File
```typescript
const [file] = await db.insert(applicationUploadedFiles).values({
  applicationId: app.id,
  serviceRequiredDocumentId: 'req-uuid',
  fileName: 'photo.jpg',
  fileSize: 2048576,
  mimeType: 'image/jpeg',
  r2Url: 'https://files.digidocs.com/...',
  r2Key: 'applications/abc/photo.jpg',
  r2Bucket: 'digidocs-files',
  fileIndex: 1,
  uploadedBy: user.id,
}).returning();
```

### Get User Applications
```typescript
const apps = await db.query.applications.findMany({
  where: eq(applications.userId, user.id),
  orderBy: desc(applications.createdAt),
  with: {
    document: true,
    documentService: true,
  },
});
```

