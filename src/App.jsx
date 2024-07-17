import { Posts } from "./Posts";
import "./App.css";
// we need to import query client and query client provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import react query devtools which is only running in development mode
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// we need to create new query client
const queryClient = new QueryClient();

function App() {
  return (
    // we are now providing query client to our full application
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
