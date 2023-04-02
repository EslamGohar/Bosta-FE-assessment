import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Error } from "./components";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<OrderDetails />} />
              <Route path="*" element={<Error />} />
              <Route path="/home" element={<h1>الصفحة الرئيسية</h1>} />
              <Route path="/pricing" element={<h1>الأسعار</h1>} />
              <Route path="/contact-sales" element={<h1>كلم المبيعات</h1>} />
              <Route path="/login" element={<h1>تسجيل الدخول</h1>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
