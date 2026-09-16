import PackageForm from "../PackageForm";

export default function NewPackagePage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="font-heading text-2xl mb-8 text-slate-900">Add New Package</h1>
      <PackageForm />
    </div>
  );
}