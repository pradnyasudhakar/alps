"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type PackageFormData = {
  id?: string;
  title: string;
  route: string;
  duration: string;
  tourType: string;
  category: string;
  price: number;
  image: string;
  icons: string[];
};

export default function PackageForm({
  initialData,
}: {
  initialData?: PackageFormData;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<PackageFormData>(
    initialData ?? {
      title: "",
      route: "",
      duration: "",
      tourType: "",
      category: "",
      price: 0,
      image: "",
      icons: [],
    }
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [categories, setCategories] = useState<string[]>([]);
  const [addingNewCategory, setAddingNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => {});
  }, []);

  const handleImageUpload = async (file: File) => {
    setUploadError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload fail ho gaya");
        return;
      }

      setForm((f) => ({ ...f, image: data.url }));
    } catch {
      setUploadError("Upload fail ho gaya");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = initialData?.id ? "PUT" : "POST";
    const url = initialData?.id
      ? `/api/packages/${initialData.id}`
      : "/api/packages";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
        required
      />

      <input
        placeholder="Route (e.g. 2N Katra - 2N Pahalgam)"
        value={form.route}
        onChange={(e) => setForm({ ...form, route: e.target.value })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
        required
      />

      <div className="flex gap-4">
        <input
          placeholder="Duration (e.g. 6N/7D)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="flex-1 border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
          required
        />
        <input
          placeholder="Tour Type"
          value={form.tourType}
          onChange={(e) => setForm({ ...form, tourType: e.target.value })}
          className="flex-1 border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
          required
        />
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
                Category select karo
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
              placeholder="Nayi category ka naam (e.g. Kashmir)"
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
                setCategories((prev) =>
                  prev.includes(trimmed) ? prev : [...prev, trimmed]
                );
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
        {form.category && !addingNewCategory && (
          <p className="text-xs text-slate-500 mt-1">
            Selected: <span className="font-medium">{form.category}</span>
          </p>
        )}
      </div>

      <input
        type="number"
        placeholder="Price"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
        required
      />

      {/* Image upload */}
      <div>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:border-slate-400 transition-colors"
        >
          {form.image ? (
            <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
              <Image src={form.image} alt="Package preview" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 text-xs text-center px-1">
              No image
            </div>
          )}
          <div className="text-sm text-slate-600">
            {uploading ? "Upload ho raha hai..." : "Click karke image select karo"}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
        {uploadError && (
          <p className="text-red-600 text-xs mt-1">{uploadError}</p>
        )}
      </div>

      <input
        placeholder="Icons comma separated (flight,hotel,meal,camera)"
        value={form.icons.join(",")}
        onChange={(e) =>
          setForm({
            ...form,
            icons: e.target.value.split(",").map((i) => i.trim()).filter(Boolean),
          })
        }
        className="w-full border border-slate-300 px-4 py-3 rounded-lg outline-none focus:border-slate-900 text-slate-900"
      />

      <button
        type="submit"
        disabled={saving || uploading}
        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : initialData?.id ? "Update Package" : "Create Package"}
      </button>
    </form>
  );
}