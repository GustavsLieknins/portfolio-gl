import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Portfolio.css";

const items = [
  {
    id: 1,
    title: "Eventify",
    youtubeId: "-ms5nOc79GQ",
    tags: ["React", "Laravel", "API"],
    desc: "Eventify helps you plan trips around events with routes, budgets and shared itineraries.",
    github: "https://github.com/GustavsLieknins/Eventify",
  },
  {
    id: 2,
    title: "Gustify",
    youtubeId: "o92E2my_xHs",
    tags: ["Laravel", "API", "Socialite"],
    desc: "Gustify pulls Spotify data you rarely see and turns it into clean, shareable insights.",
    github: "https://github.com/GustavsLieknins/spoty",
  },
  {
    id: 3,
    title: "Car Marketplace",
    youtubeId: "4fOuOE-ri-A",
    tags: ["Laravel", "Breeze", "CSS"],
    desc: "A full marketplace with admin and superadmin panels for managing listings and users.",
    github: "https://github.com/GustavsLieknins/marketplace",
  },
];

const ytThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export default function Portfolio() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.title = "Portfolio";
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="portfolio wrap">
      <header className="p-hero">
        <div className="p-hero__top">
          <Link to="/" className="backBtn" aria-label="Back to start">
            <span className="chev">←</span> Back
          </Link>
        </div>

        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Portfolio
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          Selected projects.
        </motion.p>
      </header>

      <section className="grid">
        {items.map((it, i) => (
          <motion.article
            key={it.id}
            className="p-card"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.03 }}
            onClick={() => setActive(it)}
          >
            <div className="thumb">
              <img src={ytThumb(it.youtubeId)} alt="" loading="lazy" />
              <a
                className="ghBadge"
                href={it.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                GitHub
              </a>
            </div>
            <div className="meta">
              <h3>{it.title}</h3>
              <div className="tags">
                {it.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
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
              <div className="lb__actions">
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghLink"
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                  GitHub
                </a>
                <button className="icon" onClick={() => setActive(null)} aria-label="Close">✕</button>
              </div>
            </header>

            <div className="lb__content">
              <div className="lb__media">
                <iframe
                  key={active.youtubeId}
                  className="lb__iframe"
                  title={active.title}
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="lb__meta">
                <p className="lb__desc">{active.desc}</p>
                <div className="lb__tags">
                  {active.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
