const isValidEmail = (stringEmail) => (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(stringEmail))   
const isValidPassword = (stringPassword) => stringPassword.length >=6
export {isValidEmail, isValidPassword};
    
