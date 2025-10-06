import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { sendContactEmail } from "../lib/email";
import HeroAccent from "../components/HeroAccent";
import "./Start.css";

const logos = {
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Laravel: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/100px-Laravel.svg.png?20190820171151",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Tailwind: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  VScode: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png",
};

const GITHUB_URL = "https://github.com/GustavsLieknins";

export default function Start() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 40); document.title = "Portfolio";     return () => clearTimeout(t); }, []);

  return (
    <>
      <Toaster position="top-right" />

      <header className="hero wrap">
        <motion.p className="kicker" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.4}}>
          Gustavs Lieknins · Full-stack web developer
        </motion.p>

        <motion.h1 className="title" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.05}}>
          Welcome to my <span className="accent" id="accent-anchor">portfolio</span>
        </motion.h1>

        <motion.p className="subtitle" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.1}}>
          I design and build web applications.
        </motion.p>

        <motion.div className="actions" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.15}}>
          <Link to="/portfolio" className="btn primary">View projects</Link>
          <a href="#skills" className="btn">Skills</a>
          <a href={GITHUB_URL} className="btn github" target="_blank" rel="noopener noreferrer" aria-label="Open my GitHub profile">
          <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
            -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27
            1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
            0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span>GitHub</span>
        </a>
        </motion.div>

        <HeroAccent />
      </header>

      <main id="skills" className="wrap">
        <h2 className="sectionTitle">Skills</h2>

        <SkillSection title="Languages and technologies">
          <SkillCard
            name="HTML5"
            logo={logos.HTML5}
            blurb="Semantic markup to build fast, clean foundations for any web app."
            mounted={mounted}
          />
          <SkillCard
            name="JavaScript"
            logo={logos.JavaScript}
            blurb="DOM work, writing reliable code for the web apps."
            mounted={mounted}
          />
          <SkillCard
            name="PHP"
            logo={logos.PHP}
            blurb="API/backend development, routing, controllers and services."
            mounted={mounted}
          />
        </SkillSection>

        <SkillSection title="Frameworks & Libraries">
          <SkillCard
            name="Laravel"
            logo={logos.Laravel}
            blurb="REST APIs, CRUD, testing and secure apps."
            mounted={mounted}
          />
          <SkillCard
            name="React"
            logo={logos.React}
            blurb="Hooks, router, states, useEffect, build interactive and scalable apps."
            mounted={mounted}
          />
        </SkillSection>

        <SkillSection title="Styling">
          <SkillCard
            name="CSS3"
            logo={logos.CSS3}
            blurb="Layouts, animations, responsive systems, modern CSS styling."
            mounted={mounted}
          />
          <SkillCard
            name="Tailwind CSS"
            logo={logos.Tailwind}
            blurb="Styling for web apps with a consistent design language."
            mounted={mounted}
          />
        </SkillSection>

        <SkillSection title="Databases">
          <SkillCard
            name="MySQL"
            logo={logos.MySQL}
            blurb="Writing SQL queries and keeping performance of the database healthy."
            mounted={mounted}
          />
        </SkillSection>

        <SkillSection title="Tools">
          <SkillCard
            name="Git"
            logo={logos.Git}
            blurb="Clean commits, reviews and projects that can be scaled."
            mounted={mounted}
          />
          <SkillCard
            name="VS Code"
            logo={logos.VScode}
            blurb="My go to editor, with all the features I need to get my work done."
            mounted={mounted}
          />
        </SkillSection>

        <section id="contact" className="contact">
          <h2 className="sectionTitle">Contact Me</h2>
          <ContactForm />
        </section>
      </main>

      <footer className="wrap footer">
        <small>© {new Date().getFullYear()} — Built by Gustavs Lieknins · <a href={GITHUB_URL} className="gh-foot" target="_blank" rel="noopener noreferrer">GitHub</a></small>
      </footer>

    </>
  );
}

function SkillSection({ title, children }) {
  return (
    <section className="skillSection">
      <div className="subhead">
        <h3 className="skillHeader">{title}</h3>
        <div className="subhead__line" />
      </div>
      <div className="grid">{children}</div>
    </section>
  );
}

function SkillCard({ name, logo, blurb, mounted }) {
  return (
    <motion.article
      className="card card--tech"
      role="listitem"
      aria-label={`${name} skill`}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .2 }}
      transition={{ duration: .45 }}
    >
      <div className="card__topline" />
      <div className="tech">
        <div className="tech__logoWrap">
          <img className="tech__logo" src={logo} alt="" loading="lazy" />
        </div>
        <div className="tech__meta">
          <h4 className="cardTitle">{name}</h4>
          <p className="tagline">{blurb}</p>
        </div>
      </div>
    </motion.article>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const botField = String(form.get("website") || "");

    if (botField) return;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || message.length < 2) return;

    setLoading(true);
    const id = toast.loading("Sending...");
    sendContactEmail({ name, email, message }).catch(() => {});
    e.currentTarget.reset();
    setLoading(false);
    toast.success("Message sent.", { id });
  }

  return (
    <form className="contactForm" onSubmit={onSubmit} noValidate>
      <div className="row">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@mail.com" required />
        </label>
      </div>

      <label className="full">
        <span>Message</span>
        <textarea name="message" rows="5" placeholder="Contact me about anything..." required />
      </label>
      <label className="hp">
        <span>Website</span>
        <input name="website" tabIndex="-1" autoComplete="off" />
      </label>

      <button className={`btn primary ${loading ? "is-loading" : ""}`} type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send"}
        <span className="spinner" aria-hidden />
      </button>
    </form>
  );
}
