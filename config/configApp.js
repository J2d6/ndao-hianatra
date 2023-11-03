export const serverGeneralPort = `3000`
export const server = `localhost:${serverGeneralPort}/`
export const secretKey = new TextEncoder().encode("Licence-L3-2318")
export const secretAlg = "HS256"



// ERRORS AND EXCEPTION

export const incorectPasswordError = new Error("INCORRECT_PASSWORD")
export const accountNotFoundError = new Error("ACCOUNT_NOT_FOUND");