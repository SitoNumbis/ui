// @emotion/css
import { CSSInterpolation, css } from "@emotion/css";

// styles
import { ColorPalette, ColorVariants } from "providers/StyleProvider/types";

/**
 *
 * @param colors
 * @param color
 */
export const makeStyles = (colors: ColorPalette, color: ColorVariants) => {
  const preStyles: CSSInterpolation = {
    color: colors[color].text,
    backgroundColor: colors[color].default,
    ".close-notification-icon": {
      fill: colors[color].text,
    },
  };
  return {
    root: css(preStyles),
  };
};
