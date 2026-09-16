"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Package = {
  id: string;
  title: string;
  duration: string;
  tourType: string;
  category: string;
  price: number;
  image: string;
};

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPackages = async () => {
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPackages();
  }, []);
  function getValidImageSrc(image: string | null | undefined) {
  if (!image) return null;
  if (image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return null;
}

  const handleDelete = async (id: string) => {
    if (!confirm("Ye package delete karni hai?")) return;
    await fetch(`/api/packages/${id}`, { method: "DELETE" });
    loadPackages();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-slate-900">
            Packages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {packages.length} {packages.length === 1 ? "package" : "packages"} total
          </p>
        </div>
        <Link
          href="/admin/packages/new"
          className="bg-[#14213D] hover:bg-[#1c2d52] text-white px-5 py-2.5 rounded-md text-sm transition-colors"
        >
          + Add package
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : packages.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-lg py-16 text-center">
          <p className="text-slate-500 text-sm">Abhi koi package nahi hai.</p>
          <Link
            href="/admin/packages/new"
            className="inline-block mt-3 text-sm text-[#14213D] font-medium hover:underline"
          >
            Pehla package add karo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Package</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Duration</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-100 shrink-0">
  {getValidImageSrc(pkg.image) ? (
    <Image
      src={getValidImageSrc(pkg.image)!}
      alt={pkg.title}
      fill
      className="object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
      No image
    </div>
  )}
</div>
                      <span className="text-slate-900 font-medium">{pkg.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#14213D]/5 text-[#14213D] text-xs">
                      {pkg.category || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{pkg.duration}</td>
                  <td className="px-4 py-3 text-slate-600">{pkg.tourType}</td>
                  <td className="px-4 py-3 text-slate-600">
                    ₹{pkg.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className="text-[#14213D] font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}