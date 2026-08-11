"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedBlock from "@/components/shared/MotionParent";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

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

  const handleGoogleLogin = async () => {
    setSigningIn(true);

    await signIn("google", {
      callbackUrl,
    });
  };

  if (loading) {
    return (
      <section className="sec_login py-6 md:py-10">
        <div className="container max-w-sitemax px-4 mx-auto">
          <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-center">
              Checking login status...
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
              Admin Login
            </h1>

            <p className="text-lg font-medium mb-8 text-center">
              Continue with your Google account to access the admin dashboard.
            </p>
          </AnimatedBlock>

          {error && (
            <div className="w-full mb-6 rounded border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              Login failed. Please try again or contact the super admin.
            </div>
          )}

          <AnimatedBlock direction="up">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={signingIn}
              className="w-full rounded bg-siteBlack px-6 py-3 text-white font-semibold hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {signingIn ? "Redirecting..." : "Continue with Google"}
            </button>

            <p className="mt-6 text-center text-sm">
              New admin accounts need super admin approval before dashboard
              access.
            </p>


            <p className="mt-3 text-center text-sm">
              Need admin access?{" "}
              <Link href="/admin-register" className="font-semibold underline">
                Register here
              </Link>
            </p>

          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}

function LoginPageFallback() {
  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <p className="text-lg font-medium text-center">
            Loading login page...
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <AdminLoginContent />
    </Suspense>
  );
}