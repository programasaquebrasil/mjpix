import { db } from "@/lib/db";
import type { SavedRecipient } from "@prisma/client";

export async function listSavedRecipients(): Promise<SavedRecipient[]> {
  return db.savedRecipient.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getSavedRecipient(id: string): Promise<SavedRecipient | null> {
  return db.savedRecipient.findUnique({ where: { id } });
}

export async function saveSavedRecipient(data: Omit<SavedRecipient, "id" | "createdAt">): Promise<SavedRecipient> {
  return db.savedRecipient.create({
    data: {
      ...data,
    },
  });
}

export async function deleteSavedRecipient(id: string): Promise<void> {
  await db.savedRecipient.delete({ where: { id } });
}

export function serializeSavedRecipient(r: SavedRecipient) {
  return {
    id: r.id,
    name: r.name,
    bank: `${r.bankCode} - Ag: ${r.agencyNumber} - Conta: ${r.accountNumber}`,
    accountHolder: r.accountHolder,
    document: r.document,
    email: r.email,
  };
}
