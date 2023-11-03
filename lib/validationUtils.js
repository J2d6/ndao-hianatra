export function noSpecialCharacteresValidator ( value ) {
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
}
export function requiredStringValidation( value ) {
    if (value) {
        if (value.toString().trim()) {
            return true
        } 
    } 
    return false;
}

export function requiredValidation ( value ) {
    if (!value) {
        return false
    }
    return true;
} 

/**
 * Validate an email syntax . DO NOT VERIFY IF "email" IS DEFINED so email should be surely defined before passing it 
 * @param {String} email - email to validate
 * @returns {Boolean} - True if "VALID"
 */
export function emailValidator ( email ) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}
/**
 * The password shoul contanin at least 8 characteres, one digit, one special charactere, one lowercase or upper case letter
 * @param {String} params 
 * @returns {Boolean} 
 */
export function signUpPasswordValidation( password ) {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ;
    return regexPassword.test(password);

}

export function telMalgacheValidator ( contact ) {
    const regexTel = /^(032|033|034|038)\d{7}$/
    if (contact) {
        return regexTel.test(contact.toString().trim())
    }
    return true
}