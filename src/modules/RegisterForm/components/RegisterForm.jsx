import React from "react";
import { Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { Button, Block } from "components";
import { Link } from "react-router-dom";
import { validateField } from "utils/helpers/";

const success = false;

const RegisterForm = (props) => {
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
        <h2>Регистрация</h2>
        <p>Для входа в чат, вам нужно зарегистрироваться</p>
      </div>
      <Block initialValues={{ email: "asss" }}>
        {success ? (
          <div className="auth__success-block">
            <div>
              <InfoCircleTwoTone />
            </div>
            <h2>Подтвердите свой аккаунт</h2>
            <p>
              На Вашу почту отправлено письмо с ссылкой на подтверждение
              аккаунта.
            </p>
          </div>
        ) : (
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
                placeholder="E-mail"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Input
                id="fullname"
                prefix={<UserOutlined className="site-form-item-icon" />}
                size="large"
                type="text"
                value={values.fullname}
                placeholder="Ваше имя"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item
              hasFeedback
              validateStatus={validateField("password", touched, errors)}
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
              <Input
                id="password2"
                prefix={<LockOutlined className="site-form-item-icon" />}
                size="large"
                type="password"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item>
              {dirty && !isValid && <span>Error</span>}
              <Button onClick={handleSubmit} type="primary" size="large">
                Зарегистрироваться
              </Button>
            </Form.Item>

            <Link className="auth__register-link" to="/login">
              Войти в аккаунт
            </Link>
          </Form>
        )}
      </Block>
    </div>
  );
};

export default RegisterForm;
