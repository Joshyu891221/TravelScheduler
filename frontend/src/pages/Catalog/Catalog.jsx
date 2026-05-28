import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Travel from './Travel/Travel.jsx'
import User from './User/User.jsx'
import Spot from './Spot/Spot.jsx'
import BottomNavbar from './common/BottomNavbar.jsx'


const Catalog = () => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        // 如果沒有previousPath, 代表不是走設定好的路徑進入應用,一定尚未登入,打回登入頁
        const delay = 500;
        const previousPath = location.state?.from;

        if(previousPath === undefined) {
            navigate('/');
        }
        setLoading(false);
    }, [navigate])

    if(loading) {
        return (
            <div></div>
        )
    } else {
        return (<div>
                <Routes>
                    <Route path="/user" element={<User/>}/>
                    <Route path="/travel" element={<Travel/>}/>
                    <Route path="/spot" element={<Spot/>}/>
                </Routes>
                <BottomNavbar/>
            </div>
        )
    }
}

export default Catalog
