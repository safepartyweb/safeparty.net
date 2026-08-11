import connectMongo from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { redirect } from "next/navigation";
import EditForm from "./editForm";

export default async function EditShippingPage({ params }) {

  // console.log("PARAMS:", params);

  const admin = await requireSuperAdmin();

  if (!admin) {
    redirect("/admin");
  }

  const { id } = await params;

  await connectMongo();

  const method = await ShippingMethod.findById(id).lean();

  if (!method) {
    return <div>Shipping method not found</div>;
  }

  const safeMethod = {
    ...method,
    _id: method._id.toString(),
    createdAt: method.createdAt?.toISOString?.() || null,
    updatedAt: method.updatedAt?.toISOString?.() || null,
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Shipping Method</h1>
      <EditForm method={safeMethod} />
    </div>
  );
}