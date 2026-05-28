import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Catalog from './pages/Catalog/Catalog.jsx'

function App() {

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/catalog/*" element={<Catalog/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
