import React from "react";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Block } from "components";
import { Link } from "react-router-dom";
import { validateField } from "utils/helpers/";

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
  } = props;

  return (
    <div>
      <div className="auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block>
        <Form
          onSubmit={handleSubmit}
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            hasFeedback
            validateStatus={validateField("email", touched, errors)}
            help={errors.email}
          >
            <Input
              id="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              size="large"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={validateField("email", touched, errors)}
            help={errors.password}
          >
            <Input
              id="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              type="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>

          <Form.Item>
            {dirty && !isValid && <span>Error</span>}
            <Button onClick={handleSubmit} type="primary" size="large">
              Войти в аккаунт
            </Button>
          </Form.Item>

          <Link className="auth__register-link" to="/register">
            Зарегистрироваться
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default LoginForm;
