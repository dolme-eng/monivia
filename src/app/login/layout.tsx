import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { DASHBOARD_SESSION_COOKIE, verifyDashboardSessionToken } from "@/lib/dashboard-auth";

export const metadata: Metadata = buildPageMetadata({
  title: "Area Riservata | Monivia",
  description: "Accesso riservato all'area interna Monivia.",
  path: "/login",
  noindex: true,
});

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;

  if (verifyDashboardSessionToken(token)) {
    redirect('/dashboard');
  }

  return children;
}
