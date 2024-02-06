'use client';

import React, {useState, useEffect} from 'react';
import Notes from '@/components/main/notes';
import {Sidebar} from "@/components/main/sidebar";

export default function MainPage() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Make sure to include fetchNotes in the dependency array

    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <Notes/>
            </div>
        </div>
    );
}
