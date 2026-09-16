"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PackageForm from "../../PackageForm";

type PackageFormData = {
  id?: string;
  title: string;
  route: string;
  duration: string;
  tourType: string;
  price: number;
  image: string;
  icons: string[];
};

export default function EditPackagePage() {
  const params = useParams();
  const id = params.id as string;
  const [pkg, setPkg] = useState<PackageFormData | null>(null);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: PackageFormData) => p.id === id);
        setPkg(found);
      });
  }, [id]);

  if (!pkg) return <div className="px-6 py-10">Loading...</div>;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="font-heading text-2xl mb-8 text-slate-900">Edit Package</h1>
      <PackageForm initialData={pkg} />
    </div>
  );
}