import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site-config";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl shadow-orange-500/30 transition-transform hover:scale-105 hover:bg-orange-600 active:scale-95"
      aria-label="WhatsApp urgencias"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
