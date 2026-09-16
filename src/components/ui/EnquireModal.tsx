"use client";

import { useState } from "react";
import { Display, P } from "@/components/ui/Typography";
import { FiX, FiChevronDown } from "react-icons/fi";

type EnquireModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage?: string;
};

export default function EnquireModal({
  isOpen,
  onClose,
  defaultMessage = "",
}: EnquireModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    message: defaultMessage,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submit logic yaha aayega (API call, etc.)
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop - blurs the page behind */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden p-8 sm:p-10">
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/70 via-slate-700/60 to-teal-800/60 backdrop-blur-xl -z-10" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <Display className="!text-white text-3xl sm:text-4xl mb-3">
            Lets Get In Touch
          </Display>
          <P className="!text-white/80 text-sm max-w-sm mx-auto">
            Discover breathtaking destinations, thoughtfully planned holidays and
            experiences made around the way you love to travel.
          </P>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white/15 border border-white/20 text-white placeholder:text-white/60 font-body px-5 py-4 rounded-xl outline-none focus:border-white/50 transition-colors"
            required
          />

          {/* Mobile with country code */}
          <div className="flex gap-3">
            <div className="relative shrink-0">
              <select
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
                className="appearance-none bg-white/15 border border-white/20 text-white font-body pl-4 pr-8 py-4 rounded-xl outline-none cursor-pointer"
              >
                <option value="+91" className="text-slate-900">+91</option>
                <option value="+1" className="text-slate-900">+1</option>
                <option value="+44" className="text-slate-900">+44</option>
                <option value="+971" className="text-slate-900">+971</option>
              </select>
              <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
            </div>

            <input
              type="tel"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="flex-1 bg-white/15 border border-white/20 text-white placeholder:text-white/60 font-body px-5 py-4 rounded-xl outline-none focus:border-white/50 transition-colors"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white/15 border border-white/20 text-white placeholder:text-white/60 font-body px-5 py-4 rounded-xl outline-none focus:border-white/50 transition-colors"
            required
          />

          {/* Message */}
          <textarea
            placeholder="Your message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/15 border border-white/20 text-white placeholder:text-white/60 font-body px-5 py-4 rounded-xl outline-none resize-none focus:border-white/50 transition-colors"
          />

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-body px-8 py-3 rounded-md transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}