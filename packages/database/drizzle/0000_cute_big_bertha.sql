CREATE TABLE IF NOT EXISTS "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"id_token" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_uploaded_files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"service_required_document_id" uuid NOT NULL,
	"file_name" text NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" text NOT NULL,
	"r2_url" text NOT NULL,
	"r2_key" text NOT NULL,
	"r2_bucket" text NOT NULL,
	"file_index" integer DEFAULT 1 NOT NULL,
	"file_label" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"uploaded_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_number" text NOT NULL,
	"user_id" uuid,
	"guest_id" uuid,
	"document_id" uuid NOT NULL,
	"document_service_id" uuid NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"form_data" text,
	"government_fee" integer DEFAULT 0 NOT NULL,
	"service_fee" integer DEFAULT 0 NOT NULL,
	"total_amount" integer DEFAULT 0 NOT NULL,
	"payment_id" text,
	"payment_status" text DEFAULT 'pending',
	"payment_method" text,
	"paid_amount" integer,
	"payment_completed_at" timestamp,
	"zoho_lead_id" text,
	"zoho_sync_status" text DEFAULT 'pending',
	"zoho_synced_at" timestamp,
	"zoho_sync_error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"submitted_at" timestamp,
	"completed_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applications_application_number_unique" UNIQUE("application_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"government_fee" integer DEFAULT 0 NOT NULL,
	"service_fee" integer DEFAULT 0 NOT NULL,
	"total_amount" integer DEFAULT 0 NOT NULL,
	"estimated_days" integer,
	"form_fields" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"category" text NOT NULL,
	"image" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid,
	CONSTRAINT "documents_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	CONSTRAINT "guests_session_token_unique" UNIQUE("session_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"phone" text,
	"phone_verified" boolean DEFAULT false,
	"image" text,
	"profile_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_required_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_service_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"allowed_file_types" text[] DEFAULT pdf,jpg,png NOT NULL,
	"max_file_size" integer DEFAULT 5242880 NOT NULL,
	"max_files" integer DEFAULT 1 NOT NULL,
	"is_mandatory" boolean DEFAULT true NOT NULL,
	"sample_file_url" text,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_uploaded_files_application_id_idx" ON "application_uploaded_files" ("application_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_uploaded_files_service_req_doc_id_idx" ON "application_uploaded_files" ("service_required_document_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_uploaded_files_uploaded_at_idx" ON "application_uploaded_files" ("uploaded_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_uploaded_files_r2_key_idx" ON "application_uploaded_files" ("r2_key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "application_uploaded_files_app_req_idx" ON "application_uploaded_files" ("application_id","service_required_document_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_application_number_idx" ON "applications" ("application_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_user_id_idx" ON "applications" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_guest_id_idx" ON "applications" ("guest_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_status_idx" ON "applications" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_document_id_idx" ON "applications" ("document_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_service_id_idx" ON "applications" ("document_service_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_created_at_idx" ON "applications" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_submitted_at_idx" ON "applications" ("submitted_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_payment_status_idx" ON "applications" ("payment_status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "applications_zoho_lead_id_idx" ON "applications" ("zoho_lead_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_services_document_id_idx" ON "document_services" ("document_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_services_slug_idx" ON "document_services" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_services_is_active_idx" ON "document_services" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_services_document_slug_idx" ON "document_services" ("document_id","slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_slug_idx" ON "documents" ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_category_idx" ON "documents" ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_is_active_idx" ON "documents" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_display_order_idx" ON "documents" ("display_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_phone_idx" ON "users" ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_token_idx" ON "sessions" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_expires_at_idx" ON "sessions" ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "service_required_documents_service_id_idx" ON "service_required_documents" ("document_service_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "service_required_documents_is_active_idx" ON "service_required_documents" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "service_required_documents_display_order_idx" ON "service_required_documents" ("document_service_id","display_order");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_uploaded_files" ADD CONSTRAINT "application_uploaded_files_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_uploaded_files" ADD CONSTRAINT "application_uploaded_files_service_required_document_id_service_required_documents_id_fk" FOREIGN KEY ("service_required_document_id") REFERENCES "service_required_documents"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_uploaded_files" ADD CONSTRAINT "application_uploaded_files_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "guests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_document_service_id_document_services_id_fk" FOREIGN KEY ("document_service_id") REFERENCES "document_services"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_services" ADD CONSTRAINT "document_services_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_required_documents" ADD CONSTRAINT "service_required_documents_document_service_id_document_services_id_fk" FOREIGN KEY ("document_service_id") REFERENCES "document_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
