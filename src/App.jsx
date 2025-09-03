import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// For UI 
const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-20 ${className}`}>{children}</section>
);

const Button = ({ as: Tag = "button", children, className = "", ...props }) => (
  <Tag
    className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </Tag>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">{children}</span>
);

//Popup Form
const Modal = ({ open, onClose, children, title = "" }) => {
 
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label={title}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

//Navbar
const NavBar = ({ onCTAClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          {/* Placeholder Logo */}
          <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366F1"/>
                <stop offset="100%" stopColor="#22C55E"/>
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="24" fill="url(#g)"/>
            <path d="M16 24h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            <path d="M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <span className="text-lg font-bold tracking-tight">SpeakGenie</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
          <a href="#how" className="text-sm text-gray-600 hover:text-gray-900">How it works</a>
          <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button className="bg-white text-gray-900 shadow-none ring-1 ring-gray-200 hover:bg-gray-50">Sign in</Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={onCTAClick}>Start Free Trial</Button>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle Menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden"
          >
            <Container className="flex flex-col gap-4 pb-4">
              <a href="#features" className="text-sm text-gray-700" onClick={() => setOpen(false)}>Features</a>
              <a href="#how" className="text-sm text-gray-700" onClick={() => setOpen(false)}>How it works</a>
              <a href="#pricing" className="text-sm text-gray-700" onClick={() => setOpen(false)}>Pricing</a>
              <a href="#faq" className="text-sm text-gray-700" onClick={() => setOpen(false)}>FAQ</a>
              <div className="flex items-center gap-3 pt-2">
                <Button className="bg-white text-gray-900 ring-1 ring-gray-200">Sign in</Button>
                <Button className="bg-indigo-600 text-white" onClick={onCTAClick}>Start Free Trial</Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

//Hero
const Hero = ({ onCTAClick }) => {
  return (
    <Section id="home" className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="mb-4 flex items-center gap-2">
            <Badge>AI-powered English learning</Badge>
            <span className="text-xs text-gray-500">For ages 6-16</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Speak confidently with your <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">personal AI tutor</span>
          </h1>
          <p className="mt-4 max-w-prose text-gray-600">
            Gamified lessons, real-time feedback, and interactive roleplay designed by educators. Learn anytime, anywhere.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={onCTAClick}>Start Free Trial</Button>
            <Button as="a" href="#how" className="bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50">See how it works</Button>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              14-day free trial
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round"/></svg>
              No credit card required
            </div>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl">
            
            <img
              src="xyz"
              alt="App preview"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200 sm:block"
          >
            <p className="text-sm font-semibold text-gray-900">Real-time Pronunciation Score</p>
            <p className="text-xs text-gray-500">Instant AI feedback after each line you speak.</p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

//Features
const features = [
  {
    title: "Interactive roleplay",
    desc: "Practice real-life conversations in safe, child-friendly scenarios.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-6 4h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H9l-4 4v10a2 2 0 002 2z"/></svg>
    ),
  },
  {
    title: "Real-time AI feedback",
    desc: "Immediate corrections on grammar, pronunciation, and fluency.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.866-3.582 7-8 7 0-5 3.582-7 8-7zm0 0c0-3.866 3.582-7 8-7 0 5-3.582 7-8 7zm0 0v10"/></svg>
    ),
  },
  {
    title: "Gamified lessons",
    desc: "Earn points, unlock levels, and keep a learning streak.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    ),
  },
  {
    title: "Parental dashboard",
    desc: "Track progress and set daily goals from your phone.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"/></svg>
    ),
  },
];

const Features = () => (
  <Section id="features">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything kids need to speak with confidence</h2>
        <p className="mt-3 text-gray-600">Designed with educators and powered by state-of-the-art AI.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-indigo-100"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600">{f.icon}</div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </Section>
);


const HowItWorks = () => (
  <Section id="how" className="bg-gradient-to-b from-white to-indigo-50/40">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-3 text-gray-600">Three simple steps to get started.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {["Create a profile", "Pick a learning path", "Practice & get feedback"].map((t, idx) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">{idx + 1}</div>
            <h3 className="text-base font-semibold">{t}</h3>
            <p className="mt-1 text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae.</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </Section>
);


const Pricing = ({ onCTAClick }) => (
  <Section id="pricing">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-3 text-gray-600">Start free, upgrade anytime.</p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        {[
          { name: "Starter", price: "Free", features: ["Limited lessons", "Basic feedback", "Community support"] },
          { name: "Pro", price: "₹299/mo", features: ["Unlimited lessons", "Advanced insights", "Parent dashboard"] },
          { name: "Family", price: "₹699/mo", features: ["Up to 4 profiles", "Progress reports", "Priority support"] },
        ].map((p, idx) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm ${idx === 1 ? "border-indigo-200 ring-1 ring-indigo-100" : "border-gray-100"}`}
          >
            <h3 className="text-base font-semibold">{p.name}</h3>
            <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
            <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-gray-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Button className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700" onClick={onCTAClick}>Start Free Trial</Button>
          </motion.div>
        ))}
      </div>
    </Container>
  </Section>
);

