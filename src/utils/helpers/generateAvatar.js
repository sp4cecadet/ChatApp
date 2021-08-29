import tinycolor from "tinycolor2";

const generateAvatar = (hash) => {
  return {
    color: tinycolor.random({ luminosity: "dark" }),
    colorLighten: tinycolor.random({ luminosity: "dark" }),
  };
};

export default generateAvatar;
