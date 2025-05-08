import { ObjectId } from "mongoose";

interface PropBooks {
  title: string;
  author: string;
  descriptions: string;
  category: string;
  available: boolean;
  idUser: ObjectId;
  language: string;
}

interface Result {
  url: string;
  id: string;
}

export { PropBooks, Result };
