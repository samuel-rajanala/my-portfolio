import { useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Shield, Terminal, LockKeyhole, Bug, Network, Fingerprint, ScanEye, Code2 } from 'lucide-react';
import { profile } from '../lib/assets';
import { useLenis, useMagnetic, useScrollOffset } from '../hooks/useMotion';

const services = [
  ['01', 'Security Research', 'Methodical, authorized security research with clear scope, evidence and responsible reporting.'],
  ['02', 'Application Security', 'Exploring web application risks, security controls, authentication flows and practical remediation.'],
  ['03', 'Security Tooling', 'Building small, focused tools that make security checks, triage and workflows easier to understand.'],
  ['04', 'Open-source Security', 'Learning in public, contributing to community projects and making security knowledge more accessible.'],
  ['05', 'Continuous Learning', 'Hands-on labs, CTF challenges and structured learning across defensive and offensive security.']
];

const projects = [
  { n: '01', category: 'OPEN-SOURCE PLATFORM', title: 'Open Core Security', desc: 'A community-focused security learning platform with challenges, submissions and protected solution access.', tags: ['React', 'Supabase', 'Edge Functions'], link: 'https://github.com/samuel-rajanala/open-core-security', icon: Shield, visual: 'globe' },
  { n: '02', category: 'SECURITY WORKFLOW', title: 'P³ Prototype', desc: 'A prototype exploring a more structured security workflow. Built and reviewed with attention to functionality, usability and secure implementation.', tags: ['Python', 'React', 'Security'], link: 'https://github.com/BlueOps-Community/p3-prototype', icon: Network, visual: 'terminal' },
  { n: '03', category: 'RESEARCH TOOLING', title: 'Bug Bounty Research Agent', desc: 'A passive-first research assistant with fail-closed authorization gates and human approval before any testing. Production testing remains disabled.', tags: ['Python', 'Authorization', 'Automation'], link: 'https://github.com/samuel-rajanala/mercadolibre-bugbounty-agent', icon: Bug, visual: 'matrix' }
];

function ContactButton({ children = 'LET’S CONNECT' }: { children?: string }) {
  return <a className="gradient-button" href={`mailto:${profile.email}`}>{children}<ArrowUpRight size={17} /></a>;
}

function Hero() {
  const magnetic = useMagnetic<HTMLDivElement>();
  return <section className="hero" id="top">
    <nav className="nav"><a className="brand" href="#top">SR<span>.</span></a><div className="nav-links"><a href="#about">ABOUT</a><a href="#services">FOCUS</a><a href="#projects">PROJECTS</a><a href="#contact">CONTACT</a></div><a className="nav-status" href="#contact"><i /> AVAILABLE TO CONNECT</a></nav>
    <div className="hero-title-wrap"><h1 className="hero-title">HEY, I’M <span>SAM.</span></h1></div>
    <div className="hero-stage" aria-label="Abstract security-themed Sam monogram artwork"><div className="hero-stage-inner" ref={magnetic}>
      <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
      <div className="core-glow"/><div className="core-sphere"><span>SR</span></div>
      <div className="stage-chip chip-top"><Fingerprint size={15}/> IDENTITY / 001</div>
      <div className="stage-chip chip-bottom"><ScanEye size={15}/> THINK · BUILD · SECURE</div>
      <span className="crosshair crosshair-a">+</span><span className="crosshair crosshair-b">+</span>
    </div></div>
    <div className="hero-bottom"><p>CYBERSECURITY STUDENT<br/>BUILDING TO UNDERSTAND.<br/>RESEARCHING TO MAKE THINGS SAFER.</p><div className="hero-meta"><span>INDIA · 2026</span><span>SCROLL TO EXPLORE ↓</span></div><ContactButton>CONTACT ME</ContactButton></div>
    <div className="hero-index">PORTFOLIO — 001 / 026</div>
  </section>;
}

