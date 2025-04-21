import jwt from "jsonwebtoken";

const JWT_SECRET = "tu_clave_secreta";
export const generarJWT = (userId: any) => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                console.error("Error generating JWT:", err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}