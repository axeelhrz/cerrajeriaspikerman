import {
  DoorOpen,
  Wrench,
  Key,
  Vault,
  Building2,
  Fingerprint,
  Car,
  Copy,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const iconMap = {
  "door-open": DoorOpen,
  wrench: Wrench,
  key: Key,
  vault: Vault,
  "building-2": Building2,
  fingerprint: Fingerprint,
  car: Car,
  copy: Copy,
} as const;

const accentColors = [
  "from-amber-500/15 to-amber-600/5 text-amber-600",
  "from-blue-500/15 to-blue-600/5 text-blue-600",
  "from-emerald-500/15 to-emerald-600/5 text-emerald-600",
  "from-violet-500/15 to-violet-600/5 text-violet-600",
  "from-rose-500/15 to-rose-600/5 text-rose-600",
  "from-cyan-500/15 to-cyan-600/5 text-cyan-600",
  "from-orange-500/15 to-orange-600/5 text-orange-600",
  "from-teal-500/15 to-teal-600/5 text-teal-600",
];

export async function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => {
        const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Key;
        const accent = accentColors[i % accentColors.length];
        return (
          <Card key={service.slug} className="group overflow-hidden">
            <CardHeader className="p-5">
              <div
                className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                  accent
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-[0.95rem]">{service.title}</CardTitle>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
