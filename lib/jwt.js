import { secretAlg, secretKey } from "../config/configApp.js";
import { SignJWT } from "jose";

export async function encodeJwt (claims) {
    console.log(claims);
    const secret = secretKey
    const alg = secretAlg
    try {
        const jwt = await new SignJWT(claims)
            .setProtectedHeader({alg})
            .sign(secret)

        return jwt
    } catch (error) {
        throw new Error(error.message)
    }
}

