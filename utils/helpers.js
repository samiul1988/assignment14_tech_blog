module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  is_array: input => Array.isArray(input),
  has_array_elements: inputArr => inputArr.length > 0,
  toggle_label: input => input === "Login" ? "Sign up" : "Login",
  toggle_link: input => input === "Login" ? "/signup" : "/login"

//   single_post_url: () => {
//       console.log("window.location.pathname", document.location);
//       return document.location;
//   }

//   format_url: url => {
//     return url
//       .replace('http://', '')
//       .replace('https://', '')
//       .replace('www.', '')
//       .split('/')[0]
//       .split('?')[0];
//   },
//   format_plural: (word, amount) => {
//     if (amount !== 1) {
//       return `${word}s`;
//     }

//     return word;
//   }
};
