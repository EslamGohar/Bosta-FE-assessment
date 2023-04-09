import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  OrderDetails,
  PricingPage,
  SignInPage,
  ContactSalesPage,
  ErrorPage,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<OrderDetails />} />
              <Route path="/home" element={<OrderDetails />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact-sales" element={<ContactSalesPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
