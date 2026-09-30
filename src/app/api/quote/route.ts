import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  service: z.string().min(1),
  urgency: z.string().min(1),
  details: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  neighborhood: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());

    await prisma.quoteRequest.create({
      data: {
        service: body.service,
        urgency: body.urgency,
        details: body.details,
        name: body.name,
        phone: body.phone,
        neighborhood: body.neighborhood ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
