# Cerrajería Spikerman

Sitio web premium para [cerrajeriaspikerman.com](https://cerrajeriaspikerman.com/) — Next.js 16, multi-idioma (ES/EN/PT), catálogo Star, cotizador, panel admin y WhatsApp integrado.

## Desarrollo local

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run db:seed` | Cargar catálogo y datos iniciales |
| `npm run db:studio` | Prisma Studio (administrar DB) |

## Variables de entorno

Copiá `.env.example` a `.env` y completá:

- **Supabase** — auth del panel `/admin`
- **RESEND_API_KEY** — emails de contacto/cotizaciones (opcional)

## Deploy en Vercel

1. Conectá el repositorio en Vercel
2. Configurá las variables de entorno
3. Para PostgreSQL en producción, cambiá `DATABASE_URL` a Supabase/Neon y el provider en `prisma/schema.prisma` a `postgresql`
4. Apuntá el dominio `cerrajeriaspikerman.com` a Vercel

## Estructura (single page)

Todo el sitio vive en una sola página con navegación por anclas:

| Sección | Ancla |
|---------|-------|
| Inicio | `#inicio` |
| Servicios | `#servicios` |
| Cerraduras Star | `#cerraduras` |
| Control de accesos | `#control-de-accesos` |
| Puertas Blindex | `#puertas-blindex` |
| Cotizador | `#cotizar` |
| Contacto | `#contacto` |

Las rutas antiguas (`/servicios`, `/cerraduras`, etc.) redirigen automáticamente a la ancla correspondiente.

- `/admin` — Panel de gestión de productos (ruta separada)
