import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site-config";
import type { ProductData } from "@/lib/data/products";

export async function ProductCard({ product }: { product: ProductData }) {
  const t = await getTranslations("catalog");

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-base">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      {product.includes && (
        <CardContent className="pt-0">
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{t("includes")}:</span>{" "}
            {product.includes}
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/cerraduras/${product.slug}`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {t("consult")}
            </Link>
            <a
              href={whatsappUrl(`Hola, consulto por ${product.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "whatsapp", size: "sm" })}
            >
              WhatsApp
            </a>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
