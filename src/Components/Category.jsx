import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
const Category = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await axios.get(
        "https://resell-4tq3lnx88-kanon-hosen.vercel.app/category"
      );
      return data.data;
    },
  });
  console.log(
    "🚀 ~ file: Category.jsx ~ line 15 ~ Category ~ categories",
    categories
  );

  return (
    <div className="my-16 md:px-16 px-8">
      <h1 className="text-4xl font-bold text-center my-10">Car Categories</h1>
      <div className="grid lg:grid-cols-6 grid-cols-2 gap-6">
        {categories?.map((category) => (
          <Link
            to={`/category/${category.name}`}
            key={category._id}
            className="bg-gray-100 cursor-pointer flex items-center flex-col justify-center rounded-2xl shadow-md p-3 backdrop-blur-2xl hover:bg-blue-100 transition-all hover:text-gray-800 hover:translate-y-6 bg-opacity-50"
          >
            <img
              className="h-28 hover:scale-125 transition-transform"
              src="https://i.ibb.co/FbrdK9s/e7eb555410e9f4ce1662121349c4084a-removebg-preview.png"
              alt=""
            />
            <p className="text-xl font-semibold">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
