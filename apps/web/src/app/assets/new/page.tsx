'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewAssetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    creator: '',
    year: '',
    medium: '',
    dimensions: '',
    location: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          creator: formData.creator || undefined,
          year: formData.year ? parseInt(formData.year) : undefined,
          medium: formData.medium || undefined,
          dimensions: formData.dimensions || undefined,
          location: formData.location || undefined,
          notes: formData.notes || undefined,
        }),
      });

      if (response.ok) {
        router.push('/assets');
      } else {
        console.error('Failed to create asset');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error creating asset:', err);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/assets" style={{ color: '#0070f3', textDecoration: 'none' }}>← Back to Assets</Link>
      </div>
      <h1>New Asset</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title *</label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="creator" style={{ display: 'block', marginBottom: '0.5rem' }}>Creator</label>
          <input
            type="text"
            id="creator"
            value={formData.creator}
            onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="year" style={{ display: 'block', marginBottom: '0.5rem' }}>Year</label>
          <input
            type="number"
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="medium" style={{ display: 'block', marginBottom: '0.5rem' }}>Medium</label>
          <input
            type="text"
            id="medium"
            value={formData.medium}
            onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="dimensions" style={{ display: 'block', marginBottom: '0.5rem' }}>Dimensions</label>
          <input
            type="text"
            id="dimensions"
            value={formData.dimensions}
            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="location" style={{ display: 'block', marginBottom: '0.5rem' }}>Current Location</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label htmlFor="notes" style={{ display: 'block', marginBottom: '0.5rem' }}>Provenance Notes</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            background: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating...' : 'Create Asset'}
        </button>
      </form>
    </div>
  );
}
