-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'REVIEWED', 'APPROVED', 'REJECTED', 'CONTACTED');

-- CreateTable
CREATE TABLE "LoanApplication" (
    "id" TEXT NOT NULL,
    "practiceId" TEXT NOT NULL,
    "importo" INTEGER NOT NULL,
    "durata" INTEGER NOT NULL,
    "impiego" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "codiceFiscale" TEXT NOT NULL,
    "reddito" INTEGER NOT NULL,
    "finalita" TEXT NOT NULL,
    "anzianita" INTEGER NOT NULL,
    "sourcePage" TEXT NOT NULL DEFAULT '/',
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoanApplication_practiceId_key" ON "LoanApplication"("practiceId");

-- CreateIndex
CREATE INDEX "LoanApplication_status_idx" ON "LoanApplication"("status");

-- CreateIndex
CREATE INDEX "LoanApplication_createdAt_idx" ON "LoanApplication"("createdAt");

-- CreateIndex
CREATE INDEX "LoanApplication_email_idx" ON "LoanApplication"("email");
