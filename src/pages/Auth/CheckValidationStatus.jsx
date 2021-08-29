import React, { useEffect, useState } from "react";
import { Result, Spin } from "antd";
import { Link } from "react-router-dom";

import { userAPI } from "utils/api";
import { Block, Button } from "components";

const renderTextInfo = ({ hash, verified }) => {
  if (hash) {
    if (verified === "alreadyVerified") {
      return {
        status: "info",
        title: "Внимание",
        message: "Аккаунт уже был активирован",
      };
    } else if (verified === "success") {
      return {
        status: "success",
        title: "Успех",
        message: "Аккаунт был активирован",
      };
    } else {
      return {
        status: "error",
        title: "Ошибка",
        message: "Вы указали несуществующий или неверный хеш.",
      };
    }
  } else {
    return {
      status: "info",
      title: "Подтвердите почту",
      message: "Ссылка с подтверждением аккаунта отправлена на E-Mail.",
    };
  }
};

const CheckValidationStatus = () => {
  const hash = window.location.search.split("hash=")[1];
  const [verified, setVerified] = useState(null);
  const [checking, setChecking] = useState(!!hash);
  const [info, setInfo] = useState(
    renderTextInfo({ hash, checking, verified })
  );

  const setStatus = ({ checking, verified }) => {
    setInfo(renderTextInfo({ hash, checking, verified }));
    setVerified(verified);
    setChecking(checking);
  };

  useEffect(() => {
    if (hash) {
      userAPI
        .verifyHash(hash)
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "verified") {
            setStatus({ verified: "alreadyVerified", checking: false });
          } else if (res.data.status === "success")
            setStatus({ verified: "success", checking: false });
        })
        .catch((err) => {
          setStatus({ verified: false, checking: false });
        });
    }
  }, []);

  console.log({ info, checking, verified, hash });

  return (
    <div className="verify-block">
      <Block>
        {!checking ? (
          <Result
            status={info.status}
            title={info.title}
            subTitle={info.message}
          />
        ) : (
          <div className="verify-block__loading">
            <Spin size="large" />
          </div>
        )}
        <Link to="/signin">
          <Button type="primary" size="large">
            Вход в аккаунт
          </Button>
        </Link>
      </Block>
    </div>
  );
};

export default CheckValidationStatus;