//FAQ 
const faqs = [
  { q: "Is the trial really free?", a: "Yes. No credit card required and you can cancel anytime during the 14-day period." },
  { q: "Which classes do you support?", a: "We support grades/classes 1-10 with age-appropriate content and difficulty." },
  { q: "Do you support multiple children?", a: "Yes, our Family plan supports up to 4 profiles under one account." },
  { q: "Which devices are supported?", a: "Any modern browser on desktop, tablet, or mobile. iOS & Android apps coming soon." },
];

const FAQ = () => (
  <Section id="faq" className="bg-gray-50/60">
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        <p className="mt-3 text-gray-600">Can't find what you're looking for? Email support@speakgenie.com</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-gray-100 overflow-hidden rounded-3xl border border-gray-100 bg-white">
        {faqs.map((f, i) => (
          <details key={f.q} className="group p-6 open:bg-indigo-50/40">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">{f.q}</h3>
              <svg className="h-5 w-5 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </summary>
            <p className="mt-2 text-sm text-gray-600">{f.a}</p>
          </details>
        ))}
      </div>
    </Container>
  </Section>
);

//Footer
const Footer = () => (
  <footer className="border-t border-gray-100 bg-white">
    <Container className="flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0%" stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#22C55E"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="24" fill="url(#g2)"/>
          <path d="M16 24h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M24 16v16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span className="text-sm font-semibold">SpeakGenie</span>
      </div>
      <p className="text-xs text-gray-500">© {new Date().getFullYear()} SpeakGenie Technology Pvt. Ltd. All rights reserved.</p>
      <div className="flex gap-3 text-gray-500">
        <a href="#" className="hover:text-gray-900">Privacy</a>
        <a href="#" className="hover:text-gray-900">Terms</a>
        <a href="#" className="hover:text-gray-900">Contact</a>
      </div>
    </Container>
  </footer>
);

//Form
const TrialForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", clazz: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!/^\+?[0-9]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone";
    if (!form.clazz.trim()) e.clazz = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const field = (id, label, type = "text", placeholder = "") => (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        value={id === "clazz" ? form.clazz : form[id]}
        onChange={(e) => setForm((s) => ({ ...s, [id === "clazz" ? "clazz" : id]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${errors[id === "clazz" ? "clazz" : id] ? "border-rose-300" : "border-gray-200"}`}
      />
      {errors[id === "clazz" ? "clazz" : id] && <p className="mt-1 text-xs text-rose-600">{errors[id === "clazz" ? "clazz" : id]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {field("name", "Name", "text", "Your full name")}
        {field("email", "Email", "email", "you@example.com")}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {field("phone", "Phone Number", "tel", "+91 98765 43210")}
        {field("clazz", "Class", "text", "e.g., Class 6")}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-medium text-gray-700">Message</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Tell us about your learning goals"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Submit</Button>
      <p className="text-xs text-gray-500">By submitting, you agree to our Terms and Privacy Policy.</p>
    </form>
  );
};

//Root Component
export default function App() {
  const [open, setOpen] = useState(false);
  const onCTAClick = () => setOpen(true);

  const handleSubmit = (data) => {
   
    console.log("Trial form submitted:", data);
    setOpen(false);
    alert("Thanks! We'll reach out soon.");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar onCTAClick={onCTAClick} />
      <main>
        <Hero onCTAClick={onCTAClick} />
        <Features />
        <HowItWorks />
        <Pricing onCTAClick={onCTAClick} />
        <FAQ />
      </main>
      <Footer />

      <Modal open={open} onClose={() => setOpen(false)} title="Start your free trial">
        <TrialForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  )

}



