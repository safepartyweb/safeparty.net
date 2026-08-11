import { auth, signOut } from "@/auth";
import connectMongo from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function AdminPendingPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin-login");
  }

  await connectMongo();

  const dbUser = await User.findOne({
    email: session.user.email.toLowerCase(),
  }).lean();

  if (!dbUser) {
    redirect("/admin-login");
  }

  if (
    dbUser.status === "active" &&
    ["admin", "super_admin"].includes(dbUser.role)
  ) {
    redirect("/admin");
  }

  async function handleSignOut() {
    "use server";

    await signOut({
      redirectTo: "/admin-login",
    });
  }

  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-3">Approval Pending</h1>

          <p className="text-lg font-medium mb-6">
            Your Google account has been registered successfully.
          </p>

          <div className="w-full rounded border border-siteBlack p-4 mb-6 text-left">
            <p className="text-sm mb-2">
              <strong>Name:</strong> {dbUser.name || "N/A"}
            </p>

            <p className="text-sm mb-2">
              <strong>Email:</strong> {dbUser.email}
            </p>

            <p className="text-sm mb-2">
              <strong>Role:</strong> {dbUser.role}
            </p>

            <p className="text-sm">
              <strong>Status:</strong> {dbUser.status}
            </p>
          </div>

          {dbUser.status === "blocked" ? (
            <p className="text-sm text-red-600 mb-6">
              Your admin account has been blocked. Please contact the super
              admin.
            </p>
          ) : (
            <p className="text-sm mb-6">
              A super admin needs to approve your account before you can access
              the admin dashboard.
            </p>
          )}

          <form action={handleSignOut}>
            <button
              type="submit"
              className="rounded bg-siteBlack px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}