# DigiDocs Database Package

Enterprise-grade database layer for DigiDocs using **Drizzle ORM** with **Neon Postgres**.

## 🏗️ Architecture

- **ORM:** Drizzle ORM (Type-safe, performant)
- **Database:** Neon Postgres (Serverless, auto-scaling)
- **Connection:** HTTP adapter (optimized for serverless)
- **File Storage:** Cloudflare R2 (object URLs stored in DB)
- **Integration:** Zoho CRM (payment & verification)

---

## 📦 Installation

```bash
pnpm install
```

---

## 🔧 Environment Setup

Create `.env.local` in the root directory:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

---

## 🚀 Usage

### Import in Your App

```typescript
import { db } from '@repo/database/connection';
import { 
  applications, 
  documents, 
  users,
  eq,
  and,
  generateApplicationNumber 
} from '@repo/database/schema';
```

### Basic Queries

```typescript
// Insert
const [app] = await db.insert(applications).values({
  applicationNumber: generateApplicationNumber(),
  userId: user.id,
  documentId: 'doc-uuid',
  documentServiceId: 'service-uuid',
  status: 'draft',
}).returning();

// Select
const app = await db
  .select()
  .from(applications)
  .where(eq(applications.id, appId))
  .limit(1);

// Update
await db
  .update(applications)
  .set({ status: 'submitted' })
  .where(eq(applications.id, appId));

// Delete
await db
  .delete(applications)
  .where(eq(applications.id, appId));
```

### Relational Queries (Type-Safe Joins)

```typescript
// Get application with all related data
const application = await db.query.applications.findFirst({
  where: eq(applications.id, appId),
  with: {
    user: true,
    document: true,
    documentService: {
      with: {
        requiredDocuments: true,
      },
    },
    uploadedFiles: {
      with: {
        serviceRequiredDocument: true,
      },
    },
  },
});

// TypeScript knows all the nested types!
console.log(application.user.name);
console.log(application.documentService.requiredDocuments);
```

### Transactions

```typescript
await db.transaction(async (tx) => {
  const [app] = await tx.insert(applications).values({...}).returning();
  
  await tx.insert(applicationUploadedFiles).values({
    applicationId: app.id,
    ...fileData,
  });
});
```

---

## 📊 Database Commands

### Generate Migration Files

```bash
pnpm db:generate
```

This reads your schema and generates SQL migration files in `./drizzle/`.

### Apply Migrations

```bash
pnpm db:migrate
```

Applies pending migrations to your Neon database.

### Drizzle Studio (Database GUI)

```bash
pnpm db:studio
```

Opens a web-based GUI at `https://local.drizzle.studio` to explore your database.

### Push Schema (Development Only)

```bash
pnpm db:push
```

Directly pushes schema changes without creating migration files. **Use only in development.**

### Drop Tables

```bash
pnpm db:drop
```

⚠️ **Dangerous:** Drops all tables. Use with caution.

---

## 📋 Schema Overview

### Admin Tables (Configuration)
- `documents` - Document types (Passport, PAN, etc.)
- `document_services` - Services per document (New, Renewal, etc.)
- `service_required_documents` - Upload requirements

### User Tables (Runtime)
- `users` - Authenticated users
- `guests` - Guest sessions (pre-auth)
- `applications` - User applications (core entity)
- `application_uploaded_files` - Files in Cloudflare R2

### Authentication Tables
- `sessions` - User sessions
- `accounts` - Social/email auth
- `verifications` - Email/password reset tokens

**Full schema documentation:** [SCHEMA_DOCS.md](./SCHEMA_DOCS.md)

---

## 🎯 Example: Complete Application Flow

