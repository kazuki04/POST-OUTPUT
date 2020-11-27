import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import '../components/Style.css/Layout.css'

const layout = (props) => (
    <div className='layout'>
        <Navbar />
        {props.children}
        <Footer />
    </div>
);

export default layout;