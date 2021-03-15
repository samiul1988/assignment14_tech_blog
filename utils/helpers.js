module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  is_array: input => Array.isArray(input),
  has_array_elements: inputArr => inputArr.length > 0,
  toggle_label: input => input === "Login" ? "Sign up" : "Login",
  toggle_link: input => input === "Login" ? "/signup" : "/login",
  is_same: (input1, input2) => input1 === input2
};
