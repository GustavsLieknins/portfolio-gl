import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Portfolio.css";

const items = [
  { id: 1, title: "Eventify", poster: "/images/eventify-logo.png", tags: ["React", "Laravel", "API"], video: "/videos/eventify-showcase.mov", desc: "Eventify, plan trips for events." },
  { id: 2, title: "Project Beta", poster: "https://picsum.photos/seed/b/800/450", tags: ["Laravel", "SQL"], video: "/videos/beta.mp4", desc: "Short description for Beta." },
  { id: 3, title: "UI Motion Reel", poster: "https://picsum.photos/seed/c/800/450", tags: ["Motion", "Design"], video: "/videos/reel.mp4", desc: "Motion demo." },
  { id: 4, title: "Dashboard", poster: "https://picsum.photos/seed/d/800/450", tags: ["Charts", "React"], video: "/videos/dashboard.mp4", desc: "Admin dashboard." },
  { id: 5, title: "E-commerce", poster: "https://picsum.photos/seed/e/800/450", tags: ["Laravel", "React"], video: "/videos/shop.mp4", desc: "Storefront demo." },
  { id: 6, title: "Landing", poster: "https://picsum.photos/seed/f/800/450", tags: ["Brand", "UX"], video: "/videos/landing.mp4", desc: "Landing page." },
];

export default function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <div className="portfolio wrap">
      <header className="p-hero">
        <div className="p-hero__top">
          <Link to="/" className="backBtn" aria-label="Back to start">
            <span className="chev">←</span> Back
          </Link>
        </div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          Portfolio
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .05 }}>
          Selected work and experiments.
        </motion.p>
      </header>

      <section className="filters">
        <button className="tag is-active">All</button>
        <button className="tag">React</button>
        <button className="tag">Laravel</button>
        <button className="tag">Design</button>
      </section>

      <section className="grid">
        {items.map((it, i) => (
          <motion.article
            key={it.id}
            className="p-card"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .2 }}
            transition={{ duration: .45, delay: i * 0.03 }}
            onClick={() => setActive(it)}
          >
            <div className="thumb">
              <img src={it.poster} alt="" loading="lazy" />
            </div>
            <div className="meta">
              <h3>{it.title}</h3>
              <div className="tags">
                {it.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {active && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="lb__backdrop" onClick={() => setActive(null)} aria-label="Close" />
          <div className="lb__panel">
            <header className="lb__head">
              <h2>{active.title}</h2>
              <button className="icon" onClick={() => setActive(null)} aria-label="Close">✕</button>
            </header>

            <div className="lb__content">
              <div className="lb__media">
                <video
                  key={active.video}
                  className="lb__videoEl"
                  src={active.video}
                  poster={active.poster}
                  controls
                  playsInline
                />
              </div>
              <div className="lb__meta">
                <p className="lb__desc">{active.desc}</p>
                <div className="lb__tags">
                  {active.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
