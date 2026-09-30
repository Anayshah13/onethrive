"use client";

import { contact } from "@/data/content";
import { PageHero } from "@/components/site/page-kit";

export function CancellationRefundPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        lead="Cancellation &"
        accent="Refund."
        intro="Our cancellation and refund terms, so you always know where you stand."
        crumbs={[{ label: "Cancellation & Refund" }]}
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

      <Section title="1. Overview">
        <p>
          All bookings with OneThrive are governed by the specific terms agreed in your programme
          proposal or contract. The schedule below reflects our standard policy and applies wherever
          no separate written agreement specifies otherwise.
        </p>
        <p>
          Cancellations and change requests must be submitted in writing to{" "}
          <a href="mailto:info@onethrive.in">info@onethrive.in</a>.
        </p>
      </Section>

      <Section title="2. Cancellation by the client">
        <Table
          headers={["Notice before event date", "Refund of amount paid"]}
          rows={[
            ["30 days or more", "100% refund (minus payment gateway charges, if any)"],
            ["15 – 29 days", "50% refund"],
            ["8 – 14 days", "25% refund"],
            ["7 days or fewer", "No refund"],
          ]}
        />
        <p>
          Non-recoverable costs already committed on your behalf — such as deposits paid to venues,
          transport providers or activity partners — are deducted from any refund regardless of the
          tier above.
        </p>
      </Section>

      <Section title="3. Postponement / rescheduling">
        <p>
          Rescheduling requested at least 21 days before the original date is accommodated at no
          additional charge, subject to vendor availability. Rescheduling requests within 21 days
          may attract a rescheduling fee equal to actual incremental costs we incur.
        </p>
        <p>
          Each booking may be rescheduled once at no charge. Subsequent changes are treated as
          a fresh booking.
        </p>
      </Section>

      <Section title="4. Cancellation or changes by OneThrive">
        <p>
          In the rare event that we must cancel or significantly alter a confirmed programme
          (for example, due to unforeseen venue closure or force majeure), we will notify you as
          soon as possible and offer one of the following:
        </p>
        <ul>
          <li>A full refund of all amounts paid.</li>
          <li>An equivalent or superior alternative programme at no additional cost.</li>
          <li>A credit note valid for 12 months.</li>
        </ul>
        <p>
          OneThrive is not liable for consequential losses arising from a cancellation outside
          our control.
        </p>
      </Section>

      <Section title="5. Force majeure">
        <p>
          Neither party is liable for failure to perform due to circumstances beyond reasonable
          control — including natural disasters, government orders, pandemics, strikes or civil
          unrest. We will work with you in good faith to reschedule or issue a fair credit.
        </p>
      </Section>

      <Section title="6. Refund process">
        <p>
          Approved refunds are processed within 10 – 14 business days of the cancellation
          confirmation to the original payment source. Processing times may vary depending on
          your bank or payment provider.
        </p>
      </Section>

      <Section title="7. Contact">
        <p>
          Questions about a booking, cancellation or refund? Email{" "}
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

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="pp-table-wrap">
      <table className="pp-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
.pp-table-wrap {
  overflow-x: auto;
  margin: 0.75rem 0;
  border-radius: 1rem;
  ring: 1px solid color-mix(in oklab, var(--ink) 8%, transparent);
}
.pp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.pp-table th {
  background: color-mix(in oklab, var(--mint) 30%, white);
  text-align: left;
  padding: 0.65rem 1rem;
  font-weight: 600;
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: var(--emerald-deep);
  border-bottom: 1px solid color-mix(in oklab, var(--emerald) 15%, transparent);
}
.pp-table td {
  padding: 0.65rem 1rem;
  color: color-mix(in oklab, var(--ink) 70%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--ink) 6%, transparent);
  vertical-align: top;
}
.pp-table tr:last-child td { border-bottom: none; }
.pp-table tr:nth-child(even) td { background: color-mix(in oklab, var(--mint) 8%, white); }
`;
