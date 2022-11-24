import './App.css';
import MainRoutes from './MainRoute/MainRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes></MainRoutes>
      <Toaster></Toaster>
    </QueryClientProvider>
  );
}

export default App;
