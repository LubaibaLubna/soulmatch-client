import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthContext';

// 🧾 Stripe imports
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// ✅ TanStack Query setup
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

// ✅ Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
