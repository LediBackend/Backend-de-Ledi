import { Schema, model, Document, ObjectId } from "mongoose";

interface IBook extends Document {
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

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  idUser: { type: Schema.Types.ObjectId, ref: "users" },
  author: { type: String },
  descriptions: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  pathBooks: { type: Schema.Types.ObjectId, ref: "ContentBooks", required: true },
  coverImage: {
    type: {
      id_image: { type: String, required: true },
      url_secura: { type: String, required: true },
    },
  },
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
