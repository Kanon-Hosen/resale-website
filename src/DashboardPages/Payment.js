import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router";
const Payment = () => {
  const location = useLocation();
  console.log("🚀 ~ file: Payment.js ~ line 13 ~ Payment ~ location", location);
  const [carError, setError] = useState();
  const [success, setSuccess] = useState();
  const strpie = useStripe();
  const element = useElements();
  const [clientSecret, setClientSecret] = useState("");
    const price = location?.state?.price;
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("Token")}`
        },
      body: JSON.stringify({ price} ),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret));
  }, [price]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!strpie || !element) {
            return;
        }
        const card = element.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await strpie.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            setError(error.message);
        } else {
            setError("");
        }
      
        const { PaymentIntent, error: confirmError } = await strpie.confirmCardPayment(
            clientSecret,
          {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: location?.state.buyerName,
                        // Id: location?.state?._id,
                        email:location?.state?.buyerEmail,
                    },
                },
            },
        );
        if (confirmError) {
            return setError(confirmError.message);
        }

        if (PaymentIntent.status) {
            setSuccess(PaymentIntent.id);
        }
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">Payment</h1>
      <div className="flex justify-between w-full gap-7 mt-10">
        <div className="shadow p-4">
          <img className="" src={location?.state?.carImage} alt="" />
          <p className="text-2xl font-semibold mt-2">
            {location?.state?.carName}
          </p>
          <p className="text-blue-400 font-semibold mt-2">
            ${location?.state?.price}
          </p>
        </div>
        <div className="w-full">
          <form className=" shadow p-4" onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <p className="text-red-500 mt-2 text-sm">{carError}</p>
                      {
                          success && <p className="text-black mt-2 text-sm">
                          Your transection id:{" "}
                          <span className="text-green-500">{success}</span>
                        </p>
            }
            <button
              className="mt-4 cursor-pointer text-white bg-blue-400 rounded shadow-md px-5 py-2"
              type="submit"
              disabled={!strpie || clientSecret}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
