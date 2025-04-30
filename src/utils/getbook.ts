import { Request, Response } from "express";
import Book from "../models/books.model";


export const getForTitle: (title: string) => Promise<any> = async (title) => {
    try {
        const book = await Book.findOne({ title });
        return book;
    } catch (error) {
        console.error("Error fetching book by title:", error);
        throw error;
    }


}