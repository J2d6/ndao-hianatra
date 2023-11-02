import {  secretKey, secretAlg, incorectPasswordError, accountNotFoundError } from "../config/configApp.js";
import { db } from "./mock";






/// ***
export async function login ({login, password}) {
    let account = null; 
    try {
        account = await verifyCredentials(login, password)
        return account
    } catch (error) {
        if (error == incorectPasswordError || error == accountNotFoundError) {
            return error.message
        } else {
            throw new Error(error.message)
        }
    }
}


///*** 
/**
 * Utilitaire to verify credentials . Wrap with an handler to handle Error or Success .Handler must verify if the potentially Error is an instance of incorrectPasswordError or accountNotFoundError and react by the right way
 * @param {Object} params - Containing Credentialas (login and password properties)
 * @returns {Object} the account if succeded
 * @throws {Error} if account was not found or credentials was incorrects 
 */
export async function verifyCredentials(login, password) {
   try {
    const user = db.user
    // get account where login == login
    let account = null;

        for ( let index = 0; index < user.length; index++ ) {
            if (user[index].login === login ) {
                account = user[index]
            }
        }
        if (account) {
            if (account.password === password) {
                return account
            }
            throw incorectPasswordError
        } else {
            throw accountNotFoundError
        }

   } catch (error) {
        throw error
   }
}


