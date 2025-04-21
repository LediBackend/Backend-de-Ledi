import { ObjectId } from "mongoose";

interface PropCreateBooks {
  title: string;
  author: string;
  descriptions: string;
  category: string;
  available: boolean;
  idUser: ObjectId;
}

interface Result {
  url: string;
  id: string;
}

export { PropCreateBooks, Result };
