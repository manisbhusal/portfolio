import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
const photoAsset = { url: "/manish-photo.png" };

const TITLE = "Manish Bhusal — Developer, Editor & Creator";
const DESCRIPTION =
  "Portfolio of Manish Bhusal — BSc. CSIT student, web developer, and video editor based in Kathmandu, Nepal. Building web experiences and sharing what I love.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Manish Bhusal, portfolio, web developer, video editor, content creator, BSc CSIT, Kathmandu, Nepal, frontend developer",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:creator", content: "@ManishBhusal28" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Manish Bhusal",
          jobTitle: "Web Developer & Video Editor",
          description: DESCRIPTION,
          url: "/",
          image: photoAsset.url,
          email: "mailto:manisbhusal187@gmail.com",
          telephone: "+977 9840271195",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kathmandu",
            addressCountry: "NP",
          },
          alumniOf: [
            { "@type": "EducationalOrganization", name: "Ratna Rajya Secondary School" },
            { "@type": "EducationalOrganization", name: "Vinayak Siddha College" },
          ],
          worksFor: { "@type": "EducationalOrganization", name: "Aadin National College" },
          sameAs: [
            "https://github.com/manisbhusal",
            "https://www.linkedin.com/in/bhusalmanish/",
            "https://www.youtube.com/@ManishBhusal28",
            "https://www.facebook.com/manis.bhusal.5",
            "https://www.instagram.com/manisbhusal",
          ],
        }),
      },
    ],
  }),
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#content", label: "Content" },
  { href: "#contact", label: "Contact" },
];

type Project = {
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
  links: readonly { href: string; icon: string; label: string }[];
  featured?: boolean;
};

const PROJECTS: readonly Project[] = [
  {
    icon: "fa-solid fa-clapperboard",
    title: "AniHubz — Anime Streaming Site",
    description:
      "A fast, minimal anime discovery and streaming interface built on top of my own AniList-powered API. Search, browse, and watch with a clean UI.",
    tags: ["React", "AniList", "Vercel"],
    links: [
      { href: "https://anihubz.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", label: "Live demo" },
      { href: "https://github.com/manisbhusal/anilist-anime-api", icon: "fa-brands fa-github", label: "GitHub" },
    ],
    featured: true,
  },
  {
    icon: "fa-solid fa-code",
    title: "AniList Anime API",
    description:
      "An open-source anime API wrapper around AniList, deployed on Vercel and powering AniHubz. Simple endpoints, JSON output, ready to plug in.",
    tags: ["Node", "API", "AniList"],
    links: [
      { href: "https://anihub-orcin.vercel.app/", icon: "fa-solid fa-arrow-up-right-from-square", label: "Base URL" },
      { href: "https://github.com/manisbhusal/anilist-anime-api", icon: "fa-brands fa-github", label: "GitHub" },
    ],
  },
  {
    icon: "fa-solid fa-user-astronaut",
    title: "Personal Portfolio",
    description:
      "This site — a fully responsive single-page portfolio with hand-crafted styling, smooth reveals, a projects grid, contact form, and dark/light theme.",
    tags: ["TanStack Start", "React", "CSS"],
    links: [
      { href: "https://github.com/manisbhusal", icon: "fa-brands fa-github", label: "GitHub" },
    ],
  },
  {
    icon: "fa-solid fa-film",
    title: "Video Edits",
    description:
      "A rotating collection of edits I've made for fun — music, gaming clips, and vlogs uploaded to my YouTube channel.",
    tags: ["Premiere Pro", "CapCut"],
    links: [
      { href: "https://www.youtube.com/@ManishBhusal28", icon: "fa-brands fa-youtube", label: "YouTube" },
    ],
  },
  {
    icon: "fa-solid fa-flask",
    title: "More coming soon",
    description:
      "Always experimenting — small UI ideas, API wrappers, and side projects. Follow along on GitHub for what's next.",
    tags: ["WIP", "Experiments"],
    links: [
      { href: "https://github.com/manisbhusal", icon: "fa-brands fa-github", label: "GitHub" },
    ],
  },
];

const SOCIALS = [
  { href: "https://github.com/manisbhusal", label: "GitHub", icon: "fa-brands fa-github", cls: "s-gh" },
  { href: "https://www.linkedin.com/in/bhusalmanish/", label: "LinkedIn", icon: "fa-brands fa-linkedin-in", cls: "s-li" },
  { href: "https://www.youtube.com/@ManishBhusal28", label: "YouTube", icon: "fa-brands fa-youtube", cls: "s-yt" },
  { href: "https://www.facebook.com/manis.bhusal.5", label: "Facebook", icon: "fa-brands fa-facebook-f", cls: "s-fb" },
  { href: "https://www.instagram.com/manisbhusal", label: "Instagram", icon: "fa-brands fa-instagram", cls: "s-ig" },
];

