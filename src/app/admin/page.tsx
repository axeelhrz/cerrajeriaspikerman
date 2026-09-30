import Link from "next/link";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const session = supabase ? (await supabase.auth.getSession()).data.session : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Panel Admin</h1>
          <p className="text-sm text-slate-600">Cerrajería Spikerman</p>
        </div>
        <Link href="/" className="text-sm text-amber-700 hover:underline">
          ← Volver al sitio
        </Link>
      </div>

      {!supabase ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="font-semibold text-amber-900">Configuración pendiente</h2>
          <p className="mt-2 text-sm text-amber-800">
            Configurá <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en el archivo <code>.env</code> para
            habilitar autenticación. Mientras tanto, podés gestionar productos en modo local.
          </p>
          <div className="mt-6">
            <AdminDashboard authenticated />
          </div>
        </div>
      ) : session ? (
        <AdminDashboard authenticated />
      ) : (
        <AdminLogin />
      )}
    </div>
  );
}
