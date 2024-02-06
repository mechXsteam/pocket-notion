"use client";

// Import necessary types
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import {Sidebar} from "@/components/main/sidebar";
import {getNoteByID} from "@/dynamo-client";
import {Download} from "lucide-react";
import {jsPDF} from 'jspdf';
import {updateNoteByID} from "@/dynamo-client";


// Import the TypeScript types for your Next.js params
interface NoteEditorProps {
    params: {
        id: string;
    };
}


const Editor = dynamic(() => import("@/components/blocknoteEditor/editor"), {ssr: false});

const NoteEditor: React.FC<NoteEditorProps> = ({params}) => {
    const [title, setTitle] = useState('Untitled Note');
    const [note, setNote] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const [markdown, setMarkdown] = useState<string>("");

    useEffect(() => {
        const fetchNoteData = async () => {
            const noteData = await getNoteByID(params.id);
            if (noteData) {
                setTitle(noteData.title.S || 'Untitled Note');
                setNote(noteData.note.S || '');
                setMarkdown(noteData.note.S || '')
            }
        };

        fetchNoteData().then(r => undefined);

        window.addEventListener('resize', () => {
            setIsOpen(window.innerWidth > 768);
        });

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', () => {
                setIsOpen(window.innerWidth > 768);
            });
        };
    }, []);

    const handleSavePdf = async () => {
        try {
            const doc = new jsPDF({orientation: 'portrait', unit: 'mm', format: 'a4'});
            doc.text(markdown, 10, 10);
            // @ts-ignore
            doc.save(`${title.S}.pdf`);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }


    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className={`flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <input
                    type="text"
                    value={title ? title : ""}
                    onChange={(event) => {
                        setTitle(event.target.value);
                        updateNoteByID(params.id, event.target.value, note);
                    }}
                    className="text-5xl border-0 outline-none mx-10 font-extrabold w-full mt-10"
                    placeholder="Untitled Note"
                />
                <div onClick={handleSavePdf} className="flex ml-auto cursor-pointer transition-colors duration-200 hover:bg-gray-200 rounded-2xl p-3 font-semibold"><Download className='mr-2'/>Save as PDF</div>
                <div className="mt-5">
                    <Editor note_id={params.id} note={note} title={title} markdown={markdown} setMarkdown={setMarkdown} setTitle={setTitle}/>
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;