function SignalBand() {
  const ref = useRef<HTMLElement>(null);
  useScrollOffset(ref);
  const items = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);
  return <section className="signal-band" ref={ref} aria-label="Cybersecurity disciplines">
    <div className="signal-label"><span>AREAS I EXPLORE</span><span>01 — 06</span></div>
    <div className="signal-row row-a">{items.map((i) => <div className="signal-tile" key={`a${i}`}><div className="tile-top"><span>SYS_{String(i + 1).padStart(2, '0')}</span><span className="live-dot"/></div><div className="tile-graphic"><div className={`tile-orb orb-${i % 4}`}><span>{['01','0x','/','∿'][i % 4]}</span></div><div className="tile-lines"><i/><i/><i/></div></div><div className="tile-name">{['THREAT INTEL','APP SECURITY','NETWORKS','RESEARCH'][i % 4]}</div></div>)}</div>
    <div className="signal-row row-b">{items.slice().reverse().map((i) => <div className="signal-tile tile-alt" key={`b${i}`}><div className="tile-top"><span>TRACE_{String(i + 1).padStart(2, '0')}</span><span className="live-dot"/></div><div className="tile-graphic"><div className={`tile-orb orb-${(i + 2) % 4}`}><span>{['⌘','{}','⌁','◈'][i % 4]}</span></div><div className="tile-lines"><i/><i/><i/></div></div><div className="tile-name">{['DEFENSE','AUTOMATION','OPEN SOURCE','CTF LABS'][i % 4]}</div></div>)}</div>
  </section>;
}

