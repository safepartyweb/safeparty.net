import Link from "next/link";
import connectMongo from "@/lib/db";
import User from "@/models/User";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const superAdmin = await requireSuperAdmin();

  if (!superAdmin) {
    redirect("/admin");
  }

  await connectMongo();

  const users = await User.find({})
    .select("_id name email image role status emailVerified createdAt lastLoginAt")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="admin_users_page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Admin Users</h1>
        <p className="text-sm">
          View all Google admin accounts and manage their approval status.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="border border-siteBlack rounded p-4">
          <p className="text-sm">No admin users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-siteBlack text-sm">
            <thead>
              <tr className="border-b border-siteBlack">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Email Verified</th>
                <th className="text-left p-3">Created</th>
                <th className="text-left p-3">Last Login</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id.toString()}
                  className="border-b border-siteBlack"
                >
                  <td className="p-3">{user.name || "N/A"}</td>

                  <td className="p-3">{user.email}</td>

                  <td className="p-3">
                    <span className="rounded border border-siteBlack px-2 py-1">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="rounded border border-siteBlack px-2 py-1">
                      {user.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {user.emailVerified ? "Yes" : "No"}
                  </td>

                  <td className="p-3">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-3">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-3">
                    <Link
                      href={`/admin/users/${user._id.toString()}`}
                      className="rounded bg-siteBlack px-4 py-2 text-white font-semibold hover:opacity-90 transition inline-block"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}