"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/site-config";
import { Check } from "lucide-react";

type FormData = {
  service: string;
  urgency: string;
  details: string;
  name: string;
  phone: string;
  neighborhood: string;
};

const steps = ["step1", "step2", "step3", "step4"] as const;

export function QuoteWizard() {
  const t = useTranslations("quote");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<FormData>({
    service: "",
    urgency: "",
    details: "",
    name: "",
    phone: "",
    neighborhood: "",
  });

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    setLoading(true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const message = [
        "Hola Spikerman, solicito cotización:",
        `Servicio: ${t(`services.${form.service}` as "services.apertura")}`,
        `Urgencia: ${t(`urgency.${form.urgency}` as "urgency.now")}`,
        `Detalles: ${form.details}`,
        `Nombre: ${form.name}`,
        `Teléfono: ${form.phone}`,
        form.neighborhood ? `Barrio: ${form.neighborhood}` : "",
      ].filter(Boolean).join("\n");
      setDone(true);
      window.open(whatsappUrl(message), "_blank");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="surface-card p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <p className="font-bold text-white">{t("success")}</p>
      </div>
    );
  }

  const optionClass =
    "rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm font-semibold text-slate-200 transition-colors hover:border-orange-500/50 hover:bg-white/10";

  return (
    <div className="surface-card p-6 md:p-8">
      <div className="mb-8 flex gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div className="h-0.5 overflow-hidden rounded-full bg-white/10">
              <div className={cn("h-full bg-orange-500 transition-all duration-500", i <= step ? "w-full" : "w-0")} />
            </div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.keys(t.raw("services") as Record<string, string>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => { update("service", key); setStep(1); }}
              className={optionClass}
            >
              {t(`services.${key}` as "services.apertura")}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-2">
          {(["now", "today", "scheduled"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => { update("urgency", key); setStep(2); }}
              className={optionClass}
            >
              {t(`urgency.${key}`)}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="details">{t("fields.details")}</Label>
            <Textarea id="details" className="mt-2" placeholder={t("fields.detailsPlaceholder")} value={form.details} onChange={(e) => update("details", e.target.value)} />
          </div>
          <Button onClick={() => setStep(3)} disabled={!form.details.trim()} className="rounded-full bg-orange-500 hover:bg-orange-600">
            Continuar
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div><Label htmlFor="name">{t("fields.name")}</Label><Input id="name" className="mt-2" value={form.name} onChange={(e) => update("name", e.target.value)} /></div>
          <div><Label htmlFor="phone">{t("fields.phone")}</Label><Input id="phone" className="mt-2" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></div>
          <div><Label htmlFor="neighborhood">{t("fields.neighborhood")}</Label><Input id="neighborhood" className="mt-2" value={form.neighborhood} onChange={(e) => update("neighborhood", e.target.value)} /></div>
          <button type="button" onClick={submit} disabled={loading || !form.name || !form.phone} className="btn-pill btn-pill-dark w-full">
            {loading ? "..." : t("submit")}
          </button>
        </div>
      )}

      {step > 0 && (
        <button type="button" onClick={() => setStep(step - 1)} className="mt-6 text-sm text-slate-500 hover:text-white">
          ← Volver
        </button>
      )}
    </div>
  );
}
