
import { auth } from "@/auth";

export default async function DashboardPage() {

  const session = await auth();

  // console.log("Session User:", session.user)
  const userInfo = session.user
  

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please login again. Something went wrong!</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>Welcome, {userInfo.name}!</p>
      <p>Your email: {userInfo.email}</p>
    </>
  );
}
