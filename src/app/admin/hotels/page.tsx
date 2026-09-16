"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Listing = {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  category: string;
  images: string[];
};

export default function AdminListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    const res = await fetch("/api/listings");
    const data = await res.json();
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Ye listing delete karni hai?")) return;
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    loadListings();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-slate-900">Listings</h1>
          <p className="text-sm text-slate-500 mt-1">
            {listings.length} {listings.length === 1 ? "listing" : "listings"} total
          </p>
        </div>
        <Link
          href="/admin/hotels/new"
          className="bg-[#14213D] hover:bg-[#1c2d52] text-white px-5 py-2.5 rounded-md text-sm transition-colors"
        >
          + Add listing
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : listings.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-lg py-16 text-center">
          <p className="text-slate-500 text-sm">Abhi koi listing nahi hai.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Listing</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Price/night</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-100 shrink-0">
                        {l.images?.[0] ? (
                          <Image src={l.images[0]} alt={l.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px]">
                            No image
                          </div>
                        )}
                      </div>
                      <span className="text-slate-900 font-medium">{l.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#14213D]/5 text-[#14213D] text-xs">
                      {l.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{l.location}</td>
                  <td className="px-4 py-3 text-slate-600">
                    ₹{l.pricePerNight.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link
                      href={`/admin/hotels/${l.id}/edit`}
                      className="text-[#14213D] font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(l.id)}
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