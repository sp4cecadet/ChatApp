import React from "react";
import { Form, Input } from "antd";

import { validateField } from "utils/helpers/";

function FormField({
  name,
  type,
  placeholder,
  icon,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
}) {
  return (
    <Form.Item
      hasFeedback
      validateStatus={validateField(name, touched, errors)}
      help={touched[name] && errors[name]}
    >
      <Input
        id={name}
        type={type}
        prefix={icon}
        size="large"
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Item>
  );
}

export default FormField;
