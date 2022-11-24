import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { async } from "@firebase/util";

const AddCar = () => {
  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await axios.get("http://localhost:5000/category");
      return data.data;
    },
  });
  console.log(
    "🚀 ~ file: AddCar.js ~ line 14 ~ AddCar ~ categories",
    categories
    );
    const url =
    "https://api.imgbb.com/1/upload?key=ff2b48e99f3ed8f260b16b42b028c8f5";
    const handleAddCar = async(e) => {
        e.preventDefault();
        const carName = e.target.carname.value;
        const reSellPrice = e.target.resellprice.value;
        const condition = e.target.condition.value;
        const category = e.target.category.value;
        const location = e.target.location.value;
        const phone = e.target.phone.value;
        const year = e.target.year.value;
        const price = e.target.price.value;
        const image = e.target.image.files[0];
        const description = e.target.description.value;
 
        const formData = new FormData();
        formData.append("image", image);
        fetch(url, {
          method: "post",
          body: formData,
        }).then(res => res.json())
            .then(async (data) => {
                e.target.reset();
                const carDetails = { carName, reSellPrice, condition, category, location, phone, year, price, image:data.data.display_url, description, };
                console.log("🚀 ~ file: AddCar.js ~ line 41 ~ handleAddCar ~ carDetails", carDetails)
                
                const allcar = await axios.post('http://localhost:5000/allcar', {
                    
                })
        })
    }
  return (
    <div>
      <h1 className="text-center font-bold text-4xl">Add Car</h1>
      <form onSubmit={handleAddCar} className="mt-8 w-full mx-auto flex items-center justify-center flex-col ">
        <div className="flex items-center w-full justify-center gap-5">
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="title">Car Name</label>
                      <input
                          name="carname"
              required
              type="text"
              placeholder="Type here"
              className="input input-bordered w-1/2  mt-1"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="title">Car Resell Price</label>
                      <input
                           name="resellprice"
              required
              type="text"
              placeholder="Car Resell Price"
              className="input input-bordered w-1/2  mt-1"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-5 mt-5">
          <div className="">
            <select name="condition" required className="select input-bordered">
              <option disabled selected>
                Condition
              </option>
              <option value='Excellent'>Excellent</option>
              <option value='Good'>Good</option>
              <option value='Fair'>Fair</option>
            </select>
          </div>
          <div className="">
            <select required name="category" className="select  input-bordered">
              <option disabled selected value="category">
                Category
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center w-full justify-center gap-5 mt-5">
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="location">Location</label>
                      <input
                          name="location"
              required
              type="text"
              placeholder="Location"
              className="input input-bordered w-1/2  mt-1"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="number">Phone Number</label>
                      <input
                          name="phone"
              required
              type="number"
              placeholder="Phone Number"
              className="input input-bordered w-1/2 mt-1"
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-5 mt-5">
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="Year of purchase">Year of purchase </label>
                      <input
                          name="year"
              required
              type="number"
              placeholder="Year "
              className="input input-bordered w-1/2 mt-1"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="Purchase Price">Purchase Price</label>
                      <input
                          name="price"
              required
              type="number"
              placeholder="Purchase Price"
              className="input input-bordered w-1/2 mt-1"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center">
          <label htmlFor="Car image">Car image</label>
          <input
                      required
                      name="image"
            type="file"
            className="file-input file-input-bordered w-full"
          />
        </div>
        <div className="mt-5 flex flex-col w-full">
          <label htmlFor="Car Description">Car Description</label>
          <textarea
                      required
                      name="description"
            className="textarea textarea-bordered"
            placeholder="Description"
          ></textarea>
        </div>
        <button type="submit" className="mt-6 btn w-full">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
