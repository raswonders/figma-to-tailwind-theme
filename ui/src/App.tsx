import { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";

export type TailwindVer = "v3" | "v4";

function App() {
  const configRef = useRef<HTMLTextAreaElement | null>(null);
  const [tailwindVer, setTailwindVer] = useState<TailwindVer>("v4");

  useEffect(() => {
    const handleThemeMessage = (event: MessageEvent) => {
      const message = event.data.pluginMessage;
      if ((message.type = "theme")) {
        if (configRef.current) {
          configRef.current.innerHTML = message.text;
        }
      }
    };

    window.addEventListener("message", handleThemeMessage);
    return () => {
      window.removeEventListener("message", handleThemeMessage);
    };
  }, []);

  useEffect(() => {
    parent.postMessage(
      { pluginMessage: { type: "generate", text: tailwindVer } },
      "*",
    );
  }, [tailwindVer]);

  return (
    <main className="flex flex-col h-full">
      <Navbar
        configRef={configRef}
        tailwindVer={tailwindVer}
        setTailwindVer={setTailwindVer}
      />
      <p className="ps-3 pt-3 pb-1 text-sm font-mono]">
        # place below contents into{" "}
        {tailwindVer === "v3" ? "tailwind.config.js" : "index.css"}
      </p>
      <textarea
        readOnly
        ref={configRef}
        className="p-3 config flex-1 resize-none font-mono text-xs"
        id="config"
      ></textarea>
    </main>
  );
}

export default App;
