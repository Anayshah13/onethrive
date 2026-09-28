"use client";

import { PageHero } from "@/components/site/page-kit";

export function TermsConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        lead="Terms &"
        accent="Conditions."
        intro="The agreement that governs every engagement between your team and ours."
        crumbs={[{ label: "Terms & Conditions" }]}
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

      <Section title="1. Acceptance of terms">
        <p>
          By submitting an enquiry, signing a proposal or making a payment to OneThrive, you confirm
          that you have read, understood and agree to be bound by these Terms &amp; Conditions on
          behalf of yourself and the organisation you represent.
        </p>
      </Section>

      <Section title="2. Our services">
        <p>
          OneThrive plans and delivers team experiences including offsites, team-building sessions,
          wellness programmes, day outings, event production and artist bookings. The specific scope,
          itinerary and inclusions for your programme are confirmed in the written proposal we issue
          before payment.
        </p>
        <p>
          We reserve the right to substitute equivalent or superior venues, activities or providers
          when circumstances require, always with your advance notice where possible.
        </p>
      </Section>

      <Section title="3. Bookings and payment">
        <p>A booking is confirmed once:</p>
        <ul>
          <li>You have approved the written programme proposal, and</li>
          <li>The advance deposit (as specified in the proposal) has been received by us.</li>
        </ul>
        <p>
          The balance is due as per the payment schedule in your proposal. Late payment may result in
          the booking being released and the deposit becoming non-refundable.
        </p>
        <p>
          All prices are in Indian Rupees (INR) unless otherwise stated and are exclusive of GST,
          which will be charged at the applicable rate.
        </p>
      </Section>

      <Section title="4. Participant obligations">
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate participant information (headcount, dietary needs, medical conditions that affect activity eligibility) in advance.</li>
          <li>Ensure participants follow all safety briefings and reasonable instructions from our team and partner vendors.</li>
          <li>Take responsibility for any damage to property caused by your participants beyond reasonable wear and tear.</li>
        </ul>
        <p>
          OneThrive may, in the interest of safety, ask any participant to withdraw from an activity
          without obligation to provide an alternative or refund for that activity element.
        </p>
      </Section>

      <Section title="5. Intellectual property">
        <p>
          All content on our website — including text, photography, graphic design and programme
          frameworks — is the intellectual property of OneThrive. You may not reproduce, distribute
          or adapt it without prior written consent.
        </p>
        <p>
          Photos and videos captured by our team during your programme may be used by OneThrive for
          portfolio and marketing purposes unless you notify us in writing before the event that you
          do not consent.
        </p>
      </Section>

      <Section title="6. Liability">
        <p>
          OneThrive will exercise reasonable care in planning and delivering your programme.
          Our liability for any claim arising from our services is limited to the total amount
          paid by you for the programme in question.
        </p>
        <p>
          We are not liable for indirect, consequential or incidental losses, including lost profits
          or business disruption arising from any issue with our services.
        </p>
        <p>
          Participation in physical activities (sports, adventure, wellness) carries inherent risk.
          Participants do so voluntarily and OneThrive is not liable for injury resulting from
          voluntary participation, provided we have not been negligent.
        </p>
      </Section>

      <Section title="7. Cancellation and refunds">
        <p>
          Cancellations are governed by our{" "}
          <a href="/cancellation-refund">Cancellation &amp; Refund Policy</a>, which forms part of
          these Terms &amp; Conditions.
        </p>
      </Section>

      <Section title="8. Privacy">
        <p>
          We handle your personal data in accordance with our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </Section>

      <Section title="9. Governing law">
        <p>
          These Terms are governed by the laws of India. Any dispute arising under or in connection
          with these Terms shall be subject to the exclusive jurisdiction of the courts of Mumbai,
          Maharashtra.
        </p>
      </Section>

      <Section title="10. Changes to these terms">
        <p>
          We may revise these Terms from time to time. The current version, with its &ldquo;Last
          updated&rdquo; date, is always available at this URL. Continued engagement with our
          services after an update constitutes acceptance of the revised terms.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          Questions about these Terms? Email us at{" "}
          <a href="mailto:info@onethrive.in">info@onethrive.in</a> or call{" "}
          <a href="tel:+919082888912">+91 90828 88912</a>.
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
