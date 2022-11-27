import './App.css';
import MainRoutes from './MainRoute/MainRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
      <MainRoutes></MainRoutes>
      <Toaster></Toaster>
      </Elements>
    </QueryClientProvider>
  );
}

export default App;
