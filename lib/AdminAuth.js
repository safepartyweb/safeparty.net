import { auth } from "@/auth";
import connectMongo from "@/lib/db";
import User from "@/models/User";

export async function getAuthUser() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  await connectMongo();

  const dbUser = await User.findOne({
    email: session.user.email.toLowerCase(),
  })
    .select("_id email name image role status")
    .lean();

  if (!dbUser) {
    return null;
  }

  if (dbUser.status !== "active") {
    return null;
  }

  if (!["admin", "super_admin"].includes(dbUser.role)) {
    return null;
  }

  return {
    id: dbUser._id.toString(),
    email: dbUser.email,
    name: dbUser.name,
    image: dbUser.image,
    role: dbUser.role,
    status: dbUser.status,
  };
}

export async function requireAdmin() {
  const user = await getAuthUser();

  if (!user) {
    return null;
  }

  if (!["admin", "super_admin"].includes(user.role)) {
    return null;
  }

  return user;
}

export async function requireSuperAdmin() {
  const user = await getAuthUser();

  if (!user) {
    return null;
  }

  if (user.role !== "super_admin") {
    return null;
  }

  return user;
}