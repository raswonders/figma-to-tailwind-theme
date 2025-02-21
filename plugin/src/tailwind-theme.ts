import { getColorsFromVars, getColorsFromStyles, Colors } from "./colors";
import { Fonts, getFontsFromStyles } from "./fonts";

interface ThemeV3 {
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

async function getThemeV3() {
  const hasColors =
    Object.keys(varColors).length + Object.keys(styleColors).length > 0;
  const hasFonts = Object.keys(styleFonts).length > 0;

  const twTheme: ThemeV3 = {
    theme: {
      extend: {},
    },
  };

  if (hasColors) {
    twTheme.theme.extend.colors = { ...styleColors, ...varColors };
  }

  if (hasFonts) {
    twTheme.theme.extend.fontFamily = { ...styleFonts };
  }

  let result = "";
  try {
    result =
      hasColors || hasFonts
        ? `"theme":  ${JSON.stringify(twTheme.theme, null, 2)}`
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

async function getThemeV4() {
  let CSSEntries = "";
  for (let color of Object.keys(styleColors)) {
    CSSEntries += `  --color-${color}: ${styleColors[color]};\n`;
  }
  for (let color of Object.keys(varColors)) {
    CSSEntries += `  --color-${color}: ${varColors[color]};\n`;
  }

  return `@theme {\n${CSSEntries}}`;
}

export async function getTheme(version = "v4") {
  await fetchFigmaTokens();

  if (version == "v3") {
    return getThemeV3();
  } else if (version == "v4") {
    return getThemeV4();
  } else {
    return "Unknown tailwind version";
  }
}
