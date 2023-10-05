import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details"
import { Link } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  }
})

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <div>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes >
        </div>
      </QueryClientProvider >
    </BrowserRouter>

  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
