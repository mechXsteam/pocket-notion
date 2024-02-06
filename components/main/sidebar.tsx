"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ChevronsLeft, Menu as MenuIcon, PlusSquare, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { createNewNote, getAllNotes } from "@/dynamo-client";

interface Note {
    title: string;
    id: string;
}

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [notes, setNotes] = useState<Note[]>([]);

    const handleAddNote = async () => {
        // Add the new note to the notes list
        const newNoteId = await createNewNote();

        if (newNoteId) {
            setNotes([...notes, { title: 'Untitled Note', id: newNoteId }]);

            // Navigate to the new note
            router.push(`/notes/${newNoteId}`);
        } else {
            console.error("Failed to create a new note.");
        }
    }

    useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await getAllNotes();
            setNotes(notesData);
        };

        fetchNotes().then(r => undefined);

        const handleResize = () => {
            if (containerRef.current) {
                setIsOpen(containerRef.current.offsetWidth > 768);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div ref={containerRef}>
                <MenuIcon
                    onClick={toggleSidebar}
                    className="h-6 w-6 absolute top-4 left-4 cursor-pointer"
                />
                <div
                    className={`flex flex-col fixed top-0 left-0 w-64 h-full bg-gray-200 p-4 overflow-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <ChevronsLeft
                        onClick={toggleSidebar}
                        className="h-6 w-6 absolute top-4 right-4 cursor-pointer"
                    />
                    <Button className='h-10 w-40 relative cursor-pointer' onClick={handleAddNote}>
                        <div className='flex'>
                            Add Notes <PlusSquare className='ml-2' />
                        </div>
                    </Button>
                    <div className="h-10 top-10 w-50 relative">
                        <h2>Notes</h2>
                        {notes.map(({ title, id }, index) => (
                            <div key={index}
                                 className="flex mt-2 p-3 font-semibold hover:bg-gray-300 rounded cursor-pointer"
                                 onClick={() => router.push(`/notes/${id.S}`)}
                            >
                                <ScrollText className="mr-2" /> {title.S}...
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
