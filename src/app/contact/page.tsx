"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Display, P } from "@/components/ui/Typography";
import { FiChevronDown, FiX } from "react-icons/fi";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Overlay from "@/components/ui/Overlay";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const packageTitle = searchParams.get("packageTitle");

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: `${formData.countryCode} ${formData.mobile}`,
          message: formData.message,
          packageId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "wrong");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("wrong,  try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-28">
      <Image
        src="/images/contact.jpg"
        alt="Alps Hotel & Travels"
        fill
        priority
        className="object-cover -z-10"
      />
    <Overlay variant="flat" className="bg-[#0B0B0B]/60" />

      {/* Contact Card - exact Figma spec */}
      <div
        className="relative w-full max-w-175 md:mt-20 rounded-[20px] overflow-hidden"
        style={{ padding: "35px 50px" }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundColor: "rgba(251, 251, 251, 0.15)",
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
          }}
        />

        <Link
          href="/"
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </Link>

        <div className="text-center mb-6">
          <Display className="font-normal! text-3xl! mb-3">
            Lets Get In Touch
          </Display>
          <P className="!text-white/80 text-sm max-w-xl mx-auto">
            Discover breathtaking destinations, thoughtfully planned holidays and experiences made around the way you love to travel.
          </P>
          {packageTitle && (
            <span className=" mt-3 hidden text-xs bg-white/15 text-white px-3 py-1 rounded-full">
              Enquiring about: {packageTitle}
            </span>
          )}
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <p className="text-white text-lg font-medium mb-2">Enquiry Send</p>
            <p className="text-white/70 text-sm">We will be back soon..</p>
          </div>
        ) : (
         <form onSubmit={handleSubmit} className="space-y-4">
  {error && (
    <p className="text-red-300 text-sm text-center">{error}</p>
  )}

  <input
    type="text"
    placeholder="Enter Your Name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full text-black placeholder:text-[#0B0B0B] font-body text-base px-5 py-4 rounded-lg outline-none transition-colors"
    style={{
      backgroundColor: "#F2F8FFB2",
      border: "1px solid white",
    }}
    required
  />

  <div className="flex gap-3">
    <div className="relative shrink-0">
      <select
        value={formData.countryCode}
        onChange={(e) =>
          setFormData({ ...formData, countryCode: e.target.value })
        }
        className="appearance-none text-white font-body text-sm pl-4 pr-8 py-4 rounded-lg outline-none cursor-pointer"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid white",
        }}
      >
        <option value="+91" className="text-slate-900">+91</option>
        <option value="+1" className="text-slate-900">+1</option>
        <option value="+44" className="text-slate-900">+44</option>
        <option value="+971" className="text-slate-900">+971</option>
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/80 pointer-events-none" />
    </div>

    <input
      type="tel"
      placeholder="Enter Mobile"
      value={formData.mobile}
      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      className="flex-1 text-white placeholder:text-white/70 font-body text-sm px-5 py-4 rounded-lg outline-none transition-colors"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        border: "1px solid white",
      }}
      required
    />
  </div>

  <input
    type="email"
    placeholder="Enter Email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full text-white placeholder:text-white/70 font-body text-sm px-5 py-4 rounded-lg outline-none transition-colors"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      border: "1px solid white",
    }}
    required
  />

  <textarea
    placeholder="Your message"
    rows={2}
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    className="w-full text-white placeholder:text-white/70 font-body text-sm px-5 py-4 rounded-lg outline-none resize-none transition-colors"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      border: "1px solid white",
    }}
  />

  <div className="flex justify-end pt-1">
    <Button
      type="submit"
      disabled={submitting}
      className="bg-primary hover:bg-primary-dark text-white font-body text-base px-6 py-2.5 rounded-md transition-colors disabled:opacity-50"
    >
      {submitting ? "Sending.." : "Submit"}
    </Button>
  </div>
</form>
        )}
      </div>
    </section>
  );
}