import { auth } from "@/auth";
import connectMongo from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import DashboardLeft from "@/components/admin/DashboardLeft";
import AnimatedBlock from "@/components/shared/MotionParent";

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin-login");
  }

  await connectMongo();

  const dbUser = await User.findOne({
    email: session.user.email.toLowerCase(),
  })
    .select("_id email name image role status")
    .lean();

  if (!dbUser) {
    redirect("/admin-login");
  }

  if (dbUser.status === "blocked") {
    redirect("/admin-login?error=blocked");
  }

  const allowedRoles = ["admin", "super_admin"];

  const isApprovedAdmin =
    dbUser.status === "active" && allowedRoles.includes(dbUser.role);

  if (!isApprovedAdmin) {
    redirect("/admin-pending");
  }

  return (
    <section className="sec_admin">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="dashboard_wrapper grid grid-cols-6 gap-6 md:gap-10 justify-between flex-col sm:flex-row">
          <DashboardLeft />

          <div className="dashboard_right py-6 md:py-10 px-4 col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-5">
            <AnimatedBlock direction="right">{children}</AnimatedBlock>
          </div>
        </div>
      </div>
    </section>
  );
}