const validate = (key, touched, errors) => {
  if (touched[key]) {
    if (errors[key]) {
      return "error";
    } else if (!errors[key]) {
      return "success";
    } else {
      return "";
    }
  }
};

export default validate;
