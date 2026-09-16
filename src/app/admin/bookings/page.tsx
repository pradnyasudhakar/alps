"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string | null;
  status: string;
  createdAt: string;
  package: { title: string; category: string } | null;
};

const statusOptions = ["pending", "contacted", "confirmed", "cancelled"];

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  confirmed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );

    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      loadBookings();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Ye enquiry delete karni hai?")) return;

    setBookings((prev) => prev.filter((b) => b.id !== id));
    await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-slate-900">Bookings</h1>
        <p className="text-sm text-slate-500 mt-1">
          {bookings.length} {bookings.length === 1 ? "enquiry" : "enquiries"} total
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading...</p>
      ) : bookings.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-lg py-16 text-center">
          <p className="text-slate-500 text-sm">Abhi koi enquiry nahi aayi.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Naam</th>
                <th className="px-4 py-3 font-medium">Tour / Category</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-900 font-medium">{b.name}</td>
                  <td className="px-4 py-3">
                    {b.package ? (
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#14213D]/5 text-[#14213D] text-xs">
                        {b.package.title}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">General enquiry</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{b.email}</div>
                    <div className="text-xs text-slate-400">{b.mobile}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                    {b.message || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className={`text-xs px-2.5 py-1.5 rounded-md border-none outline-none cursor-pointer capitalize ${statusStyles[b.status] ?? "bg-slate-50 text-slate-700"}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s} className="text-slate-900">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                    {new Date(b.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-red-600 hover:underline text-xs"
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