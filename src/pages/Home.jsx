// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
     
      <header
        className="relative h-screen flex items-center justify-center pt-16 text-white"
        style={{
          backgroundImage: `
            url('/tiger.jpg'),
            linear-gradient(
              to bottom right,
              rgba(0,106,78,0.8),
              rgba(244,42,65,0.8)
            )
          `,
          backgroundBlendMode: 'overlay',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '40% auto, cover',
          backgroundPosition: 'center, center',
        }}
      >
        <div className="text-center max-w-2xl px-6 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Empowering Bangladesh’s Future
            <br />
            <span className="text-red-300">
              Through Data‑Driven Insights
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Visualize export diversification and local investments to guide national strategy.
          </p>
          <Link
            to="/exports"
            className="inline-block bg-white text-green-800 font-semibold px-6 py-3 rounded-full hover:shadow-lg transition"
          >
            Explore Exports →
          </Link>
        </div>
      </header>

      
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Export Dashboard',
            borderClass: 'border-red-600',
            desc: 'Track sectoral export performance.',
          },
          {
            title: 'Investment Heatmap',
            borderClass: 'border-green-800',
            desc: 'Map regional investment density.',
          },
          {
            title: 'Policy Reports',
            borderClass: 'border-red-600',
            desc: 'Download the latest publications.',
          },
        ].map(({ title, borderClass, desc }) => (
          <div
            key={title}
            className={`bg-white rounded-xl shadow hover:shadow-lg transition p-6 border-t-4 ${borderClass}`}
          >
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
