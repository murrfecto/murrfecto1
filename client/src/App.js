import "./global.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Admin, Home} from "./pages";
import Page404 from "./pages/Page404/Page404";
import {OurTails} from "./pages/OurTailsPage/OurTailsPage";
import AboutShelterPage from "./pages/AboutShelterPage/AboutShelterPage";
import {ContactsPage} from "./pages/ContactsPage/ContactsPage";
import CatProfile from "./pages/CatProfile/CatProfile";
import CookieNotification from "../src/components/common/CookieNotification/CookieNotification";


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
