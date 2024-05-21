
const validateUsername = (username) => {
    if(!username || typeof username !== "string"){
        return {username: false}
    }

    if(_containsNoInvalidChars(username) === false){
        return {username: false}
    }

    return {username: true}
}

const verifyPassword = (password) => {
    /*
     * Short-circuit checks if password is not a string
     */
    if(!password || typeof password !== "string") {
        return { pass: false }
    }

    /*
     * Perform individual verification checks.
     */
    const checks = {
        length: _containsAtLeast8Chars(password),
        lowercase: _containsOneLowercase(password),
        uppercase: _containsOneUppercase(password),
        digit: _containsOneDigit(password),
        symbol: _containsOneSymbol(password),
        noInvalid: _containsNoInvalidChars(password)
    }

    /*
     * Determine overall verification result based on individual checks.
     */
    const pass = (
        checks.length &&
        checks.lowercase &&
        checks.uppercase &&
        checks.digit &&
        checks.symbol &&
        checks.noInvalid
    )

    return { ...checks, pass: pass }
}

function _containsAtLeast8Chars(password) {
    return password && password.length >= 8
}

function _containsOneLowercase(password) {
    const regex = /[a-z]/
    return regex.test(password)
}

function _containsOneUppercase(password) {
    const regex = /[A-Z]/
    return regex.test(password)
}

function _containsOneDigit(password) {
    const regex = /[0-9]/
    return regex.test(password)
}

function _containsOneSymbol(password) {
    const regex = /[!@#$%^&*]/
    return regex.test(password)
}

function _containsNoInvalidChars(input) {
    const regex = /[^a-zA-Z0-9!@#$%^&*]/
    return !regex.test(input)
}


module.exports = {
    validateUsername,
    verifyPassword
}

