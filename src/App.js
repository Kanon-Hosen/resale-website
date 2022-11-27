import './App.css';
import MainRoutes from './MainRoute/MainRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import { Elements,} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
function App() {
  const queryClient = new QueryClient()

  return (
    <Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
      <MainRoutes></MainRoutes>
      <Toaster></Toaster>
      </QueryClientProvider>
      </Elements>
      
  );
}

export default App;
