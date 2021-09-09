import PropTypes from "prop-types";
import generateAvatar from "../../utils/helpers/generateAvatar";

import "./Avatar.scss";

const Avatar = ({ user }) => {
  if (user.avatar) {
    return <img className="avatar" src={user.avatar.url} alt={user.fullname} />;
  } else {
    const { color, colorLighten } = generateAvatar(user._id);
    const firstChar = user?.fullname[0]?.toUpperCase() || "-";
    return (
      <div
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%`,
        }}
        className="avatar avatar--gradient"
      >
        {firstChar}
      </div>
    );
  }
};

Avatar.propTypes = {
  className: PropTypes.string,
};

export default Avatar;
