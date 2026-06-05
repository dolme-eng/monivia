import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { DASHBOARD_SESSION_COOKIE, verifyDashboardSessionToken } from "@/lib/dashboard-auth";

export const metadata: Metadata = buildPageMetadata({
  title: "Dashboard | Monivia",
  description: "Area di gestione interna Monivia.",
  path: "/dashboard",
  noindex: true,
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;

  if (!verifyDashboardSessionToken(token)) {
    redirect('/login?next=/dashboard');
  }

  return children;
}
