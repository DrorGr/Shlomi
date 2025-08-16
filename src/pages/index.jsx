import Layout from "./Layout.jsx";

import Home from "./Home";

import Houses from "./Houses";

import HouseDetail from "./HouseDetail";

import MyTickets from "./MyTickets";

import Profile from "./Profile";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Houses: Houses,
    
    HouseDetail: HouseDetail,
    
    MyTickets: MyTickets,
    
    Profile: Profile,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Houses" element={<Houses />} />
                
                <Route path="/HouseDetail" element={<HouseDetail />} />
                
                <Route path="/MyTickets" element={<MyTickets />} />
                
                <Route path="/Profile" element={<Profile />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}