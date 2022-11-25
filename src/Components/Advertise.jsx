import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { auth } from "../Config/Firebase";

const Advertise = () => {
    const [data, setData] = useState([]);
    const [carDetails, setCarDetails] = useState(null);
    const [user] =useAuthState(auth)
  useEffect(() => {
    fetch("http://localhost:5000/advertise")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
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
    const carName = carDetails?.carName;
    const carImage = carDetails?.image;

  const bookDetails = { buyerEmail, buyerPic, buyerPhone, buyerName, sellerName, sellerEmail, sellerPic, sellerNumber, price, meetingLocation, carName, carImage };

    fetch(`http://localhost:5000/booknow?email=${user?.email}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization :`Bearer ${localStorage.getItem("Token")}`
        },
        body:JSON.stringify(bookDetails)
    }).then((res) => {
      res.json();
    }).then(data => {

      toast.success("Book Successfully");
      setCarDetails(null)
    })


}
  if (data) {
    return (
      <div className="my-10 px-16">
        <h1 className="text-center text-slate-800 font-bold text-4xl">
          Best Car For You
        </h1>
        <p className="text-center mt-1">
          Our some best car for you. We highly recommended for you{" "}
        </p>
        <div className="grid grid-cols-3 gap-7 mt-8">
          {data.map((advertise) => (
            <div key={advertise._id}>
              <div className="shadow-md shadow-blue-100 rounded-md backdrop-blur-lg p-3">
                <div className="w-full relative">
                  <img
                    className="w-full h-64 bg-center bg-cover"
                    src={advertise.image}
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 my-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={advertise.userImg}
                      alt=""
                    />
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{advertise.name}</p>
                      <BsFillPatchCheckFill
                        title="Verifyed Seller"
                        className="text-blue-500 font-bold text-base"
                      ></BsFillPatchCheckFill>
                    </div>
                  </div>
                  <p className="text-blue-500 text-sm font-semibold">
                    {advertise.category}
                  </p>

                  <p className="font-semibold text-xl">{advertise.carName}</p>

                  <p className="text-xs">
                    <span className="font-semibold">Location:</span>{" "}
                    {advertise.location}
                  </p>
                  <p className="text-blue-500 font-semibold mt-1">
                    {" "}
                    $
                    <span className="line-through text-blue-600">
                      {advertise.price}
                    </span>{" "}
                    - ${advertise.reSellPrice}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Condition:</span>{" "}
                    {advertise.condition}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Purchase year: </span>
                    {advertise.year}
                  </p>
                </div>
                <label
                    onClick={() => setCarDetails(advertise)}
                  htmlFor="my-modal-3"
                  className={` absolute bottom-4 cursor-pointer right-4 px-5 py-3 bg-blue-400 shadow-lg text-white font-semibold shadow-blue-500 rounded-tr-3xl rounded-bl-3xl hover:-translate-x-4 transition-transform border-none`}
                >
                  Book Now
                </label>
              </div>
            </div>
          ))}
            </div>
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
    );
  }
  return "";
};

export default Advertise;
