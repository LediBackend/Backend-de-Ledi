import "express-session";

declare module "express-session" {
    interface SessionData {
        token?: string;
    }
}

import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
    export interface Request {
        user?: string | JwtPayload;
    }
}

