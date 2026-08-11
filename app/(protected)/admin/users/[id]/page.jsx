import Link from "next/link";
import mongoose from "mongoose";
import connectMongo from "@/lib/db";
import User from "@/models/User";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AdminUserDetailsPage({ params }) {
  const { id } = await params;

  const superAdmin = await requireSuperAdmin();

  if (!superAdmin) {
    redirect("/admin");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectMongo();

  const user = await User.findById(id)
    .select(
      "_id name email image googleId provider role status emailVerified approvedBy approvedAt createdAt updatedAt lastLoginAt"
    )
    .lean();

  if (!user) {
    notFound();
  }

  const isCurrentUser = user._id.toString() === superAdmin.id;

  async function updateAdminUser(formData) {
    "use server";

    const currentSuperAdmin = await requireSuperAdmin();

    if (!currentSuperAdmin) {
      throw new Error("Forbidden");
    }

    const userId = formData.get("userId");
    const role = formData.get("role");
    const status = formData.get("status");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const allowedRoles = ["pending", "admin", "super_admin"];
    const allowedStatuses = ["inactive", "active", "blocked"];

    if (!allowedRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    await connectMongo();

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      throw new Error("User not found");
    }

    const editingSelf = targetUser._id.toString() === currentSuperAdmin.id;

    if (editingSelf) {
      if (role !== "super_admin" || status !== "active") {
        throw new Error("You cannot remove your own super admin access.");
      }
    }

    const updateData = {
      role,
      status,
    };

    if (
      status === "active" &&
      ["admin", "super_admin"].includes(role) &&
      !targetUser.approvedAt
    ) {
      updateData.approvedBy = currentSuperAdmin.id;
      updateData.approvedAt = new Date();
    }

    if (status !== "active" || role === "pending") {
      updateData.approvedBy = null;
      updateData.approvedAt = null;
    }

    await User.findByIdAndUpdate(userId, updateData);

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);

    redirect("/admin/users");
  }

  return (
    <div className="admin_user_details_page">
      <div className="mb-8">
        <Link
          href="/admin/users"
          className="inline-block mb-4 text-sm font-semibold underline"
        >
          ← Back to users
        </Link>

        <h1 className="text-2xl font-bold mb-2">User Details</h1>

        <p className="text-sm">
          View and update this admin account role and status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-siteBlack rounded p-5">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>

          <div className="space-y-3 text-sm">
            <p>
              <strong>Name:</strong> {user.name || "N/A"}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Google ID:</strong> {user.googleId || "N/A"}
            </p>

            <p>
              <strong>Provider:</strong> {user.provider || "N/A"}
            </p>

            <p>
              <strong>Email Verified:</strong>{" "}
              {user.emailVerified ? "Yes" : "No"}
            </p>

            <p>
              <strong>Current Role:</strong> {user.role}
            </p>

            <p>
              <strong>Current Status:</strong> {user.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <strong>Last Login:</strong>{" "}
              {user.lastLoginAt
                ? new Date(user.lastLoginAt).toLocaleString()
                : "N/A"}
            </p>

            <p>
              <strong>Approved At:</strong>{" "}
              {user.approvedAt
                ? new Date(user.approvedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="border border-siteBlack rounded p-5">
          <h2 className="text-xl font-bold mb-4">Update Access</h2>

          {isCurrentUser && (
            <div className="mb-5 rounded border border-yellow-500 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
              This is your own account. You cannot remove your own super admin
              access.
            </div>
          )}

          <form action={updateAdminUser} className="space-y-5">
            <input type="hidden" name="userId" value={user._id.toString()} />

            <div>
              <label className="block text-sm font-semibold mb-2">Role</label>

              <select
                name="role"
                defaultValue={user.role}
                className="w-full border border-siteBlack rounded px-4 py-3"
              >
                <option value="pending">Pending</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Status
              </label>

              <select
                name="status"
                defaultValue={user.status}
                className="w-full border border-siteBlack rounded px-4 py-3"
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="rounded border border-siteBlack p-4 text-sm">
              <p className="font-semibold mb-2">Access Rules:</p>

              <p className="mb-1">
                To approve a user, set role to <strong>Admin</strong> and
                status to <strong>Active</strong>.
              </p>

              <p className="mb-1">
                To keep a request pending, use role <strong>Pending</strong> and
                status <strong>Inactive</strong>.
              </p>

              <p>
                To block access, set status to <strong>Blocked</strong>.
              </p>
            </div>

            <button
              type="submit"
              className="rounded bg-siteBlack px-6 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}