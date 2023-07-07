import "./global.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Admin, Home} from "./pages";
import Page404 from "./pages/Page404/Page404";
import AboutShelterPage from "./pages/AboutShelterPage/AboutShelterPage";
import {ContactsPage} from "./pages/ContactsPage/ContactsPage";
import CatProfile from "./pages/CatProfile/CatProfile";
import CookieNotification from "../src/components/common/CookieNotification/CookieNotification";
import {OurTails} from "./pages/OurTailsPage/OurTailsPage";
import Report from "./pages/Report/Report";



function App() {
    const isCookiesDismissed = localStorage.getItem(
        "cookieNotificationDismissed"
    );

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/admin/*" element={<Admin/>}/>
                    <Route path="/tails" element={<OurTails/>}/>
                    <Route path="/report" element={<Report/>}/>
                    <Route path="/about" element={<AboutShelterPage/>}/>
                    <Route path="/contacts" element={<ContactsPage/>}/>
                    <Route path="/cat/:id" element={<CatProfile/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
                <Footer/>
                {!isCookiesDismissed && <CookieNotification/>}
            </BrowserRouter>
        </div>
    );
}

export default App;
