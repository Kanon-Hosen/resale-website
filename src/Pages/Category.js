import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { useParams } from "react-router";
import Sppiner from "../Components/Sppiner";
import { auth } from "../Config/Firebase";

const Category = () => {
    const { name } = useParams();
    const [user]= useAuthState(auth)
  const [carDetails, setCarDetails] = useState(null);
  const { data: carCta, isFetching , isLoading} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/category/${name}`);
      const data = res.json();
      return data;
    },
  });

  if (isFetching || isLoading) {
    return <Sppiner></Sppiner>;
  }
  if (!carCta?.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-4xl font-semibold text-slate-800">
        No Item Available
      </div>
    );
  }
  

    // ? Bookin handle:::::::::::::::::::::::::::::
    const handleBooking = (e) => {
        e.preventDefault();
        const buyerEmail = user?.email;
        const buyerPic = user?.photoURL;
        const sellerEmail = carDetails.email;
        const buyerName = user?.displayName;
        const sellerName = carDetails?.name;
        const sellerPic = carDetails?.userImg;
        const sellerNumber = carDetails?.phone;
        const price = carDetails?.reSellPrice;
        const meetingLocation = e.target.meetingLocation.value;
        const buyerPhone = e.target.phoneNumber.value;
        const carName = carDetails.carName;
        const carImage = carDetails.image;

      const bookDetails = { buyerEmail, buyerPic, buyerPhone, buyerName, sellerName, sellerEmail, sellerPic, sellerNumber, price, meetingLocation, carName, carImage };

        fetch(`http://localhost:5000/booknow?name=${user?.displayName}&email=${user?.email}`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('Token')}`
              
            },
            body:JSON.stringify(bookDetails)
        }).then((res) => {
          res.json();
        }).then(data => {
          // if (!data) {
          //   setCarDetails(null)
          //   return toast.error("Already booked this car. Please check you order list")
          // }
          toast.success("Book Successfully");
          setCarDetails(null)
        })


    }
  return (
    <div className="px-16 my-6 h-screen">
      <h1 className="text-3xl font-semibold text-slate-800">{name}</h1>
      <div className="grid grid-cols-3 mt-8 gap-7">
        {carCta.map((car) => (
          <div className="shadow-md shadow-blue-100 rounded-md backdrop-blur-lg p-3">
            <div className="w-full relative">
              <img
                className="w-full h-64 bg-center bg-cover"
                src={car.image}
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center gap-3 my-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={car.userImg}
                  alt=""
                />
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{car.name}</p>
                  <BsFillPatchCheckFill
                    title="Verifyed Seller"
                    className="text-blue-500 font-bold text-base"
                  ></BsFillPatchCheckFill>
                </div>
              </div>
              <p className="text-blue-500 text-sm font-semibold">
                {car.category}
              </p>

              <p className="font-semibold text-xl">{car.carName}</p>

              <p className="text-xs">
                <span className="font-semibold">Location:</span> {car.location}
              </p>
              <p className="text-blue-500 font-semibold mt-1">
                {" "}
                $<span className="line-through text-blue-600">
                  {car.price}
                </span>{" "}
                - ${car.reSellPrice}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Condition:</span>{" "}
                {car.condition}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Purchase year: </span>
                {car.year}
              </p>
            </div>
            <label
              onClick={() => setCarDetails(car)}
              htmlFor="my-modal-3"
              className={` absolute bottom-4 cursor-pointer right-4 px-5 py-3 bg-blue-400 shadow-lg text-white font-semibold shadow-blue-500 rounded-tr-3xl rounded-bl-3xl hover:-translate-x-4 transition-transform border-none`}
            >
              Book Now
            </label>

          </div>
        ))}
        {carDetails && (
          <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">{carDetails.carName}</h3>
                              <form onSubmit={handleBooking} className="flex flex-col gap-3">
                                  <label htmlFor="Carname">Car Name</label>
                                  <input type="text" value={carDetails.carName} disabled className="input input-bordered input-primary" />
                                  <label htmlFor="carprice">Car Price</label>
                                  <input type="text" value={carDetails.reSellPrice} disabled className="input input-bordered input-primary" />
                                  <label htmlFor="email">Email</label>
                                  <input type="email" value={user?.email} disabled className="input input-bordered input-primary" />
                                  <label htmlFor="email">Phone number</label>
                                  <input name="phoneNumber" type="text" placeholder="Enter your number" required className="input input-bordered input-primary" />
                                  <label htmlFor="meeting">Meeting Location/Skype Id</label>
                                  <input name="meetingLocation" type="text" placeholder="Where you want meet with seller?" required className="input input-bordered input-primary" />
                                  <button className="px-5 py-3 bg-blue-400 shadow-md text-white font-semibold shadow-blue-500 rounded-tr-3xl rounded-bl-3xl hover:-translate-y-1 transition-transform border-none mt-2">Book Now</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
