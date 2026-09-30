import type { Metadata } from "next";
import { GalleryPage } from "@/components/site/gallery-page";

export const metadata: Metadata = {
  title: "Gallery — OneThrive",
  description:
    "Photos from OneThrive events: foundation days, carnivals, cricket leagues, team-building games, wellness sessions, festive workshops and offsites.",
};

export default function Page() {
  return <GalleryPage />;
}
