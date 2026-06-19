import { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Github,
  Heart,
  Mail,
  MessageCircle,
  Terminal,
  Twitter,
} from 'lucide-react';

/* ─── data ─── */

const faqs = [
  {
    question: 'What browsers does snoopy support?',
    answer: 'snoopy works in all modern browsers: Chrome 90+, Safari 15+, Firefox 95+, and Edge 90+. It also works on mobile browsers with touch scroll support.',
  },
  {
    question: 'How does scroll-synced video seeking work?',
    answer: 'snoopy maps your scroll position to a specific frame in the video timeline. When you scroll, it seeks the video to the corresponding time. When you stop scrolling, the video pauses on the exact frame. There\'s no playback — every frame is deterministic.',
  },
  {
    question: 'Can I use my own video files?',
    answer: 'Yes. snoopy works with any MP4 file. For best results, encode with H.264 at 24–30fps with frequent keyframes (every 1–2 seconds). Long-GOP or high-resolution media may seek poorly.',
  },
  {
    question: 'Does it work with React, Vue, and other frameworks?',
    answer: 'snoopy is framework-agnostic — it works with vanilla JS, React, Vue, Svelte, Astro, and any other framework. Just pass it a video element reference.',
  },
  {
    question: 'Is snoopy free to use?',
    answer: 'Yes. snoopy is open-source under the MIT license. Use it in personal projects, commercial products, or anywhere you need a quiet moment.',
  },
  {
    question: 'What about accessibility?',
    answer: 'snoopy respects the prefers-reduced-motion media query automatically. When enabled, scroll animations are minimized. The package is also keyboard navigable and screen-reader compatible.',
  },
];

const footerLinks = {
  Product: ['Features', 'Variants', 'Changelog', 'Roadmap'],
  Resources: ['Documentation', 'API Reference', 'Examples', 'Blog'],
  Community: ['GitHub', 'Discord', 'Twitter', 'Contributing'],
  Legal: ['License (MIT)', 'Privacy', 'Terms'],
};

/* ─── component ─── */

export function LandingSections() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyText = async (text: string) => {
    await navigator.clipboard?.writeText(text);
    setCopiedText(text);
    window.setTimeout(() => setCopiedText(null), 1600);
  };

  return (
    <div className="landing-sections">

      {/* ─── FAQ ─── */}
      <section className="landing-section section-faq" id="faq">
        <div className="landing-container landing-container--narrow">
          <div className="section-header section-header--centered">
            <p className="section-label">FAQ</p>
            <h2>
              Questions &amp; answers
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="faq-item"
                open={openFaq === index}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaq(openFaq === index ? null : index);
                }}
              >
                <summary>
                  <span>{faq.question}</span>
                  <ChevronDown size={16} strokeWidth={1.6} className="faq-chevron" />
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="site-footer" id="footer">
        <div className="landing-container">
          <div className="footer-upper">
            <div className="footer-brand">
              <div className="footer-logo">
                <Terminal size={16} strokeWidth={1.6} />
                <span>snoopy</span>
              </div>
              <p>A tiny cinematic package that turns scrolling into a calm interactive moment.</p>
              <div className="footer-socials">
                <a href="#" aria-label="GitHub"><Github size={16} strokeWidth={1.5} /></a>
                <a href="#" aria-label="Twitter"><Twitter size={16} strokeWidth={1.5} /></a>
                <a href="#" aria-label="Discord"><MessageCircle size={16} strokeWidth={1.5} /></a>
              </div>
            </div>
            <div className="footer-links-grid">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="footer-link-group">
                  <span className="footer-link-heading">{category}</span>
                  <ul>
                    {links.map((link) => (
                      <li key={link}><a href="#">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="footer-newsletter">
            <div className="newsletter-copy">
              <Mail size={16} strokeWidth={1.5} />
              <div>
                <strong>Stay in the loop</strong>
                <p>Get notified about new releases and quiet updates.</p>
              </div>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@example.com" aria-label="Email address" />
              <button type="submit" className="story-button">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
          <div className="footer-bottom">
            <span>© 2026 snoopy. MIT License.</span>
            <span>
              Made with <Heart size={12} fill="currentColor" strokeWidth={0} /> for quiet moments.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
