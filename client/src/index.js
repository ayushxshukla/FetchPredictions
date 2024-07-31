import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./theme.scss"; // Import the theme styles
import { FormDataProvider } from "./context/FormDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Root = () => {
  useEffect(() => {
    // Function to apply the theme based on user's preference
    const applyTheme = (e) => {
      if (e.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    };

    // Detect user's preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    applyTheme(darkModeMediaQuery);

    // Add listener for changes
    darkModeMediaQuery.addEventListener("change", applyTheme);

    // Cleanup listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", applyTheme);
    };
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <FormDataProvider>
          <App />
        </FormDataProvider>
      </Router>
    </React.StrictMode>
  );
};

root.render(<Root />);
