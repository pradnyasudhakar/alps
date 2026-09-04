"use client";

import { useState } from "react";
import Image from "next/image";
import { H2, P } from "@/components/ui/Typography";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Can I customize a tour package?",
    answer:
      "Yes. Our travel experts can customize your itinerary based on your destination, duration, budget, preferred hotels, activities and travel style.",
  },
  {
    question: "Can I book flights and hotels separately?",
    answer:
      "Yes, you can choose to book flights and hotels separately or as a bundled package depending on your preference.",
  },
  {
    question: "How do I book a tour package?",
    answer:
      "You can book directly through our website, call our support team, or visit one of our offices to book in person.",
  },
  {
    question: "Can I book flights and hotels separately?",
    answer:
      "Yes, you can choose to book flights and hotels separately or as a bundled package depending on your preference.",
  },
  {
    question: "Do you offer international as well as domestic tours?",
    answer:
      "Yes, we offer both domestic tours across India as well as international packages to popular destinations worldwide.",
  },
  {
    question: "Can I request a private or family tour?",
    answer:
      "Absolutely. We offer fully customizable private and family tours tailored to your group's needs and preferences.",
  },
  {
    question: "What is included in a tour package?",
    answer:
      "Most packages include accommodation, meals as specified, transportation, and guided sightseeing. Exact inclusions vary by package.",
  },
  {
    question: "Can I choose my own hotel?",
    answer:
      "Yes, we offer a range of hotel options at different price points, and you can select the one that suits you best.",
  },
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We recommend booking at least 4-6 weeks in advance, especially during peak travel seasons, to ensure availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 sm:px-10 md:px-16 py-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Heading + Accordion */}
        <div className="flex-1">
          <H2 className="mb-10 text-[#0B0B0B] ">
            Got Questions?
            <br />
            We&apos;re Here to Help
          </H2>

          <div className="border-t border-slate-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-slate-200">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="font-body text-base 2xl:text-lg  text-[#172432]pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-500">
                      {isOpen ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 pb-5" : "max-h-0"
                    }`}
                  >
                    <P className="text-sm text-[#555555]!">{faq.answer}</P>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:flex-1 relative h-80 lg:h-auto rounded-2xl overflow-hidden">
          <Image
            src="/images/faq.png"
            alt="Travel planning"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}