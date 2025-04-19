import { Schema, model, Document, ObjectId } from "mongoose";

interface IBook extends Document {
  title: string;
  author: ObjectId;
  descriptions: string;
  category: string;
  available?: boolean;
  createdAt?: Date;
  pages: ObjectId[];
  url: string;
  idDocument: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: "users", required: true },
  descriptions: { type: String, required: true }, // Corrección aquí
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  pages: [{ type: Schema.ObjectId, ref: "Pages", required: true }],
  url: { type: String, required: true },
  idDocument: { type: String, required: true },
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