```typescript
import { db } from '@repo/database/connection';
import { 
  applications, 
  applicationUploadedFiles,
  generateApplicationNumber,
  APPLICATION_STATUS,
  eq 
} from '@repo/database/schema';

// 1. Create draft application
const [app] = await db.insert(applications).values({
  applicationNumber: generateApplicationNumber(),
  userId: user.id,
  documentId: passportDoc.id,
  documentServiceId: newApplicationService.id,
  status: APPLICATION_STATUS.DRAFT,
  governmentFee: 150000, // ₹1,500
  serviceFee: 150000,
  totalAmount: 300000,
  formData: JSON.stringify({
    fullName: "John Doe",
    dob: "1990-01-01",
  }),
}).returning();

// 2. Upload files to R2 and save references
const [file] = await db.insert(applicationUploadedFiles).values({
  applicationId: app.id,
  serviceRequiredDocumentId: photoRequirement.id,
  fileName: "photo.jpg",
  fileSize: 2048576,
  mimeType: "image/jpeg",
  r2Url: "https://files.digidocs.com/apps/abc/photo.jpg",
  r2Key: "applications/abc/photo.jpg",
  r2Bucket: "digidocs-files",
  fileIndex: 1,
  uploadedBy: user.id,
}).returning();

// 3. Update to pending payment
await db.update(applications)
  .set({ status: APPLICATION_STATUS.PENDING_PAYMENT })
  .where(eq(applications.id, app.id));

// 4. After payment, update and sync to Zoho
await db.update(applications)
  .set({
    paymentId: "ZOHO-PAY-123",
    paymentStatus: "completed",
    status: APPLICATION_STATUS.SUBMITTED,
    submittedAt: new Date(),
  })
  .where(eq(applications.id, app.id));

// 5. Get complete application for Zoho sync
const fullApp = await db.query.applications.findFirst({
  where: eq(applications.id, app.id),
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

// Send fullApp to Zoho CRM...
```

---

## 🛠️ Helper Functions

### Currency Conversion

```typescript
import { rupeesToPaise, paiseToRupees, formatCurrency } from '@repo/database/schema';

const paise = rupeesToPaise(150); // 15000
const rupees = paiseToRupees(15000); // 150
const formatted = formatCurrency(15000); // "₹150.00"
```

### Application Number Generation

```typescript
import { generateApplicationNumber } from '@repo/database/schema';

const appNumber = generateApplicationNumber(); // "DGDC-2024-00123"
```

### File Validation

```typescript
import { isFileTypeAllowed, formatFileSize } from '@repo/database/schema';

const allowed = isFileTypeAllowed('image/jpeg', ['jpg', 'png', 'pdf']); // true
const size = formatFileSize(2048576); // "2 MB"
```

---

## 🎨 Type Safety

All tables export TypeScript types:

```typescript
import type { 
  Application, 
  NewApplication,
  Document,
  DocumentService,
  ApplicationUploadedFile 
} from '@repo/database/schema';

// Use in function signatures
async function getApplication(id: string): Promise<Application | null> {
  return await db.query.applications.findFirst({
    where: eq(applications.id, id),
  });
}

// Use for inserts
const newApp: NewApplication = {
  applicationNumber: generateApplicationNumber(),
  userId: 'user-uuid',
  documentId: 'doc-uuid',
  documentServiceId: 'service-uuid',
  status: 'draft',
  // TypeScript ensures all required fields are present
};
```

---

## 🔍 Best Practices

### 1. Always Use Transactions for Multi-Table Operations

```typescript
await db.transaction(async (tx) => {
  await tx.insert(applications).values({...});
  await tx.insert(applicationUploadedFiles).values({...});
});
```

### 2. Use Prepared Statements for Repeated Queries

```typescript
const getUserApps = db.query.applications.findMany({
  where: eq(applications.userId, sql.placeholder('userId')),
}).prepare('get_user_apps');

// Reuse
const apps = await getUserApps.execute({ userId: 'user-uuid' });
```

### 3. Use Status Constants

```typescript
import { APPLICATION_STATUS, PAYMENT_STATUS } from '@repo/database/schema';

// Good
status: APPLICATION_STATUS.SUBMITTED

// Bad
status: 'submitted' // Typo-prone
```

### 4. Leverage Relational Queries

```typescript
// Instead of manual joins
const app = await db.query.applications.findFirst({
  where: eq(applications.id, appId),
  with: {
    user: true,
    document: true,
  },
});
```

### 5. Index Foreign Keys

All foreign keys are automatically indexed for optimal join performance.

---

## 📚 Additional Resources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Neon Docs](https://neon.tech/docs)
- [Schema Documentation](./SCHEMA_DOCS.md)
- [Cursor Rules](../../.cursorrules) - Neon + Drizzle best practices

---

## 🤝 Contributing

When adding new tables:

1. Create schema file in `src/schema/`
2. Export from `src/schema/index.ts`
3. Add relations in `src/schema/relations.ts`
4. Run `pnpm db:generate` to create migration
5. Update `SCHEMA_DOCS.md`

---

## 📝 License

See [LICENSE.txt](../../LICENSE.txt)
