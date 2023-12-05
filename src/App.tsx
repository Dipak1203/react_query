import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductPage from "./components/Product";

export default function App() {
  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<ProductPage />}/>
   </Routes>
   </BrowserRouter>
  );
}
