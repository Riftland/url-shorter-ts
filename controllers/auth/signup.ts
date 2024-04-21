import { hash } from "simple-stateless-auth-library-ts";
import { ControllersMiddleware } from "../../types";

export const signup: ControllersMiddleware = (db) => async (req, res, next) => {
    const { email, username, password } = req.body;

    const encrypted = await hash.encrypt(password);

    // Llamada a la query que crea el usuario en BBDD;

    res.status(200).json({
        success: true,
    })
}