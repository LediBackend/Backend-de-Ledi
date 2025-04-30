import { Request, Response } from "express";
import { Schema, model, Document, ObjectId } from "mongoose";



interface IBook extends Document {
    id?: ObjectId;
    title: string;
    author: string;
    descriptions: string;
    category: string;
    available?: boolean;
    createdAt?: Date;
    idUser?: ObjectId;
    pathBooks: ObjectId;
    coverImage: { id_image: string; url_secura: string };
}

export const postBook = async (book: IBook) => {
    const bookSave = { book }
    console.log(bookSave)
    const response = await fetch('http://localhost:3300/getBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookSave),
    });

    const result = await response.json();
    if (result) {
        console.log('The book was successfully sent to the AI')
    }
}