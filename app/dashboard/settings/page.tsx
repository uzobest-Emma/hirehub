import { auth } from "@/auth";
import { db } from "@/src/prisma/db";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      fullName: true,
      email: true,
      phone: true,
      location: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <a href="/dashboard" className="back-link">
            ← Back to Dashboard
          </a>

          <p className="dashboard-eyebrow">ACCOUNT SETTINGS</p>

          <h1>Settings</h1>

          <p>
            Manage your account information, security and
            notification preferences.
          </p>
        </div>

        <SettingsForm user={user} />
      </div>
    </main>
  );
}