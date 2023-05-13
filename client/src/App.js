import Main from "./pages/Main/Main";
import './global.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Admin,Home} from "./pages";
import {OurTails} from "./pages/OurTailsPage/OurTailsPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/admin/*' element={<Admin/>}/>
                    <Route path= '/tail/' element={<OurTails/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
