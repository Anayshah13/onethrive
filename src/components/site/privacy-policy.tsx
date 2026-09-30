"use client";

import { contact } from "@/data/content";
import { PageHero } from "@/components/site/page-kit";

export function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        lead="Privacy"
        accent="Policy."
        intro="How we collect, use and protect information you share with us."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="relative pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-[760px] px-5 md:px-8">
          <PolicyBody />
        </div>
      </section>
    </>
  );
}

function PolicyBody() {
  return (
    <div className="prose-policy">
      <style>{CSS}</style>

      <p className="pp-meta">Last updated: 28 September 2026</p>

      <Section title="1. Who we are">
        <p>
          OneThrive (&ldquo;OneThrive&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) is a team-experiences company
          headquartered in Mumbai, India. This Privacy Policy explains how we handle information
          collected through our website (onethrive.in) and through any direct enquiry or engagement with us.
        </p>
      </Section>

      <Section title="2. Information we collect">
        <p>We collect information you give us directly, including:</p>
        <ul>
          <li>Name, company name and job title when you submit a brief or enquiry form.</li>
          <li>Work email address and phone number for follow-up and programme delivery.</li>
          <li>Team size, preferred destination and engagement type to tailor our proposals.</li>
          <li>Any additional detail you voluntarily share in a message or call.</li>
        </ul>
        <p>
          We also collect standard server and analytics data automatically — such as browser type,
          pages visited and approximate location — to improve site performance and content.
        </p>
      </Section>

      <Section title="3. How we use your information">
        <p>We use your information to:</p>
        <ul>
          <li>Respond to your enquiry and send you a programme proposal.</li>
          <li>Coordinate logistics and deliver the experience you book with us.</li>
          <li>Send relevant updates or follow-ups where you have given consent.</li>
          <li>Analyse and improve our website and services.</li>
        </ul>
        <p>
          We do not sell, trade or rent your personal information to third parties.
        </p>
      </Section>

      <Section title="4. Data sharing">
        <p>
          We share your information only with trusted partners who help us deliver your programme —
          such as venue operators, activity providers and travel logistics companies — and only to
          the extent necessary. These partners are bound by confidentiality obligations consistent
          with this policy.
        </p>
        <p>
          We may disclose information where required by Indian law, court order or regulatory authority.
        </p>
      </Section>

      <Section title="5. Data retention">
        <p>
          We retain enquiry data for up to three years to enable continuity and reference for
          repeat engagements. You may request deletion of your data at any time by writing to us.
        </p>
      </Section>

      <Section title="6. Your rights">
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate information.</li>
          <li>Request deletion of your data.</li>
          <li>Withdraw consent for marketing communications at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:info@onethrive.in">info@onethrive.in</a>.
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          Our website uses essential cookies for functionality and optional analytics cookies to
          understand how visitors use the site. You can disable analytics cookies through your
          browser settings without affecting core site features.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We use industry-standard measures to protect your data from unauthorised access,
          disclosure or loss. No transmission over the internet is completely secure; we encourage
          you to contact us through official channels only.
        </p>
      </Section>

      <Section title="9. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be reflected with a
          new &ldquo;Last updated&rdquo; date at the top. Continued use of our services after such
          changes constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions about this policy? Write to us at{" "}
          <a href="mailto:info@onethrive.in">info@onethrive.in</a> or call{" "}
          <a href={contact.phoneHref}>{contact.phone}</a>.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pp-section">
      <h2 className="pp-h2">{title}</h2>
      <div className="pp-body">{children}</div>
    </div>
  );
}

const CSS = `
.pp-meta {
  font-size: 13px;
  color: color-mix(in oklab, var(--ink) 45%, transparent);
  margin-bottom: 2.5rem;
}
.pp-section {
  margin-bottom: 2.25rem;
  padding: 1.75rem 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 2px 16px -4px rgba(0,0,0,0.06);
  ring: 1px solid color-mix(in oklab, var(--ink) 6%, transparent);
}
.pp-h2 {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 0.85rem;
}
.pp-body p {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: color-mix(in oklab, var(--ink) 70%, transparent);
  margin-bottom: 0.75rem;
}
.pp-body p:last-child { margin-bottom: 0; }
.pp-body ul {
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0.5rem 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.pp-body li {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: color-mix(in oklab, var(--ink) 70%, transparent);
}
.pp-body a {
  color: var(--emerald);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.pp-body a:hover { color: var(--emerald-deep); }
`;
