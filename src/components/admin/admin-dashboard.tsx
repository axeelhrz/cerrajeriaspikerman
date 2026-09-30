"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products as staticProducts } from "@/lib/data/products";

type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  includes?: string | null;
  imageUrl: string;
  active?: boolean;
  sortOrder?: number;
};

export function AdminDashboard({ authenticated }: { authenticated: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<"products" | "quotes">("products");
  const [form, setForm] = useState<Product>({
    slug: "",
    name: "",
    category: "LOCK",
    description: "",
    includes: "",
    imageUrl: "/images/products/cerraduras-star.jpg",
  });

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.length ? data : staticProducts))
      .catch(() => setProducts(staticProducts));
  }, []);

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, active: true, sortOrder: products.length + 1 }),
    });
    if (res.ok) {
      const product = await res.json();
      setProducts([...products, product]);
      setForm({
        slug: "",
        name: "",
        category: "LOCK",
        description: "",
        includes: "",
        imageUrl: "/images/products/cerraduras-star.jpg",
      });
    }
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active }),
    });
    setProducts(products.map((p) => (p.id === id ? { ...p, active: !active } : p)));
  }

  if (!authenticated) return null;

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <Button
          variant={tab === "products" ? "default" : "outline"}
          onClick={() => setTab("products")}
        >
          Productos ({products.length})
        </Button>
        <Button variant={tab === "quotes" ? "default" : "outline"} onClick={() => setTab("quotes")}>
          Cotizaciones
        </Button>
      </div>

      {tab === "products" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Agregar producto</h3>
            <form onSubmit={addProduct} className="space-y-3">
              <div>
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
              </div>
              <div>
                <Label>Nombre</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>Categoría</Label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="LOCK">Cerradura</option>
                  <option value="MONOBLOCK">Monoblock</option>
                  <option value="DEADBOLT">Cerrojo</option>
                </select>
              </div>
              <div>
                <Label>Descripción</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              </div>
              <div>
                <Label>Incluye</Label>
                <Input value={form.includes ?? ""} onChange={(e) => setForm({ ...form, includes: e.target.value })} />
              </div>
              <Button type="submit">Guardar producto</Button>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Listado</h3>
            <ul className="max-h-[500px] space-y-2 overflow-y-auto">
              {products.map((p) => (
                <li
                  key={p.id ?? p.slug}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                >
                  <span className={p.active === false ? "text-slate-400 line-through" : ""}>
                    {p.name}
                  </span>
                  {p.id && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(p.id!, p.active !== false)}
                    >
                      {p.active === false ? "Activar" : "Desactivar"}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "quotes" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Las cotizaciones se guardan en la base de datos. Consultá la tabla{" "}
          <code>QuoteRequest</code> en Prisma Studio (<code>npx prisma studio</code>).
        </div>
      )}
    </div>
  );
}
