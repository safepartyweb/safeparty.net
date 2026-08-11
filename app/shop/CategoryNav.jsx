"use client";

import slugify from "slugify";

const CategoryNav = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-12 justify-center">
      {categories.map((cat) => {
        const sectionId = slugify(cat.name, { lower: true, strict: true });

        return (
          <button
            key={cat._id}
            type="button"
            onClick={() => {
              const el = document.getElementById(sectionId);
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition cursor-pointer"
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryNav;