import { getTheme } from "./tailwind-theme";

if (figma.editorType === "figma") {
  setupUI();
} else if (figma.editorType === "dev") {
  if (figma.mode === "codegen") {
    figma.codegen.on("generate", async () => {
      const code = await getTheme();

      return [
        {
          language: "JAVASCRIPT",
          code,
          title: "tailwind.config.js",
        },
      ];
    });
  } else if (figma.mode === "inspect") {
    setupUI();
  }
}

function setupUI() {
  figma.showUI(__html__, { themeColors: true, width: 800, height: 600 });

  figma.ui.onmessage = async (message) => {
    if (message.type === "generate") {
      figma.ui.postMessage({
        type: "theme",
        text: await getTheme(message.text),
      });
    }

    if (message.type === "notify") {
      figma.notify(message.text);
    }
  };
}
