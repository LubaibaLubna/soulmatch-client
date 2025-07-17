// // src/pages/Dashboard/CheckoutPage.jsx

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// import CheckoutForm from "./CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51RlUWhDEpRgJ7p5uvtMrCPFAytHT3TQXoV05ICXXNREdCHHfod7r3vmVU5ItJbN36G4wf902obthE5F5h2WRnX8n002XDvWYyj"); // Replace with your test publishable key

// const CheckoutPage = () => {
//   const { biodataId } = useParams();
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//       setUserEmail(user.email);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen py-12 px-4 bg-gray-50">
//       <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
//           Contact Info Request - Pay $5
//         </h2>

//         <div className="space-y-4 text-sm text-gray-600">
//           <div>
//             <label className="font-medium">Biodata ID</label>
//             <input
//               value={biodataId}
//               readOnly
//               className="w-full px-3 py-2 mt-1 border rounded bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="font-medium">Your Email</label>
//             <input
//               value={userEmail}
//               readOnly
//               className="w-full px-3 py-2 mt-1 border rounded bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Stripe Form */}
//         {userEmail && (
//           <Elements stripe={stripePromise}>
//             <div className="mt-6">
//               <CheckoutForm userEmail={userEmail} biodataId={biodataId} />
//             </div>
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;








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