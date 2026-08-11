"use client";

import { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AnimatedBlock from "@/components/shared/MotionParent";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();

      if (
        session?.user?.status === "active" &&
        ["admin", "super_admin"].includes(session?.user?.role)
      ) {
        router.push("/admin");
        return;
      }

      if (session?.user && session?.user?.status !== "active") {
        router.push("/admin-pending");
        return;
      }

      setLoading(false);
    }

    checkSession();
  }, [router]);

  const handleGoogleRegister = async () => {
    setRegistering(true);

    await signIn("google", {
      callbackUrl: "/admin-pending",
    });
  };

  if (loading) {
    return (
      <section className="sec_login py-6 md:py-10">
        <div className="container max-w-sitemax px-4 mx-auto">
          <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-center">
              Checking account status...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">
              Admin Registration
            </h1>

            <p className="text-lg font-medium mb-8 text-center">
              Register with your Google account to request admin access.
            </p>
          </AnimatedBlock>

          <AnimatedBlock direction="up">
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={registering}
              className="w-full rounded bg-siteBlack px-6 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {registering ? "Redirecting..." : "Register with Google"}
            </button>

            <div className="mt-6 text-center text-sm">
              <p className="mb-2">
                Your account will be created as pending.
              </p>

              <p className="mb-4">
                A super admin must approve your account before you can access
                the dashboard.
              </p>

              <p>
                Already approved?{" "}
                <Link href="/admin-login" className="font-semibold underline">
                  Login here
                </Link>
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}