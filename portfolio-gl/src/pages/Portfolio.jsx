import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Portfolio.css";

const items = [
  { id: 1, title: "Eventify",  youtubeId: "-ms5nOc79GQ", tags: ["React", "Laravel", "API"], desc: "Eventify, plan trips for events." },
  { id: 2, title: "Gustify",   youtubeId: "ScMzIvxBSi4", tags: ["Laravel", "API", "Socialite"], desc: "Spotify stats you don't see on Spotify." },
  // { id: 3, title: "Template",  youtubeId: "aqz-KE-bpKQ", tags: ["Template", "Template"], desc: "Template." },
];

const ytThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export default function Portfolio() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    document.title = "Portfolio";   
  }, []);
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
          Selected any of my projects.
        </motion.p>
      </header>

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
              <img src={ytThumb(it.youtubeId)} alt="" loading="lazy" />
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
