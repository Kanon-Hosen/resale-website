import React, { useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
const Payment = () => {
  const location = useLocation();
  const [carError, setError] = useState();
  const [success, setSuccess] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
    const price = location?.state?.price;
    const name = location?.state?.buyerName;
    const email = location?.state?.buyerEmail;
  useEffect(() => {
    fetch(
      "https://resell-4tq3lnx88-kanon-hosen.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({ price }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret));
  }, [price]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {

      return;
    }
    const card = elements?.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error?.message);
    } else {
      setSuccess(paymentMethod.billing_details.name);

      setError("");
    }

    const { PaymentIntent, error: confirmError } =
      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

    if (confirmError) {
      e.target.reset()
      return setError(confirmError.message);
    }

    if (!PaymentIntent) {
      toast.success("Success");
        setSuccess("Successfull");
        e.target.reset()
    }
    // setLoading(false)
  };
//   if (loading) {
//       return <Sppiner></Sppiner>
//   }
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
          <form className="shadow p-4" onSubmit={handleSubmit}>
            <CardElement />
            <p className="text-red-500 text-sm mt-4">{carError}</p>
            <p className="text-green-500 mt-4 text-sm">{success}</p>
            <button
              type="submit"
              className="btn btn-primary mt-6"
              disabled={!stripe || !elements}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  // }
};

export default Payment;
