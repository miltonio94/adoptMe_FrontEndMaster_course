import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";
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
  const adoptedPet = React.useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes >
        </AdoptedPetContext.Provider>
      </QueryClientProvider >
    </BrowserRouter >

  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
