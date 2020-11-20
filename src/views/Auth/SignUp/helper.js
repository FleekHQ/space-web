// match special chars, except "-"
const SPECIAL_CHAR_REGEX = new RegExp(/[^\w-]/);

const formValidation = ({ tfUsername }) => (
  tfUsername.value.length > 0 && !SPECIAL_CHAR_REGEX.test(tfUsername.value)
);

export default {
  formValidation,
};
