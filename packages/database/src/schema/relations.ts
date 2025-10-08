import { relations } from 'drizzle-orm';
import { users } from './users';
import { guests } from './guests';
import { documents } from './documents';
import { documentServices } from './document_services';
import { serviceRequiredDocuments } from './service_required_documents';
import { applications } from './applications';
import { applicationUploadedFiles } from './application_uploaded_files';

/**
 * Define relationships between tables for Drizzle's relational query API
 * This enables type-safe joins and eager loading
 */

// Documents relations
export const documentsRelations = relations(documents, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [documents.createdBy],
    references: [users.id],
  }),
  services: many(documentServices),
  applications: many(applications),
}));

// Document Services relations
export const documentServicesRelations = relations(documentServices, ({ one, many }) => ({
  document: one(documents, {
    fields: [documentServices.documentId],
    references: [documents.id],
  }),
  requiredDocuments: many(serviceRequiredDocuments),
  applications: many(applications),
}));

// Service Required Documents relations
export const serviceRequiredDocumentsRelations = relations(serviceRequiredDocuments, ({ one, many }) => ({
  documentService: one(documentServices, {
    fields: [serviceRequiredDocuments.documentServiceId],
    references: [documentServices.id],
  }),
  uploadedFiles: many(applicationUploadedFiles),
}));

// Applications relations
export const applicationsRelations = relations(applications, ({ one, many }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
  guest: one(guests, {
    fields: [applications.guestId],
    references: [guests.id],
  }),
  document: one(documents, {
    fields: [applications.documentId],
    references: [documents.id],
  }),
  documentService: one(documentServices, {
    fields: [applications.documentServiceId],
    references: [documentServices.id],
  }),
  uploadedFiles: many(applicationUploadedFiles),
}));

// Application Uploaded Files relations
export const applicationUploadedFilesRelations = relations(applicationUploadedFiles, ({ one }) => ({
  application: one(applications, {
    fields: [applicationUploadedFiles.applicationId],
    references: [applications.id],
  }),
  serviceRequiredDocument: one(serviceRequiredDocuments, {
    fields: [applicationUploadedFiles.serviceRequiredDocumentId],
    references: [serviceRequiredDocuments.id],
  }),
  uploadedBy: one(users, {
    fields: [applicationUploadedFiles.uploadedBy],
    references: [users.id],
  }),
}));

// Users relations (extend existing)
export const usersRelations = relations(users, ({ many }) => ({
  createdDocuments: many(documents),
  applications: many(applications),
  uploadedFiles: many(applicationUploadedFiles),
}));

// Guests relations (extend existing)
export const guestsRelations = relations(guests, ({ many }) => ({
  applications: many(applications),
}));

