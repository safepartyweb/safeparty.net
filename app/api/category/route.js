import connectMongo from "@/lib/db";
import Category from "@/models/Category";
import { NextResponse } from 'next/server';
import slugify from "slugify";




export async function GET() {
  // console.log("Get category route!")
  const categories = await Category.find().sort({ order: 1 });;
  return NextResponse.json(categories);
}

export async function POST(req) {
  const { name } = await req.json();
  console.log("Category name:", name)
  const slug = slugify(name, { lower: true, strict: true });
  const newCategory = await Category.create({ name, slug });
  return NextResponse.json(newCategory);
}

//edit category
export async function PATCH(req) {

  const { name, catId, order } = await req.json();

  try {
    const category = await Category.findById(catId);
    if(!category){
      throw new Error("Category not found!")
    }

    category.name = name || category.name;
    category.order = order || category.order;
    let slug;
    if(name){
      slug = slugify(name, { lower: true, strict: true });
    }
    category.slug = slug || product.slug;



    const updatedCategory = await category.save();

    return Response.json({ message: "success!", category:updatedCategory }, { status: 200 })
  } catch (error) {
    console.log("Erorr on Edit:", error)
    return Response.json({ message: error.message, error }, { status: 500 })
  }
}


//delete category
export async function DELETE(req) {
  const {catId } = await req.json();

  try {
    const deletedCategory = await Category.findByIdAndDelete(catId);
    if(!deletedCategory){
      throw new Error("Category not found!")
    }

    return Response.json({ message: "deleted successfully!", category:deletedProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
  
}