import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uitwijken: enquête voor beheerders",
  robots: { index: false, follow: false },
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
