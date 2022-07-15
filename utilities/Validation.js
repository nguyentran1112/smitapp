const isValidEmail = stringEmail =>
  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(stringEmail);
const isValidPassword = stringPassword => stringPassword.length >= 6;
const isValidLink = stringLink =>
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    stringLink,
  );
const isValidNumber = stringNumber => /[0-9]/.test(stringNumber);
export {isValidEmail, isValidPassword, isValidLink, isValidNumber};
