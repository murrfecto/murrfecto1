import "./global.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Admin, Home} from "./pages";
import Page404 from "./pages/Page404/Page404";
import {OurTails} from "./pages/OurTailsPage/OurTailsPage";
import { ContactsPage } from "./pages/ContactsPage/ContactsPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/admin/*' element={<Admin/>}/>
                    <Route path= '/tails' element={<OurTails/>}/>
                    <Route path= '/contacts' element={<ContactsPage/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
