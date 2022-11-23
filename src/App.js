import './App.css';
import MainRoutes from './MainRoute/MainRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <MainRoutes></MainRoutes>
    </QueryClientProvider>
  );
}

export default App;
