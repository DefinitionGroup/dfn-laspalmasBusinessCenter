import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found page-gutter">
      <p className="eyebrow">404</p>
      <h1>Este espacio no existe.</h1>
      <Link className="action-link action-link--primary" href="/es">Volver al inicio ↗</Link>
    </main>
  );
}
