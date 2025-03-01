import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import {Login} from "./pages/login/login.jsx";

function App() {

    return (<BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/login" element={<Login />} />


            </Routes>
        </BrowserRouter>


    )
}

export default App
