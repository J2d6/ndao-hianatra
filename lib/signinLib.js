/**
 * Validaion utilisty for login input xithin signup
 * @param {String} login 
 * @returns {String} - Validation String error @example "Requis"
 */
export const loginValidation = login => {
    try {
        if (login) {
            return null
        } else {
            return "Requis"
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


export const passwordValidation = password => {
    try {
        if (password) {
            if (password.toString().length < 8 ) {
                return "Doit contenir au moins 8 caractères"
            } 
            return null
        } else {
            return "Requis"
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
