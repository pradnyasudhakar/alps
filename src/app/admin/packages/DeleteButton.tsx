"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePackage } from "./packages/actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm("Delete this package?")) return;
    startTransition(async () => {
      await deletePackage(id);
      router.refresh();
    });
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-600 hover:underline disabled:opacity-50">
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}