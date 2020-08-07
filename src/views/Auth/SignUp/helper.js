// match special chars
const USERNAME_REGEX = new RegExp(/\W|_/);
// at least one upper case, 1 lower case, 1 digit, 1 special char and min 9 chars length
const PASSWORD_REGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const formValidation = ({ tfPassword, tfUsername }) => (
  tfUsername.value.length > 0 && !USERNAME_REGEX.test(tfUsername.value)
  && tfPassword.value.length > 0 && PASSWORD_REGEX.test(tfPassword.value)
);

export default {
  formValidation,
};
