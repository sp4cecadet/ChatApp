/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Form } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Block, FormField } from "components";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    dirty,
  } = props;

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <div className="auth__top">
        <h2>Регистрация</h2>
        <p>Для входа в чат, вам нужно зарегистрироваться</p>
      </div>
      <Block initialValues={{ email: "asss" }}>
        <Form
          onSubmit={handleSubmit}
          className="login-form"
          initialValues={{ remember: true }}
        >
          <FormField
            name="email"
            touched={touched}
            errors={errors}
            placeholder="E-mail"
            icon={<MailOutlined className="site-form-item-icon" />}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
          />

          <FormField
            name="fullname"
            touched={touched}
            errors={errors}
            placeholder="Ваше имя"
            icon={<UserOutlined className="site-form-item-icon" />}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
          />

          <FormField
            name="password"
            type="password"
            touched={touched}
            errors={errors}
            placeholder="Введите пароль"
            icon={<LockOutlined className="site-form-item-icon" />}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
          />

          <FormField
            name="password2"
            type="password"
            touched={touched}
            errors={errors}
            placeholder="Повторите пароль"
            icon={<LockOutlined className="site-form-item-icon" />}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
          />

          <Form.Item>
            {dirty && !isValid && (
              <span>Одно или несколько полей заполнено неверно</span>
            )}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="primary"
              size="large"
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Link className="auth__register-link" to="/signin">
            Войти в аккаунт
          </Link>
        </Form>
      </Block>
    </div>
  );
};

export default RegisterForm;
