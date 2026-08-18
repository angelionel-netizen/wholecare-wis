import React, { useState } from 'react';

export default function Recommendations({ customer, onBack }) {
  const [filter, setFilter] = useState('all');

  const tips = [
    {
      id: 1,
      category: 'Dietary',
      title: 'Whole-Food Anti-Inflammatory Plan',
      author: 'Dr. Alice Smith',
      tags: ['Organic Greens', 'Wild Salmon', 'Turmeric'],
      description: 'Focus on seasonal cruciferous vegetables, cold-pressed olive oils, and omega-3 rich fish from the Whole Foods market counter.'
    },
    {
      id: 2,
      category: 'Supplements',
      title: 'Targeted Vitamin D3 + K2 Protocol',
      author: 'Coach Brian Miller',
      tags: ['Immunity', 'Bone Health', 'Daily Routine'],
      description: 'Recommended daily intake based on your intake consultation. Pair with healthy fats during morning breakfast for optimal bioavailability.'
    },
    {
      id: 3,
      category: 'Dietary',
      title: 'Polyphenol Olive Oil & Antioxidant Routine',
      author: 'Dr. Alice Smith',
      tags: ['Heart Health', 'Polyphenols'],
      description: 'Single-estate unfiltered Mediterranean olive oil to elevate cellular anti-oxidant levels and metabolic health.'
    },
    {
      id: 4,
      category: 'Lifestyle',
      title: 'Hydration & Recovery Window',
      author: 'Dr. Claire Vance',
      tags: ['Electrolytes', 'Circadian Rhythm'],
      description: 'Incorporate natural mineral-rich spring water and structured evening cooldowns to support circadian alignment.'
    }
  ];

  const filteredTips = filter === 'all' 
    ? tips 
    : tips.filter(t => t.category.toLowerCase() === filter.toLowerCase());

  return (
    <div style={{ backgroundColor: '#FAF7EE', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '1.75rem 2rem', border: '1px solid rgba(24, 77, 40, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 className="font-serif-title" style={{ margin: 0, color: '#10331D', fontSize: '1.75rem', fontWeight: '700' }}>Personalized Wellness & Nutrition Guides</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#6B7280', fontSize: '0.85rem' }}>Tailored dietary protocols and lifestyle advice from your certified specialists</p>
          </div>
          <button onClick={onBack} style={{ backgroundColor: '#EDF4EE', border: 'none', padding: '0.6rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', color: '#184D28', fontSize: '0.85rem' }}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {['all', 'dietary', 'supplements', 'lifestyle'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                border: filter === cat ? '2px solid #184D28' : '1px solid #D1D5DB',
                backgroundColor: filter === cat ? '#184D28' : '#FFFFFF',
                color: filter === cat ? '#FFFFFF' : '#4B5563',
                fontWeight: '700',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredTips.map(item => (
            <div key={item.id} className="card-hover" style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(24, 77, 40, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#184D28', backgroundColor: '#EDF4EE', padding: '0.25rem 0.65rem', borderRadius: '6px', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>By {item.author}</span>
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827', fontSize: '1.15rem', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: '1.5', margin: '0 0 1rem 0' }}>{item.description}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', borderTop: '1px solid #F3F4F6', paddingTop: '0.75rem' }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{ backgroundColor: '#FAF7EE', border: '1px solid #E5E7EB', color: '#184D28', fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.55rem', borderRadius: '12px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}