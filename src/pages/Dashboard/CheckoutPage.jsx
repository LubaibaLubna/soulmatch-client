
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Dashboard/CheckoutForm';




const stripePromise = loadStripe(import.meta.env.VITE_payment_key)

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>

      <CheckoutForm></CheckoutForm>
    </Elements>
  );
};

export default CheckoutPage;