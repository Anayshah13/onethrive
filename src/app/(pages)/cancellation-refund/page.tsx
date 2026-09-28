import type { Metadata } from "next";
import { CancellationRefundPage } from "@/components/site/cancellation-refund";

export const metadata: Metadata = {
  title: "Cancellation & Refund — OneThrive",
  description:
    "OneThrive's cancellation and refund policy — notice periods, refund tiers and how to request a change.",
};

export default function CancellationRefund() {
  return <CancellationRefundPage />;
}
