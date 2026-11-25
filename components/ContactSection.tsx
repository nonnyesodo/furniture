"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail, ArrowUpRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Reveal from "./Reveal";
import { images } from "@/lib/images";
import { siteConfig, contactFormOptions } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please provide your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief message about your inquiry.";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send message. Please try again.");
      }

      setIsSuccess(true);
      trackEvent({
        name: "showroom_form_submit",
        properties: {
          interest: formData.interest,
          hasPhone: Boolean(formData.phone.trim()),
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      interest: "",
      message: "",
    });
    setIsSuccess(false);
    setErrors({});
    setServerError(null);
  };

  return (
    <section
      id="showroom"
      aria-label="Showroom and Contact Inquiry"
      className="py-24 sm:py-32 bg-[#FAF8F5]"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8">
        <Reveal threshold={0.15} direction="up">
          <div className="max-w-2xl mb-16 sm:mb-20">
            <span className="text-[11px] uppercase tracking-[0.25em] text-oak font-semibold block mb-3">
              Visit & Inquire
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-tight font-normal mb-4">
              Experience the Craft
            </h2>
            <p className="font-sans text-base text-charcoal-muted leading-relaxed">
              Visit our Mercer Street showroom to touch our oiled timbers and feel our wool bouclés in person, or request a private specification consultation.
            </p>
          </div>
        </Reveal>

        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Showroom Photography & Address Details */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <Reveal threshold={0.15} direction="left">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-200 shadow-md">
                <Image
                  src={images.showroom.src}
                  alt={images.showroom.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={images.showroom.blurDataURL}
                  className="object-cover object-center"
                />
              </div>

              {/* Showroom Details Box */}
              <div className="bg-white p-6 sm:p-8 border border-sand-200/80 shadow-sm space-y-6 mt-6">
                <div>
                  <div className="flex items-center gap-2 text-oak mb-2">
                    <MapPin size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                      SoHo Showroom & Atelier
                    </span>
                  </div>
                  <p className="font-serif text-lg text-charcoal">
                    {siteConfig.contact.address.street}
                  </p>
                  <p className="font-sans text-sm text-charcoal-muted">
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{" "}
                    {siteConfig.contact.address.postalCode}
                  </p>
                  <a
                    href={siteConfig.contact.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-oak hover:text-charcoal font-medium mt-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
                  >
                    <span>View on Google Maps</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Opening Hours */}
                <div className="pt-4 border-t border-sand-200">
                  <div className="flex items-center gap-2 text-oak mb-2">
                    <Clock size={18} />
                    <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                      Opening Hours
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-charcoal-muted font-sans">
                    {siteConfig.contact.hours.map((h, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="font-medium text-charcoal">{h.days}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contact */}
                <div className="pt-4 border-t border-sand-200 flex flex-col sm:flex-row gap-4 text-xs font-sans">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-charcoal hover:text-oak transition-colors"
                  >
                    <Phone size={15} className="text-oak" />
                    <span>{siteConfig.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2 text-charcoal hover:text-oak transition-colors"
                  >
                    <Mail size={15} className="text-oak" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal threshold={0.15} direction="right">
              <div className="bg-white p-8 sm:p-12 border border-sand-200/80 shadow-md">
                {isSuccess ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-sand-200 flex items-center justify-center text-olive mb-6">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-3 font-normal">
                      Inquiry Received
                    </h3>
                    <p className="font-sans text-sm text-charcoal-muted max-w-md leading-relaxed mb-8">
                      Thank you for contacting Maison Oak. A concierge specialist will review your request and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-8 py-3.5 bg-charcoal text-sand-100 uppercase tracking-widest text-xs font-medium hover:bg-olive transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-oak"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <h3 className="font-serif text-2xl text-charcoal mb-1 font-normal">
                        Book a Consultation or Quote
                      </h3>
                      <p className="text-xs text-charcoal-muted uppercase tracking-widest mb-6">
                        Personalized guidance for home or trade projects
                      </p>
                    </div>

                    {serverError && (
                      <div
                        role="alert"
                        className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-800 text-sm"
                      >
                        <AlertCircle size={18} className="flex-shrink-0" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs uppercase tracking-widest font-medium text-charcoal mb-2"
                      >
                        Your Full Name <span className="text-oak">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder="e.g. Henrik Larsson"
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-charcoal placeholder-charcoal-muted/60 transition-colors focus:bg-white focus:outline-none focus:ring-1 focus:ring-oak ${
                          errors.name ? "border-red-500" : "border-sand-200 focus:border-oak"
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-600 font-sans">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs uppercase tracking-widest font-medium text-charcoal mb-2"
                        >
                          Email Address <span className="text-oak">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          placeholder="name@domain.com"
                          className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-charcoal placeholder-charcoal-muted/60 transition-colors focus:bg-white focus:outline-none focus:ring-1 focus:ring-oak ${
                            errors.email ? "border-red-500" : "border-sand-200 focus:border-oak"
                          }`}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-red-600 font-sans">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs uppercase tracking-widest font-medium text-charcoal mb-2"
                        >
                          Phone Number <span className="text-charcoal-muted font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-sand-200 text-sm text-charcoal placeholder-charcoal-muted/60 transition-colors focus:bg-white focus:border-oak focus:outline-none focus:ring-1 focus:ring-oak"
                        />
                      </div>
                    </div>

                    {/* Interest Dropdown */}
                    <div>
                      <label
                        htmlFor="contact-interest"
                        className="block text-xs uppercase tracking-widest font-medium text-charcoal mb-2"
                      >
                        Area of Interest
                      </label>
                      <select
                        id="contact-interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-sand-200 text-sm text-charcoal transition-colors focus:bg-white focus:border-oak focus:outline-none focus:ring-1 focus:ring-oak cursor-pointer"
                      >
                        {contactFormOptions.interestOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs uppercase tracking-widest font-medium text-charcoal mb-2"
                      >
                        Message or Specification Details <span className="text-oak">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        placeholder="Tell us about your space, timeline, or the pieces you wish to inspect..."
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border text-sm text-charcoal placeholder-charcoal-muted/60 transition-colors focus:bg-white focus:outline-none focus:ring-1 focus:ring-oak ${
                          errors.message ? "border-red-500" : "border-sand-200 focus:border-oak"
                        }`}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs text-red-600 font-sans">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-charcoal text-sand-100 uppercase tracking-[0.2em] text-xs font-medium hover:bg-olive transition-colors flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-oak shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <span>Submit Inquiry</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
