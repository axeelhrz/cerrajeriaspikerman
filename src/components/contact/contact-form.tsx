"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Check } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="surface-card flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Check className="h-6 w-6" />
        </div>
        <p className="font-semibold text-white">{t("success")}</p>
        <p className="mt-2 text-sm text-slate-500">{t("successHint")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card flex h-full flex-col p-5 md:p-6">
      <div className="mb-5 border-b border-white/10 pb-4">
        <h3 className="text-base font-bold text-white">{t("formTitle")}</h3>
        <p className="mt-1 text-xs text-slate-500">{t("formHint")}</p>
      </div>

      <div className="space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              required
              className="mt-1.5 h-10"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">{t("phoneField")}</Label>
            <Input
              id="phone"
              required
              className="mt-1.5 h-10"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            required
            className="mt-1.5 h-10"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea
            id="message"
            required
            className="mt-1.5 min-h-[96px]"
            placeholder={t("messagePlaceholder")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-pill btn-pill-dark mt-5 w-full py-2.5 text-sm disabled:opacity-50"
      >
        {loading ? t("sending") : t("send")}
        {!loading && <ArrowUpRight className="h-3.5 w-3.5" />}
      </button>
    </form>
  );
}
