import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/30 transition-transform hover:scale-105 hover:bg-orange-600 active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)", marginRight: "env(safe-area-inset-right, 0px)" }}
      aria-label="WhatsApp urgencias"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
