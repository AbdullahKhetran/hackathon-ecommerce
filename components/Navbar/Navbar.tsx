"use client"

import { useState, useEffect } from 'react';


import SmNav from './SmNav';
import LgNav from './LgNav';


export default function Navbar() {

    const [width, setWidth] = useState(0); // cannot use window.innerwidth here because of error, see note below

    useEffect(() => {
        const handleWindowResize = () => {
            setWidth(window.innerWidth);
        };

        // Check if window object is available
        if (typeof window !== 'undefined') {
            // need to add this check because of vercel error: window exists on borwser (client side) but build is happening on server

            setWidth(window.innerWidth); // looks unnecessary, checked with chatgpt
            window.addEventListener('resize', handleWindowResize);

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        }
    }, []);

    // const [navbar, setNavbar] = useState(false)
    return (
        <div>
            {width > 1023 ?
                <LgNav /> :
                <SmNav />
            }
        </div>
    );
}
