import React, { useState } from 'react';
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { updateNoteByID } from "@/dynamo-client";

interface EditorProps {
    note_id: string;
    title: string;
    note: string;
    markdown: string;
    setMarkdown: (markdown: string) => void;
    setTitle: (title: string) => void;
}

export default function Editor({ note_id, title, note, markdown, setMarkdown, setTitle }: EditorProps) {
    let parsedNote: any = null;

    if(note) {
        try {
            parsedNote = JSON.parse(note);
        } catch (e) {
            console.error(e);
        }
    }



    type AnyFunction = (...args: any[]) => any;

    function debounce<T extends AnyFunction>(func: T, wait: number): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout;

        return function debounced(...args: Parameters<T>): void {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    // Creates a new editor instance.
    const editor: BlockNoteEditor = useBlockNote({
        initialContent: parsedNote,
        onEditorContentChange: debounce((editor) => {
            updateNoteByID(note_id, title, JSON.stringify(editor.topLevelBlocks, null, 2));
            const saveBlocksAsMarkdown = async () => {
                const markdown: string =
                    await editor.blocksToMarkdownLossy(editor.topLevelBlocks);
                setMarkdown(markdown);
            };
            saveBlocksAsMarkdown();
        }, 1000)
    });

    // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} theme={"light"} />;
}
