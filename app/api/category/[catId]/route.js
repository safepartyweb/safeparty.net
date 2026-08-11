import Category from "@/models/Category";


//get single category
export async function GET(req, { params }) {
  try {
    const { catId } = await params;
    
    if (!catId) {
      return Response.json(
        { success: false, message: "Category ID is required" },
        { status: 400 }
      );
    }

    const category = await Category.findById(catId);

    if (!category) {
      return Response.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Category:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

