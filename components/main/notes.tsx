'use client';

import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import EmptyHero from "@/components/main/empty";
import {createNewNote} from "@/dynamo-client";
import {useRouter} from 'next/navigation';


const Notes = () => {

    const router = useRouter();
    const handleAddNote = async () => {
        const newNoteId = await createNewNote();

        if (newNoteId) {

            // Navigate to the new note
            router.push(`/notes/${newNoteId}`);
        } else {
            console.error("Failed to create a new note.");
        }
    }

    return (
        <div className="flex flex-col items-center max-h-screen">
            <Button onClick={handleAddNote}>
                <PlusCircle className="mr-2"/>
                Create a note
            </Button>
            <EmptyHero/>
        </div>
    );
};

export default Notes;