const EMAIL = "manisbhusal187@gmail.com";
const PHONE_DISPLAY = "+977 9840271195";
const PHONE_TEL = "+9779840271195";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type FormErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // form
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ kind: "success" | ""; text: string }>({ kind: "", text: "" });

  // scroll state
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // reveal on scroll
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // project cursor glow
  useEffect(() => {
    if (!rootRef.current) return;
    const cards = Array.from(rootRef.current.querySelectorAll<HTMLElement>(".project"));
    const handlers: Array<[HTMLElement, (e: PointerEvent) => void]> = [];
    cards.forEach((card) => {
      const h = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      card.addEventListener("pointermove", h);
      handlers.push([card, h]);
    });
    return () => handlers.forEach(([c, h]) => c.removeEventListener("pointermove", h));
  }, []);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  const validate = (data: typeof form): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Please enter your name.";
    else if (data.name.length > 100) e.name = "Name is too long (max 100).";
    if (!data.email.trim()) e.email = "Please enter your email.";
    else if (!EMAIL_RE.test(data.email)) e.email = "That email doesn’t look right.";
    else if (data.email.length > 255) e.email = "Email is too long.";
    if (data.subject.length > 150) e.subject = "Subject is too long (max 150).";
    if (!data.message.trim()) e.message = "Please write a short message.";
    else if (data.message.trim().length < 10) e.message = "A little more detail, please (min 10 chars).";
    else if (data.message.length > 1000) e.message = "Message is too long (max 1000).";
    return e;
  };

  const onChange = (k: keyof typeof form) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const subject = form.subject.trim() || `New message from ${form.name.trim()}`;
    const body = `Hi Manish,\n\n${form.message.trim()}\n\n—\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus({ kind: "success", text: `Opening your email app… if nothing happens, email me at ${EMAIL}.` });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio" ref={rootRef}>
      <div className="bg-fx" aria-hidden />
      <div className="bg-grid" aria-hidden />

      {/* NAV */}
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="logo">
            <img className="logo-photo" src={photoAsset.url} alt="Manish Bhusal" />
            <span>Manish Bhusal</span>
          </a>
          <nav>
            <ul className="nav-links">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" type="button">
              <i className="fa-solid fa-moon" aria-hidden />
              <i className="fa-solid fa-sun" aria-hidden />
            </button>
            <a href="#contact" className="nav-cta">
              Get in Touch <i className="fa-solid fa-arrow-right" aria-hidden />
            </a>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} onClick={closeMenu}>
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="reveal">
              <div className="hero-status">
                <span className="status-dot" /> Available for collaborations
              </div>
              <h1>
                Hi, I'm <span className="gradient-text">Manish Bhusal</span>
              </h1>
              <p className="lead">BSc. CSIT Student, Web Developer, and Video Editor based in Kathmandu.</p>
              <p className="sub">
                I build responsive web experiences, edit videos with intention, and share the things I love — from
                music to gaming.
              </p>
              <div className="role-tags">
                <span className="role-tag">// developer</span>
                <span className="role-tag">// editor</span>
                <span className="role-tag">// creator</span>
              </div>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> Get in Touch
                </a>
                <a
                  href="https://anihubz.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <i className="fa-solid fa-clapperboard" aria-hidden /> See AniHubz
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  <i className="fa-solid fa-location-dot" aria-hidden /> Kathmandu, Nepal
                </span>
                <span>
                  <i className="fa-solid fa-graduation-cap" aria-hidden /> BSc. CSIT · Ongoing
                </span>
              </div>
            </div>

            <div className="reveal hero-photo-wrap">
              <div className="hero-photo-glow" aria-hidden />
              <div className="hero-photo">
                <img src={photoAsset.url} alt="Manish Bhusal — portrait" />
              </div>
              <span className="hero-photo-badge">
                <i className="fa-solid fa-code" aria-hidden /> ~/manish
              </span>
              <div className="hero-socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social ${s.cls}`}
                    aria-label={s.label}
                  >
                    <i className={s.icon} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">01 — About</div>
            <h2>
              A student, a builder, <span className="gradient-text">a creator.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                I'm an aspiring tech professional originally from <strong>Arghakhanchi, Nepal</strong>, currently based
                in <strong>Kathmandu</strong> where I'm pursuing my higher education in Computer Science and Information
                Technology.
              </p>
              <p>
                My work sits at the intersection of code and creativity. I build responsive web experiences, edit
                videos with intention, and manage a small social presence focused on the things I actually enjoy.
              </p>
              <p>I'm curious by default, I ship early, and I care about the details that make software feel human.</p>
            </div>
            <aside className="about-card reveal">
              <div className="fact">
                <div className="fact-icon">
                  <i className="fa-solid fa-location-dot" aria-hidden />
                </div>
                <div>
                  <div className="fact-label">Based in</div>
                  <div className="fact-value">Kathmandu, Nepal</div>
                </div>
              </div>
              <div className="fact">
                <div className="fact-icon">
                  <i className="fa-solid fa-graduation-cap" aria-hidden />
                </div>
                <div>
                  <div className="fact-label">Studying</div>
                  <div className="fact-value">BSc. CSIT</div>
                </div>
              </div>
              <div className="fact">
                <div className="fact-icon">
                  <i className="fa-solid fa-code" aria-hidden />
                </div>
                <div>
                  <div className="fact-label">Focus</div>
                  <div className="fact-value">Frontend Development</div>
                </div>
              </div>
              <div className="fact">
                <div className="fact-icon">
                  <i className="fa-solid fa-video" aria-hidden />
                </div>
                <div>
                  <div className="fact-label">Enjoys</div>
                  <div className="fact-value">Video Editing & Creating</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">02 — Journey</div>
            <h2>
              Education <span className="gradient-text">Timeline</span>
            </h2>
            <p>The milestones that shaped how I think, build, and learn.</p>
          </div>
          <div className="timeline">
            <div className="tl-item reveal">
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-date">2079 BS</div>
                <h3 className="tl-title">Secondary Education Examination (SEE)</h3>
                <p className="tl-place">Ratna Rajya Secondary School</p>
              </div>
            </div>
            <div className="tl-item reveal">
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-date">2081 BS</div>
                <h3 className="tl-title">+2 Science (SLC)</h3>
                <p className="tl-place">Vinayak Siddha College</p>
              </div>
            </div>
            <div className="tl-item current reveal">
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-date">Ongoing</div>
                <h3 className="tl-title">BSc. Computer Science & Information Technology</h3>
                <p className="tl-place">Aadin National College</p>
                <span className="tl-badge">Currently Pursuing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">03 — Expertise</div>
            <h2>
              Skills & <span className="gradient-text">Craft</span>
            </h2>
            <p>A versatile toolkit across development, video, and social — used to ship real work.</p>
          </div>
          <div className="skills-grid">
            <article className="skill s1 reveal">
              <div className="skill-icon">
                <i className="fa-solid fa-code" aria-hidden />
              </div>
              <h3>Web Development</h3>
              <p>Frontend technologies, responsive design, and building web apps that feel fast and accessible.</p>
              <div className="skill-tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>React</span>
              </div>
            </article>
            <article className="skill s2 reveal">
              <div className="skill-icon">
                <i className="fa-solid fa-film" aria-hidden />
              </div>
              <h3>Video Editing</h3>
              <p>Creating engaging visual content with attention to pacing, storytelling, and clean finishes.</p>
              <div className="skill-tags">
                <span>Premiere Pro</span>
                <span>CapCut</span>
                <span>Storytelling</span>
              </div>
            </article>
            <article className="skill s3 reveal">
              <div className="skill-icon">
                <i className="fa-solid fa-hashtag" aria-hidden />
              </div>
              <h3>Social Media</h3>
              <p>Brand building, audience engagement, and content strategy that turns viewers into a community.</p>
              <div className="skill-tags">
                <span>Strategy</span>
                <span>Growth</span>
                <span>Branding</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">04 — Work</div>
            <h2>
              Selected <span className="gradient-text">Projects</span>
            </h2>
            <p>A few things I've built while learning — code on GitHub, live demos one click away.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <article className="project reveal" key={p.title}>
                {p.featured ? <span className="featured-badge">Featured</span> : null}
                <div className="project-head">
                  <div className="project-icon">
                    <i className={p.icon} aria-hidden />
                  </div>
                  <div className="project-links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
                        <i className={l.icon} aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT / YOUTUBE */}
      <section id="content" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow" style={{ color: "#ff8fa3" }}>
              05 — Content
            </div>
            <h2>
              Just stuff I{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#ff0033,#ff8fa3)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                love
              </span>
              .
            </h2>
          </div>
          <div className="yt-card reveal">
            <div className="yt-inner">
              <div>
                <div className="yt-badge">
                  <i className="fa-brands fa-youtube" aria-hidden /> Live Channel
                </div>
                <h2>Music, vlogs, gaming — whatever I'm into.</h2>
                <p>
                  My YouTube is a personal space. I upload videos I like — sometimes music, sometimes vlogs, sometimes
                  gaming clips. No niche, no schedule, just what feels right.
                </p>
                <div className="yt-tags">
                  <span>🎵 Music</span>
                  <span>🎮 Gaming</span>
                  <span>📹 Vlogs</span>
                  <span>✨ Whatever</span>
                </div>
                <a
                  href="https://www.youtube.com/@ManishBhusal28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-yt"
                >
                  <i className="fa-brands fa-youtube" style={{ fontSize: "1.2rem" }} aria-hidden />
                  @ManishBhusal28
                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: ".8rem", opacity: 0.8 }} aria-hidden />
                </a>
              </div>
              <div className="yt-visual">
                <a
                  href="https://www.youtube.com/@ManishBhusal28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-play"
                  aria-label="Open YouTube channel"
                >
                  <i className="fa-solid fa-play" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <div
            className="section-head reveal"
            style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              06 — Contact
            </div>
            <h2>
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p>
              Open to collaborations, freelance work, and interesting conversations. Send a message or reach out
              directly.
            </p>
          </div>

          <div className="contact-grid-wrap">
            <div className="reveal">
              <div className="contact-cards">
                <a href={`mailto:${EMAIL}`} className="contact-card">
                  <div className="contact-icon">
                    <i className="fa-solid fa-envelope" aria-hidden />
                  </div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{EMAIL}</div>
                  </div>
                </a>
                <a href={`tel:${PHONE_TEL}`} className="contact-card c-phone">
                  <div className="contact-icon">
                    <i className="fa-solid fa-phone" aria-hidden />
                  </div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">{PHONE_DISPLAY}</div>
                  </div>
                </a>
              </div>
              <div className="socials">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social ${s.cls}`}
                    aria-label={s.label}
                  >
                    <i className={s.icon} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
              <div className="form-row two">
                <div className={`field${errors.name ? " error" : ""}`}>
                  <label htmlFor="cf-name">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={onChange("name")}
                    required
                  />
                  <div className="err-msg">{errors.name || ""}</div>
                </div>
                <div className={`field${errors.email ? " error" : ""}`}>
                  <label htmlFor="cf-email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    maxLength={255}
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={onChange("email")}
                    required
                  />
                  <div className="err-msg">{errors.email || ""}</div>
                </div>
              </div>
              <div className="form-row">
                <div className={`field${errors.subject ? " error" : ""}`}>
                  <label htmlFor="cf-subject">Subject</label>
                  <input
                    id="cf-subject"
                    name="subject"
                    type="text"
                    maxLength={150}
                    placeholder="Let's build something"
                    value={form.subject}
                    onChange={onChange("subject")}
                  />
                  <div className="err-msg">{errors.subject || ""}</div>
                </div>
              </div>
              <div className="form-row">
                <div className={`field${errors.message ? " error" : ""}`}>
                  <label htmlFor="cf-message">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    maxLength={1000}
                    placeholder="Tell me a bit about what you have in mind..."
                    value={form.message}
                    onChange={onChange("message")}
                    required
                  />
                  <div className="err-msg">{errors.message || ""}</div>
                </div>
              </div>
              <div className="form-foot">
                <span className="form-note">
                  <i
                    className="fa-solid fa-shield-halved"
                    style={{ marginRight: 6, color: "var(--accent-2)" }}
                    aria-hidden
                  />
                  Opens your email app — no data stored or sent through a server.
                </span>
                <button type="submit" className="btn btn-primary">
                  <i className="fa-solid fa-paper-plane" aria-hidden /> Send Message
                </button>
              </div>
              <div className={`form-status${status.kind ? ` show ${status.kind}` : ""}`}>
                {status.kind === "success" ? (
                  <>
                    <i className="fa-solid fa-circle-check" style={{ marginRight: 6 }} aria-hidden />
                    {status.text}
                  </>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © 2026 <strong>Manish Bhusal</strong>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
