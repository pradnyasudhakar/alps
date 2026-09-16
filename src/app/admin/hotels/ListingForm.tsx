"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type ListingFormData = {
  id?: string;
  title: string;
  location: string;
  pricePerNight: number;
  category: string;
  description: string;
  images: string[];
  rating: number;
};

export default function ListingForm({
  initialData,
}: {
  initialData?: ListingFormData;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ListingFormData>(
    initialData ?? {
      title: "",
      location: "",
      pricePerNight: 0,
      category: "",
      description: "",
      images: [],
      rating: 5,
    }
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [addingNewCategory, setAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("/api/listing-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => {});
  }, []);

  const handleImageUpload = async (files: FileList) => {
    setUploadError("");
    setUploading(true);

    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error || "Upload fail ho gaya");
          continue;
        }
        uploaded.push(data.url);
      }
      setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }));
    } catch {
      setUploadError("Upload fail ho gaya");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = initialData?.id ? "PUT" : "POST";
    const url = initialData?.id
      ? `/api/listings/${initialData.id}`
      : "/api/listings";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/hotels");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <input
        placeholder="Title (e.g. 3 BHK Villa)"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
        required
      />

      <input
        placeholder="Location (e.g. Shahpur (Igatpuri))"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
        required
      />

      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Price per night"
          value={form.pricePerNight || ""}
          onChange={(e) => setForm({ ...form, pricePerNight: Number(e.target.value) })}
          className="flex-1 border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
          required
        />
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900 bg-white"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        {!addingNewCategory ? (
          <div className="flex gap-2">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="flex-1 border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900 bg-white"
              required
            >
              <option value="" disabled>
                Category select karo (e.g. hotel)
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setAddingNewCategory(true)}
              className="px-4 py-3 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              + Nayi category
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              placeholder="Nayi category (e.g. hotel)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
            />
            <button
              type="button"
              onClick={() => {
                const trimmed = newCategory.trim();
                if (!trimmed) return;
                setForm({ ...form, category: trimmed });
                setCategories((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                setAddingNewCategory(false);
                setNewCategory("");
              }}
              className="px-4 py-3 bg-slate-900 text-white rounded-lg text-sm whitespace-nowrap"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setAddingNewCategory(false);
                setNewCategory("");
              }}
              className="px-3 py-3 text-sm text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <textarea
        placeholder="Description"
        rows={4}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900 resize-none"
        required
      />

      {/* Image gallery upload */}
      <div>
        <p className="text-sm text-slate-700 mb-2">Photos (pehli photo main image ban jaayegi)</p>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map((url) => (
            <div key={url} className="relative w-20 h-20 rounded-md overflow-hidden group">
              <Image src={url} alt="Listing photo" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-md border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-slate-400 text-slate-400 text-xs text-center"
          >
            {uploading ? "..." : "+ Add"}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleImageUpload(e.target.files);
            }
          }}
        />
        {uploadError && <p className="text-red-600 text-xs">{uploadError}</p>}
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : initialData?.id ? "Update Listing" : "Create Listing"}
      </button>
    </form>
  );
}