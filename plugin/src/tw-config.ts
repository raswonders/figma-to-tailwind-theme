import { getColorsFromVars, getColorsFromStyles, Colors } from "./colors";
import { Fonts, getFontsFromStyles } from "./fonts";

interface TwConfig {
  theme: {
    extend: {
      colors?: Colors;
      fontFamily?: Fonts;
    };
  };
}

let varColors: Colors;
let styleColors: Colors;
let styleFonts: Fonts;
let tokensReady = false;

async function fetchFigmaTokens() {
  if (!tokensReady) {
    varColors = await getColorsFromVars();
    styleColors = await getColorsFromStyles();
    styleFonts = await getFontsFromStyles();
    tokensReady = true;
  }
}

export async function getTwConfigStr() {
  await fetchFigmaTokens();
  const hasColors =
    Object.keys(varColors).length + Object.keys(styleColors).length > 0;
  const hasFonts = Object.keys(styleFonts).length > 0;

  const twConfig: TwConfig = {
    theme: {
      extend: {},
    },
  };

  if (hasColors) {
    twConfig.theme.extend.colors = { ...styleColors, ...varColors };
  }

  if (hasFonts) {
    twConfig.theme.extend.fontFamily = { ...styleFonts };
  }

  let result = "";
  try {
    result =
      hasColors || hasFonts
        ? `"theme":  ${JSON.stringify(twConfig.theme, null, 2)}`
        : "No colors or fonts on this page";
  } catch (err) {
    if (err instanceof Error) {
      result = err.message;
    }

    if (typeof err === "string") {
      result = err;
    }
  }

  return result;
}
