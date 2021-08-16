import React, { Component } from "react";
import { Form, Input } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { Button, Block } from "components";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  render() {
    const success = false;
    return (
      <div>
        <div className="auth__top">
          <h2>Регистрация</h2>
          <p>Для входа в чат, вам нужно зарегистрироваться</p>
        </div>
        <Block>
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
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item hasFeedback validateStatus="success" name="email">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  size="large"
                  placeholder="E-mail"
                />
              </Form.Item>
              <Form.Item name="name">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  size="large"
                  type="text"
                  placeholder="Ваше имя"
                />
              </Form.Item>

              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  size="large"
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>

              <Form.Item name="passwordConfirm">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  size="large"
                  type="password"
                  placeholder="Повторите пароль"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" size="large">
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
  }
}

export default RegisterForm;
