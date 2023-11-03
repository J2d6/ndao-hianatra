import { incorectPasswordError, accountNotFoundError } from "../../../config/configApp.js";
import { encodeJwt } from "@/lib/jwt.js";
import { verifyCredentials } from "../../../lib/authLib.js";
// // Get account where login == req.login
// if (account) {
//     // verifiy if account.password == Req.password
//     if (account.password == Request.password) {
//         // Landign page
//     } else {
//         throw incorectPasswordError
//     }
// } else {
//     // throw Account not found
// }

export default async function loginHandler (req, res) {
    let account = null; 
    try {
        account = await verifyCredentials(req.body.login, req.body.password)
        const user = {
            nomUser : account.nomUser,
            idUser : account.idUser,
            typeCompte : account.typeCompte
        }
        const jwt = await encodeJwt(user)
        res.setHeader('Set-Cookie',`jwt=${jwt}`)
        const pathRequested = req.body.path ? req.body.path.toString().trim() : "/"
        res.json({
            redirect : pathRequested
        })
    } catch (error) {
        // console.log("NISY ERREUR NY VERIFY CREDENTALS");
        // console.log(`error.message : ${error.message}`);
        // console.log(`incorrectPasswordError.message : ${incorectPasswordError.message}`);
        const response = {}
        if (error.message == incorectPasswordError.message || error.message == accountNotFoundError.message) {
            response.message = error.message
        } else {
            response.error = error.message
        }

        res.json(response)
    }
}
