/**
 * Componente que mapea un serviceId a su icono SVG representativo.
 *
 * La prueba requiere que los servicios (Baño, Cajeros, Soat, Tienda)
 * se muestren SOLO con iconos, sin texto visible. El nombre del servicio
 * se mantiene únicamente en el aria-label para accesibilidad.
 *
 * Se usan SVGs custom diseñados para ser reconocibles al instante,
 * basados en iconografía universal de estaciones de servicio.
 *
 * @param serviceId - Código del servicio ("s1", "s2", "s3", "s4")
 * @param name - Nombre del servicio (solo para aria-label, no se muestra)
 */
import type { ReactNode } from 'react'
import './ServiceIcon.css'

interface ServiceIconProps {
  serviceId: string
  name: string
}

/**
 * s1 — Baño: Señalización universal de WC (mujer + barra + hombre).
 * Basado en la iconografía estándar ISO 7001 de restrooms.
 */
function BathroomIcon() {
  return (
    <svg viewBox="0 0 64 48" fill="none" className="service-icon__svg" aria-hidden="true">
      {/* Figura femenina (izquierda) */}
      <circle cx="16" cy="6" r="4" fill="currentColor" />
      <path
        d="M16 12c-5 0-8 2-8 4l2 10h3l1 12h4l1-12h3l2-10c0-2-3-4-8-4z"
        fill="currentColor"
      />

      {/* Barra divisora central */}
      <rect x="30" y="2" width="3.5" height="42" rx="1.5" fill="currentColor" />

      {/* Figura masculina (derecha) */}
      <circle cx="48" cy="6" r="4" fill="currentColor" />
      <path
        d="M48 12c-5 0-7 1.5-7 3v11h4v18h6V26h4V15c0-1.5-2-3-7-3z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * s2 — Cajeros: Billete/moneda, símbolo universal de servicios financieros.
 * Representa un billete con símbolo de peso colombiano.
 */
function AtmIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon__svg" aria-hidden="true">
      {/* Billete exterior */}
      <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2.5" />
      {/* Círculo central del billete */}
      <circle cx="24" cy="24" r="9" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
      {/* Símbolo $ dentro */}
      <text
        x="24" y="29"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="bold"
        fontFamily="system-ui"
      >
        $
      </text>
      {/* Líneas decorativas del billete */}
      <line x1="4" y1="17" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="37" y1="17" x2="44" y2="17" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="31" x2="11" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <line x1="37" y1="31" x2="44" y2="31" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * s3 — Soat: Escudo/insignia con auto frontal adentro.
 * El SOAT es el seguro obligatorio de accidentes de tránsito en Colombia.
 * Diseño tipo badge de seguro vehicular.
 */
function SoatIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon__svg" aria-hidden="true">
      {/* ── Escudo / insignia ── */}
      <path
        d="M24 2 L6 10 L6 22 C6 34 14 42 24 46 C34 42 42 34 42 22 L42 10 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.12"
      />
      {/* ── Auto vista frontal dentro del escudo ── */}
      {/* Techo + carrocería */}
      <path
        d="M17 17 C17 14, 31 14, 31 17 L33 22 H15 Z"
        fill="currentColor"
      />
      {/* Parabrisas */}
      <path
        d="M19 15.5 C19 14.5, 29 14.5, 29 15.5 L30.5 20.5 H17.5 Z"
        fill="var(--color-bg-card, #1a1a2e)"
      />
      {/* Cuerpo */}
      <rect x="14" y="21.5" width="20" height="7" rx="2" fill="currentColor" />
      {/* Faros */}
      <rect x="15.5" y="23" width="4" height="2" rx="0.8" fill="var(--color-bg-card, #1a1a2e)" />
      <rect x="28.5" y="23" width="4" height="2" rx="0.8" fill="var(--color-bg-card, #1a1a2e)" />
      {/* Parrilla */}
      <rect x="21" y="25.5" width="6" height="1.5" rx="0.5" fill="var(--color-bg-card, #1a1a2e)" />
      {/* Retrovisores */}
      <ellipse cx="13" cy="20" rx="1.5" ry="1" fill="currentColor" />
      <ellipse cx="35" cy="20" rx="1.5" ry="1" fill="currentColor" />
      {/* Ruedas */}
      <rect x="14.5" y="28" width="4" height="3" rx="1.5" fill="currentColor" />
      <rect x="29.5" y="28" width="4" height="3" rx="1.5" fill="currentColor" />
    </svg>
  )
}

/**
 * s4 — Tienda: Fachada de kiosco/tienda con toldo ondulado y puerta.
 */
function StoreIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="service-icon__svg" aria-hidden="true">
      {/* Toldo con ondas */}
      <path
        d="M6 18h36L38 8H10L6 18z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="currentColor"
        opacity="0.15"
      />
      <path d="M6 18c0 3 2 5 5 5s5-2 5-5" stroke="currentColor" strokeWidth="2" />
      <path d="M16 18c0 3 2 5 5 5s5-2 5-5" stroke="currentColor" strokeWidth="2" />
      <path d="M26 18c0 3 2 5 5 5s5-2 5-5" stroke="currentColor" strokeWidth="2" />
      <path d="M36 18c0 3 2 5 5 5" stroke="currentColor" strokeWidth="2" />
      {/* Cuerpo de la tienda */}
      <rect x="10" y="23" width="28" height="19" stroke="currentColor" strokeWidth="2.5" />
      {/* Puerta */}
      <rect x="18" y="30" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

/**
 * Mapeo de serviceId al componente SVG correspondiente.
 * s1 → Baño (WC universal), s2 → Cajeros (billete $),
 * s3 → Soat (auto + escudo), s4 → Tienda (fachada con toldo)
 */
const ICON_MAP: Record<string, () => ReactNode> = {
  s1: BathroomIcon,
  s2: AtmIcon,
  s3: SoatIcon,
  s4: StoreIcon,
}

export function ServiceIcon({ serviceId, name }: ServiceIconProps) {
  const Icon = ICON_MAP[serviceId]

  if (!Icon) return null

  return (
    <div className="service-icon" role="img" aria-label={name}>
      <Icon />
    </div>
  )
}
