-- CreateTable
CREATE TABLE "SavedRecipient" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "documentType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "agencyNumber" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountHolder" VARCHAR(120) NOT NULL,
    "accountHolderDocument" TEXT NOT NULL,
    "street" VARCHAR(120) NOT NULL,
    "streetNumber" VARCHAR(20) NOT NULL,
    "complement" VARCHAR(120),
    "neighborhood" VARCHAR(120) NOT NULL,
    "zipCode" TEXT NOT NULL,
    "city" VARCHAR(120) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedRecipient_createdAt_idx" ON "SavedRecipient"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SavedRecipient_bankCode_agencyNumber_accountNumber_key" ON "SavedRecipient"("bankCode", "agencyNumber", "accountNumber");
