import { model, Schema } from "mongoose";

interface IContainer extends Document {
  path: string;
}

const contentBook = new Schema<IContainer>({
  path: { type: String, required: true },
});

const ContentBook = model<IContainer>("ContentBooks", contentBook);

export default ContentBook;
