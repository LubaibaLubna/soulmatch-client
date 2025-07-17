import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { biodataId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const { isPending, data: biodataInfo = {} } = useQuery({
    queryKey: ['biodata-info', biodataId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/biodatas/${biodataId}`);
      return res.data;
    }
  });

  if (isPending) return <p className="text-center py-10">Loading biodata info...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // 1. Create payment method
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    // 2. Get payment intent client secret
    const { data: intentRes } = await axiosSecure.post('/api/create-payment-intent', {
      amountInCents: 500, // Fixed $5 for contact request
    });

    const clientSecret = intentRes.clientSecret;

    // 3. Confirm payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || 'Anonymous',
          email: user.email,
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    // 4. Save contact request
    if (paymentIntent.status === 'succeeded') {
      console.log('✅ Payment succeeded:', paymentIntent);

      const { data } = await axiosSecure.post('/api/contact-requests', {
        biodataId,
        requesterEmail: user.email,
      });

      Swal.fire("Success!", "Your contact request is pending admin approval.", "success");
      console.log("📦 Contact Request Saved:", data);
    }

    setProcessing(false);
  };

  return (
    <div className="py-10">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white text-gray-600 p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
        <div>
          <label className="block font-semibold">Biodata ID:</label>
          <input type="text" value={biodataId} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Your Email:</label>
          <input type="text" value={user?.email} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label className="block font-semibold">Card Details:</label>
          <CardElement className="p-2 border rounded" />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          className="btn btn-primary w-full"
        >
          {processing ? "Processing..." : "Pay $5"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
