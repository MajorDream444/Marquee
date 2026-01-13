'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Asset {
  id: string;
  title: string;
  creator?: string | null;
  year?: number | null;
  medium?: string | null;
  dimensions?: string | null;
  location?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/assets')
      .then((res) => res.json())
      .then((data) => {
        setAssets(data.assets || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch assets:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading assets...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Assets</h1>
        <Link href="/assets/new" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          New Asset
        </Link>
      </div>

      {assets.length === 0 ? (
        <p>No assets yet. <Link href="/assets/new">Create your first asset</Link></p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {assets.map((asset) => (
            <div key={asset.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
              <h2 style={{ margin: '0 0 0.5rem 0' }}>{asset.title}</h2>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {asset.creator && <div>Creator: {asset.creator}</div>}
                {asset.year && <div>Year: {asset.year}</div>}
                {asset.medium && <div>Medium: {asset.medium}</div>}
                {asset.dimensions && <div>Dimensions: {asset.dimensions}</div>}
                {asset.location && <div>Location: {asset.location}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
