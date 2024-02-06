"use server";

import {DynamoDBClient, DynamoDBClientConfig} from '@aws-sdk/client-dynamodb';
import {ScanCommand, PutItemCommand, GetItemCommand} from "@aws-sdk/client-dynamodb";
import {v4 as uuidv4} from 'uuid';


const config: DynamoDBClientConfig = {
    region: process.env['AWS_REGION'] || 'ap-south-1',
    credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'] as string,
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] as string
    },
};

const dynamodb = new DynamoDBClient(config);

async function updateNoteByID(note_id: string, title: string, note: string): Promise<void> {

    const command = new PutItemCommand({
        TableName: "pocket-notion",
        Item: {
            "id": {S: note_id},
            "title": {S: title},
            "note": {S: note}
        }
    });

    try {
        await dynamodb.send(command);
    } catch (err) {
        console.error(err);
    }
}


async function getNoteByID(note_id: string): Promise<any> {
    const command = new GetItemCommand({
        TableName: "pocket-notion",
        Key: {
            "id": {S: note_id}
        }
    });

    try {
        const data = await dynamodb.send(command);
        return data.Item;
    } catch (err) {
        console.error(err);
    }
}

async function getAllNotes(): Promise<any> {
    const command = new ScanCommand({
        TableName: "pocket-notion"
    });

    try {
        const data = await dynamodb.send(command);
        return data.Items;
    } catch (err) {
        console.error(err);
    }
}


async function createNewNote(): Promise<string | null> {
    const newNoteId = uuidv4();

    const command = new PutItemCommand({
        TableName: "pocket-notion",
        Item: {
            "id": {S: newNoteId},
            "title": {S: "Untitled Note"},
            "note": {S: " "}
        }
    });

    try {
        await dynamodb.send(command);
        return newNoteId;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export {updateNoteByID, getNoteByID, getAllNotes, createNewNote}