function LitText({ copy, className = '' }: { copy: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const chars = Array.from(node.querySelectorAll<HTMLElement>('.lit-char'));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const start = window.innerHeight * .82;
        const end = window.innerHeight * .24;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
        chars.forEach((char, i) => {
          const p = i / Math.max(1, chars.length - 1);
          char.style.opacity = String(.2 + .8 * Math.min(1, Math.max(0, (progress - p * .68) / .32)));
        });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <p className={`lit-copy ${className}`} ref={ref}>{copy.split('').map((char, i) => <span className="lit-char" aria-hidden="true" key={i}>{char}</span>)}</p>;
}

function AboutStory() {
  const blocks = [
    { n: '01', title: 'WHAT DRIVES ME', text: 'I like understanding how systems work, where they fail, and how thoughtful security decisions make them more resilient. Curiosity is usually where my best questions begin.' },
    { n: '02', title: 'WHAT I’VE EXPLORED', text: 'Through cybersecurity internships and hands-on learning, I’ve explored network security, FortiGate operations, SOC workflows, cybercrime investigation, digital forensics and application security.' },
    { n: '03', title: 'HOW I APPROACH IT', text: 'I value practical work, clear evidence and responsible testing. Whether I’m learning in a lab or building a project, I try to stay methodical, keep improving and share what I learn.' }
  ];
  return <div className="about-story">
    <div className="about-lead"><span className="about-lead-label">A LITTLE ABOUT MY APPROACH</span><h3>Curiosity drives me.<br/><span>Security gives it direction.</span></h3>
      <LitText copy="I’m Sam — a cybersecurity undergraduate interested in threat detection, network security and cyber defense. I enjoy turning questions into practical learning, projects and safer ways of thinking about technology." />
    </div>
    <div className="about-blocks">{blocks.map((block) => <article className="about-block" key={block.n}>
      <div className="about-block-top"><span>{block.n} / 03</span><span>{block.title}</span></div>
      <LitText copy={block.text} className="about-block-copy" />
    </article>)}</div>
  </div>;
}

function About() {
  return <section className="about section-pad" id="about"><div className="float-icon icon-a"><Shield/></div><div className="float-icon icon-b"><Terminal/></div><div className="float-icon icon-c"><LockKeyhole/></div><div className="float-icon icon-d"><Code2/></div>
    <div className="section-kicker"><span>01 / THE PERSON BEHIND THE TERMINAL</span><span>ABOUT ME</span></div>
    <h2 className="section-heading gradient-text">ABOUT ME<span>.</span></h2><AboutStory/>
    <div className="about-foot"><span>RAMACHANDRA COLLEGE OF ENGINEERING · B.TECH CYBERSECURITY</span><span>CURIOUS BY DEFAULT. CAREFUL BY DESIGN.</span></div>
  </section>;
}

const experience = [
  { date: 'JUN 2026', org: 'UTTAR PRADESH POLICE · AMROHA', role: 'APCSIP (2026) Intern', detail: 'Cybercrime investigation, digital forensics, cyber threat analysis and digital evidence handling.' },
  { date: 'APR — JUL 2026', org: 'FORTINET · REMOTE', role: 'Network Security Associate Intern', detail: 'FortiGate 7.4 concepts and practice: firewall configuration, routing, SSL inspection, IPS, VPNs and Security Fabric monitoring.' },
  { date: 'JAN — MAR 2026', org: 'PALO ALTO NETWORKS · REMOTE', role: 'Cybersecurity Intern', detail: 'Network and next-generation firewall fundamentals, endpoint and cloud security concepts, SOC workflows, threat intelligence and SOAR.' }
];

function Experience() {
  return <section className="experience section-pad" aria-labelledby="experience-title">
    <div className="section-kicker"><span>02 / EXPERIENCE & EXPOSURE</span><span>LEARNING BY DOING</span></div>
    <h2 id="experience-title" className="section-heading gradient-text">WHERE I’VE<br/>LEARNED<span>.</span></h2>
    <div className="experience-list">{experience.map((item) => <article className="experience-row" key={item.org}>
      <span className="experience-date">{item.date}</span><div><span className="experience-org">{item.org}</span><h3>{item.role}</h3><p>{item.detail}</p></div><ArrowUpRight className="experience-arrow"/>
    </article>)}</div>
    <div className="skills-line"><span>TOOLS & TOPICS</span><p>Burp Suite · Wireshark · Nmap · Metasploit · FortiGate · VAPT · SOC · OWASP Top 10 · ISO/IEC 27001 · Python · Java · C</p></div>
  </section>;
}

function Services() {
  return <section className="services" id="services"><div className="services-inner"><div className="section-kicker dark-kicker"><span>03 / WHAT I’M INTO</span><span>AREAS OF FOCUS</span></div><h2>WHAT I<br/><span>WORK ON.</span></h2><div className="service-list">{services.map(([n, title, desc]) => <article className="service-row" key={n}><span className="service-number">{n}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight className="service-arrow"/></article>)}</div><div className="services-note">NOT A CHECKLIST OF CLAIMS. A MAP OF WHAT I’M BUILDING TOWARD.</div></div></section>;
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const Icon = project.icon;
  return <div className="project-track"><article className={`project-card project-${index}`} style={{ top: `${24 + index * 28}px` }}>
    <div className="project-head"><span className="project-number">{project.n}</span><span className="project-category">{project.category}</span><a className="project-link" href={project.link} target="_blank" rel="noreferrer">VIEW PROJECT <ArrowUpRight size={15}/></a></div>
    <div className="project-body"><div className={`project-art art-${project.visual}`}><div className="art-grid"/><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-center"><Icon size={54} strokeWidth={1.2}/></div><span className="art-code">{project.visual === 'terminal' ? 'root@sam:~$' : project.visual === 'matrix' ? 'AUTHORIZATION // HUMAN REVIEW' : 'OPEN_CORE_SECURITY'}</span><span className="art-coord">0x{index + 11}F · SECURE</span></div><div className="project-info"><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="text-link" href={project.link} target="_blank" rel="noreferrer">EXPLORE REPOSITORY <ArrowUpRight size={16}/></a></div></div>
  </article></div>;
}

function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const tracks = Array.from(stack.querySelectorAll<HTMLElement>('.project-track'));
    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.project-card'));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => tracks.forEach((track, index) => {
        const rect = track.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        const shrink = (projects.length - 1 - index) * .03;
        cards[index]?.style.setProperty('transform', `scale(${1 - shrink * progress})`);
      }));
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <section className="projects section-pad" id="projects"><div className="section-kicker"><span>04 / SELECTED BUILDS</span><span>THOUGHT → CODE → IMPACT</span></div><h2 className="section-heading gradient-text">SELECTED<br/>PROJECTS<span>.</span></h2><p className="projects-intro">A few things I’ve been building, exploring and learning from. Each project is a work in progress — just like the person behind it.</p><div className="project-stack" ref={stackRef}>{projects.map((project, i) => <ProjectCard key={project.n} project={project} index={i}/>)}</div></section>;
}

function Contact() {
  return <footer className="contact section-pad" id="contact"><div className="section-kicker"><span>05 / YOUR TURN</span><span>OPEN TO OPPORTUNITIES & COLLABORATION</span></div><h2>LET’S MAKE<br/><span>SECURITY</span><br/>MATTER<span className="period">.</span></h2><div className="contact-bottom"><div><p>Have an interesting problem, a project, or an opportunity to talk about?</p><ContactButton>SAY HELLO</ContactButton></div><div className="socials"><a href={profile.github} target="_blank" rel="noreferrer"><Github/> GITHUB <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN <ArrowUpRight size={14}/></a><a href={`mailto:${profile.email}`}><Mail/> EMAIL <ArrowUpRight size={14}/></a></div></div><div className="footer-line"><span>© 2026 SAMUEL RAJANALA</span><a href="#top">BACK TO TOP ↑</a><span>BUILT WITH CURIOSITY.</span></div></footer>;
}

export default function Portfolio() {
  useLenis();
  return <main className="site-shell"><Hero/><SignalBand/><About/><Experience/><Services/><Projects/><Contact/></main>;
}
