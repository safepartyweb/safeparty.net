"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useLogOutMutation } from "@/lib/api/authApi";
import Image from "next/image";
import { logout, setCredentials } from "@/store/authSlice";
import { getSession, signOut as nextAuthSignOut } from "next-auth/react";

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminSessionUser, setAdminSessionUser] = useState(null);

  const cartCount = cartItems.reduce((prev, cur) => prev + cur.quantity, 0);
  const cartTotal = cartItems.reduce(
    (prev, cur) => prev + cur.quantity * cur.price,
    0
  );

  const hasAdminSession = !!adminSessionUser;

  const isApprovedAdmin =
    adminSessionUser?.status === "active" &&
    ["admin", "super_admin"].includes(adminSessionUser?.role);

  const isCustomer = userInfo?.role === "customer";
  const isAffiliate = userInfo?.role === "affiliate";

  const isOldAdminUser =
    userInfo?.role === "admin" || userInfo?.role === "super_admin";

  const isAnyLoggedIn =
    !!userInfo || hasAdminSession || isApprovedAdmin || isOldAdminUser;

  const shouldHideCart = hasAdminSession || isOldAdminUser;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function loadAdminSession() {
      try {
        const session = await getSession();

        if (session?.user?.email) {
          setAdminSessionUser(session.user);
        } else {
          setAdminSessionUser(null);
        }
      } catch (error) {
        console.error("Failed to load admin session:", error);
        setAdminSessionUser(null);
      }
    }

    loadAdminSession();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("userInfo");

      if (storedUserInfo) {
        try {
          const parsedUser = JSON.parse(storedUserInfo);

          // Admins now use NextAuth, not old Redux/localStorage auth.
          // This removes old stale admin login data.
          if (
            parsedUser?.role === "admin" ||
            parsedUser?.role === "super_admin"
          ) {
            localStorage.removeItem("userInfo");
            dispatch(logout());
            return;
          }

          dispatch(setCredentials(parsedUser));
        } catch (error) {
          console.error("Invalid userInfo in localStorage:", error);
          localStorage.removeItem("userInfo");
          dispatch(logout());
        }
      }
    }
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const isAdminLogout =
        hasAdminSession ||
        isApprovedAdmin ||
        userInfo?.role === "admin" ||
        userInfo?.role === "super_admin";

      if (isAdminLogout) {
        dispatch(logout());

        if (typeof window !== "undefined") {
          localStorage.removeItem("userInfo");
        }

        await nextAuthSignOut({
          callbackUrl: "/admin-login",
        });

        return;
      }

      const currentRole = userInfo?.role;

      dispatch(logout());

      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }

      await logOut();

      if (currentRole === "customer") {
        window.location.href = "/login";
      } else if (currentRole === "affiliate") {
        window.location.href = "/affiliate/login";
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <header className="border-gray-500 py-4 relative z-[40]">
        <div className="container max-w-sitemax px-4 mx-auto">
          <div className="header_wrapper flex justify-between items-center text-siteBlack relative">
            <div className="header_left flex gap-10 items-center">
              <Link href="/">
                <Image
                  src="/images/logo-4-8-final.png"
                  alt="Logo image"
                  width={80}
                  height={90}
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="text-xl font-medium main_menu list-none hidden lg:flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 transition-all duration-300 bg-white md:bg-transparent absolute md:static top-full md:top-auto left-0 w-full md:w-auto p-6 md:p-0 shadow-md md:shadow-none z-20">
                <li>
                  <Link href="/shop">Shop</Link>
                </li>

                <li>
                  <Link href="/reviews">Reviews</Link>
                </li>

                <li className="relative has_children group">
                  <div className="flex gap-1 items-center">
                    Support
                    <Image
                      className="mt-1.5"
                      src="/images/arrow_down.svg"
                      alt="Down arrow"
                      width={18}
                      height={18}
                    />
                  </div>

                  <ul className="absolute -left-[25px] w-[140px] flex flex-col gap-4 bg-siteBlack text-white z-[50] p-4 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                    <li className="text-center">
                      <Link className="text-center w-full" href="/contact">
                        Contact
                      </Link>
                    </li>

                    <li className="text-center">
                      <Link className="text-center w-full" href="/faq">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </li>
              </nav>
              {/* End Desktop Nav */}

              {/* Mobile Nav */}
              <nav
                className={`mobile_nav flex flex-col text-xl font-medium main_menu list-none lg:hidden items-start gap-6 md:gap-4 transition-all duration-300 bg-siteSecondBlack text-white absolute left-0 w-full shadow-md md:shadow-none z-20 p-6 ${
                  isMobileMenuOpen
                    ? "opacity-100 visible top-full"
                    : "opacity-0 invisible top-[50px] pointer-events-none"
                }`}
              >
                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/">Home</Link>
                </li>

                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cursor-pointer list-none relative flex gap-[2px] items-center has_children"
                >
                  <Link href="/shop">Shop</Link>
                </li>

                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/about">About</Link>
                </li>

                <li onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/contact">Contact</Link>
                </li>

                {isAnyLoggedIn ? (
                  <>
                    {isCustomer && (
                      <li onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/dashboard">Dashboard</Link>
                      </li>
                    )}

                    {isAffiliate && (
                      <li onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/affiliate/dashboard">Dashboard</Link>
                      </li>
                    )}

                    {isApprovedAdmin && (
                      <li onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/admin">Dashboard</Link>
                      </li>
                    )}

                    {hasAdminSession && !isApprovedAdmin && (
                      <li onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/admin-pending">Account Status</Link>
                      </li>
                    )}

                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="cursor-pointer" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Login</Link>
                    </li>
                  </>
                )}
              </nav>
              {/* End Mobile Nav */}
            </div>

            <div className="flex">
              {!shouldHideCart && (
                <Link href="/cart">
                  <div className="header_right cart_wrap flex items-center gap-2 cursor-pointer z-10">
                    <p className="cart_amount font-bold text-xl">
                      $<span>{cartTotal}</span>
                    </p>

                    <div className="cart_icon_wrap relative">
                      <Image
                        className="mb-[7px]"
                        src="/images/Cart.svg"
                        alt="Cart Image"
                        width={32}
                        height={32}
                      />

                      <p className="quantity absolute text-sm -top-6 -right-3 font-semibold bg-siteBlack rounded-full p-1 text-white w-8 h-8 flex items-center justify-center">
                        {cartCount}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              <div
                onMouseEnter={() => setShowProfile(true)}
                onMouseLeave={() => setShowProfile(false)}
                className="profile cursor-pointer pl-4 hidden lg:block"
              >
                <Image
                  src="/images/user.svg"
                  alt="profile"
                  width={36}
                  height={36}
                />

                <div
                  className={`dropdown absolute min-w-[150px] h-auto right-0 bg-siteBlack text-white rounded transition-all duration-300 ${
                    showProfile
                      ? "opacity-100 visible top-[65%]"
                      : "opacity-0 invisible top-[50px] pointer-events-none"
                  }`}
                >
                  <ul>
                    {isAnyLoggedIn ? (
                      <>
                        {isCustomer && (
                          <li
                            onClick={() => setShowProfile(false)}
                            className="px-4 py-2 border-b border-white text-center font-medium"
                          >
                            <Link href="/dashboard">Dashboard</Link>
                          </li>
                        )}

                        {isAffiliate && (
                          <li
                            onClick={() => setShowProfile(false)}
                            className="px-4 py-2 border-b border-white text-center font-medium"
                          >
                            <Link href="/affiliate/dashboard">Dashboard</Link>
                          </li>
                        )}

                        {isApprovedAdmin && (
                          <li
                            onClick={() => setShowProfile(false)}
                            className="px-4 py-2 border-b border-white text-center font-medium"
                          >
                            <Link href="/admin">Dashboard</Link>
                          </li>
                        )}

                        {hasAdminSession && !isApprovedAdmin && (
                          <li
                            onClick={() => setShowProfile(false)}
                            className="px-4 py-2 border-b border-white text-center font-medium"
                          >
                            <Link href="/admin-pending">Account Status</Link>
                          </li>
                        )}

                        <li
                          onClick={() => setShowProfile(false)}
                          className="px-4 py-2 border-b border-white text-center font-medium"
                        >
                          <button
                            className="cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          onClick={() => setShowProfile(false)}
                          className="px-4 py-2 border-b border-white text-center font-medium"
                        >
                          <Link href="/login">Login</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div
              className="cursor-pointer z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image
                src="/images/menu.svg"
                alt="menu"
                width={46}
                height={46}
                className={`${isMobileMenuOpen ? "hidden" : "block"}`}
              />

              <Image
                src="/images/close-x.svg"
                alt="menu"
                width={46}
                height={46}
                className={`${isMobileMenuOpen ? "block" : "hidden"}`}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}