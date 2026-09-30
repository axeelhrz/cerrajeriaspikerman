import { PrismaClient } from "@prisma/client";
import { galleryItems, products } from "../src/lib/data/products";
import { services } from "../src/lib/data/services";

const prisma = new PrismaClient();

async function main() {
  await prisma.quoteRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.service.deleteMany();
  await prisma.galleryItem.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        category: product.category,
        name: product.name,
        description: product.description,
        includes: product.includes,
        imageUrl: product.imageUrl,
        sortOrder: product.sortOrder,
        translations: product.translations
          ? JSON.stringify(product.translations)
          : null,
      },
    });
  }

  for (const service of services) {
    await prisma.service.create({
      data: {
        slug: service.slug,
        segment: service.segment,
        title: service.title,
        description: service.description,
        icon: service.icon,
        sortOrder: service.sortOrder,
      },
    });
  }

  for (const item of galleryItems) {
    await prisma.galleryItem.create({ data: item });
  }

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      phone: "2410 2153",
      whatsapp: "099 803 111",
      address: "Salto 1175, Montevideo, Uruguay",
      hoursLocal: "Lunes a viernes 9–19 hs · Sábados 10–15 hs",
      hoursEmergency: "Urgencias a domicilio 24 hs, 365 días",
      googleReviewsUrl:
        "https://www.google.com/maps/search/?api=1&query=Cerrajer%C3%ADa+Spikerman",
      heroTitle: "Cerrajería urgencias 24 hs en Montevideo",
      heroSubtitle: "Tu puerta abierta en tiempo récord",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
