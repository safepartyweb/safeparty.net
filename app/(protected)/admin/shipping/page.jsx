import Link from "next/link";
import connectMongo from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { redirect } from "next/navigation";
import ShippingForm from "./shippingForm";
import DeleteShippingButton from "./DeleteShippingButton";

export default async function AdminShippingPage() {
  const superAdmin = await requireSuperAdmin();

  if (!superAdmin) {
    redirect("/admin");
  }

  await connectMongo();

  const methods = await ShippingMethod.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="admin_shipping_page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Shipping Methods
        </h1>
        <p className="text-sm">
          Manage shipping options shown at checkout.
        </p>
      </div>

      {/* CREATE FORM */}
      <div className="border border-siteBlack p-4 rounded mb-8">
        <h2 className="font-bold mb-4">Add Shipping Method</h2>
        <ShippingForm />
      </div>

      {/* TABLE */}
      {methods.length === 0 ? (
        <div className="border border-siteBlack rounded p-4">
          <p className="text-sm">No shipping methods found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-siteBlack text-sm">
            <thead>
              <tr className="border-b border-siteBlack">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Note</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Delivery Time</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {methods.map((method) => {
                const methodId = method._id.toString();

                return (
                  <tr
                    key={methodId}
                    className="border-b border-siteBlack"
                  >
                    <td className="p-3 font-semibold">
                      {method.name}
                    </td>

                    <td className="p-3">
                      {method.shortNote}
                    </td>

                    <td className="p-3">
                      ${method.price}
                    </td>

                    <td className="p-3">
                      {method.deliveryTime}
                    </td>

                    <td className="p-3">
                      {method.isActive ? "Active" : "Disabled"}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/shipping/edit/${methodId}`}
                          className="px-3 py-1 border border-siteBlack rounded hover:bg-siteBlack hover:text-white"
                        >
                          Edit
                        </Link>

                        <DeleteShippingButton
                          id={methodId}
                          name={method.name}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}