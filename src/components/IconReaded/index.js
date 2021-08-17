import PropTypes from "prop-types";

import ReadedSvg from "assets/img/readed.svg";
import SentSvg from "assets/img/sent.svg";

const IconReaded = ({ isMine, isReaded }) =>
  isMine &&
  (isReaded ? (
    <img
      className="message__status__icon"
      src={ReadedSvg}
      alt="Message readed"
    />
  ) : (
    <img className="message__status__icon" src={SentSvg} alt="Message sent" />
  ));

IconReaded.propTypes = {
  isMine: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default IconReaded;
