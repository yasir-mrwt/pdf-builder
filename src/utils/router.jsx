import { createContext, useContext, useState } from "react";

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }

  return context;
};
