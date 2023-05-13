import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./global.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Admin, Home } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
