import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Marquee</h1>
      <nav style={{ marginBottom: '2rem' }}>
        <Link href="/assets" style={{ marginRight: '1rem' }}>Assets</Link>
        <Link href="/assets/new">New Asset</Link>
      </nav>
      <p>Asset & Provenance Management System</p>
    </main>
  );
}