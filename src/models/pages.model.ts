import { model, Schema, Document } from "mongoose";

interface IPages extends Document {
  content: string;
}

const schemaPages = new Schema<IPages>({
  content: { type: String, required: true }, // Corrección de `type` y `required`
});

const Pages = model<IPages>("Pages", schemaPages);
export default Pages;
