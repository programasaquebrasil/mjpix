-- AlterTable
ALTER TABLE "SavedRecipient" ADD COLUMN     "accountCheckDigit" VARCHAR(2) NOT NULL DEFAULT '',
ADD COLUMN     "agencyCheckDigit" VARCHAR(2);
