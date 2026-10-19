import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import MainLayout from "../components/layout/MainLayout";
import PageHero from "../components/PageHero";
import { Sheet, TabLabel } from "../components/ui/Sheet";
import { settings, socialLinks } from "../lib/site";

const socialIcons = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  TikTok: FaTiktok,
} as const;
const socialColors = ["#5B8FFF", "#FE558E", "#FED653", "#0A0A0A"];

const inputClass =
  "w-full rounded-2xl border-2 border-black/10 bg-ctr-paper px-5 py-3.5 text-lg outline-none transition-all placeholder:text-black/35 focus:border-ctr-blue focus:bg-white focus:shadow-[0_0_0_4px_rgba(91,143,255,.2)] disabled:opacity-60";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, startedAt: startedAt.current }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: data.message || "Mesajul a fost trimis cu succes!" });
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        startedAt.current = Date.now();
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "A apărut o eroare. Vă rugăm să încercați din nou.",
        });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: "A apărut o eroare de conexiune. Vă rugăm să încercați din nou." });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const details = [
    { icon: FaEnvelope, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: FaPhoneAlt, label: "Telefon", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { icon: FaMapMarkerAlt, label: "Adresă", value: settings.address },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Contact | CTR</title>
        <meta name="description" content="Contactează Consiliul Tineretului din România." />
      </Head>

      <PageHero
        title="Hai să"
        script="vorbim!"
        accent="yellow"
        description="Suntem aici să răspundem la întrebările tale și să te ajutăm cu orice informație ai nevoie."
      />

      <Sheet>
        <section className="relative py-16 lg:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[30px] bg-ctr-blue p-8 text-white shadow-card sm:p-10"
            >
              <div className="pointer-events-none absolute -bottom-6 -right-6 w-44 opacity-80" aria-hidden>
                <img src="/assets/design/scribble-white.png" alt="" className="h-auto w-full" />
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                <TabLabel tone="yellow">Date de contact</TabLabel>
              </h2>
              <ul className="mt-10 space-y-7">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-2xl text-ctr-ink shadow-lg">
                      <d.icon />
                    </span>
                    <div>
                      <span className="block text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
                        {d.label}
                      </span>
                      {d.href ? (
                        <a href={d.href} className="text-xl font-bold hover:underline">
                          {d.value}
                        </a>
                      ) : (
                        <span className="text-xl font-bold">{d.value}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.15em] text-white/70">Urmărește-ne</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social, i) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons] ?? FaLinkedinIn;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-ctr-ink transition-all duration-300 hover:-translate-y-1 hover:rotate-[-8deg]"
                      style={{ boxShadow: `0 6px 0 ${socialColors[i % socialColors.length]}` }}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="paper-card p-8 sm:p-10"
            >
              <h2 className="text-3xl font-bold sm:text-4xl">
                Trimite-ne un <span className="font-script font-normal text-ctr-pink">mesaj</span>
              </h2>

              {submitStatus.message && (
                <div
                  className={`mt-6 rounded-2xl px-5 py-4 font-semibold ${
                    submitStatus.success ? "bg-ctr-blue/10 text-ctr-blue" : "bg-ctr-pink/10 text-ctr-pink"
                  }`}
                  role="status"
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-bold">
                      Nume
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      maxLength={200}
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block font-bold">
                    Subiect
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    maxLength={150}
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block font-bold">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-pill group w-full bg-ctr-pink py-4 text-lg text-white shadow-[0_16px_30px_-12px_rgba(254,85,142,.7)] hover:bg-ctr-ink disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Se trimite...
                    </>
                  ) : (
                    <>
                      Trimite mesajul <span className="transition-transform group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </Sheet>
    </MainLayout>
  );
};

export default ContactPage;
