import { emailValidator, noSpecialCharacteresValidator, requiredStringValidation, signUpPasswordValidation, telMalgacheValidator } from "./validationUtils";


export function nomValidation ( nom ) {
    return requiredStringValidation(nom);
}

// nothing about prenomvalidation ==> sanitize with prisma before insering it in the DB 
export function emailValidation ( email ) {
    if(requiredStringValidation(email)) {
        if (emailValidator(email)) {
            return true
        }
    }
    return false;
}

export function typeCompteValidation (typeCompte) {
    if (requiredStringValidation(typeCompte)) {
        if (noSpecialCharacteresValidator(typeCompte)) {
            return true
        }
    }
    return false;
}

export function dateNaissance ( dateNaissance ) {
    return requiredStringValidation(dateNaissance);
}

export function contactValidation ( contact ) {
    return requiredStringValidation(contact)
}

export function loginValidation ( login ) {
    if (requiredStringValidation(login)) {
        if (noSpecialCharacteresValidator(login)) {
            return true;
        }
    }
    return false;
}

export function passwordValidation ( password ) {
    if (requiredStringValidation(password)) {
        if (signUpPasswordValidation(password)) {
            return true
        } 
    }
    return false;
}

/**
 * 
 * @param {*} values
 * @returns  {Object} errors 
 */
export function signupValidator (
    values,setNomIsValid, 
    setDateNaissanceIsValid ,
    setTypeCompteIsValid,
    setEmailIsValid,
    setContactIsValid,
    setLoginIsValid,
    setPasswordIsValid
) {
    const errors = {};
    if (!nomValidation(values.nom)) {
        errors.nom = "Requis";
        setNomIsValid(false);
    }

    if (!dateNaissance(values.dateNaissance)) {
        errors.dateNaissance = "Requis"
        setDateNaissanceIsValid(false);
    }

    if (!typeCompteValidation(values.typeCompte)) {
        errors.typeCompte = "Requis"
        setTypeCompteIsValid(false)
    }

    if (!emailValidation(values.mail)) {
        errors.mail = "Requis et ne doit pas contenir des espace et doit avoir une syntaxe valide"
        setEmailIsValid(false);
    }

    if (!telMalgacheValidator(values.contact)) {
        errors.contact = "doit être un numéro mobile malgache valide";
        setContactIsValid(false);
    }

    if (!loginValidation(values.login)) {
        errors.login = "Requis et ne doit pas contenir des caractères spéciaux";
        setLoginIsValid(false);
    }

    if (!passwordValidation(values.password)) {
        errors.password = "Requis. Doit contenir au moins 8 caractères dont une lettre minuscule et majuscule au moins, un chiffre et un caractère spécial";
        setPasswordIsValid(false);
    }
    return errors;
}

export function handleKeyDownNomLib (event, setNomIsValid) {
    if (nomValidation(event.target.value)) {
        setNomIsValid(true)
    } 
}

export function handleKeyDownDateNaissanceLib (event, setDateNaissanceIsValid) {
    if (dateNaissance(event.target.value)) {
        setDateNaissanceIsValid(true)
    } 
}