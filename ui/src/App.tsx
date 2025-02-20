import { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";

export type TailwindVer = "v3" | "v4";

function App() {
  const configRef = useRef<HTMLTextAreaElement | null>(null);
  const copyRef = useRef<HTMLButtonElement | null>(null);
  const [tailwindVer, setTailwindVer] = useState<TailwindVer>("v3");

  useEffect(() => {
    if (copyRef.current) {
      copyRef.current.addEventListener("click", (event) => {
        configRef.current?.select();
        document.execCommand("copy");
        parent.postMessage(
          {
            pluginMessage: { type: "notify", text: "Copied to clipboard" },
          },
          "*",
        );
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data.pluginMessage;
      if ((message.type = "theme")) {
        if (configRef.current) {
          configRef.current.innerHTML = message.text;
        }
      }
    });
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
        copyRef={copyRef}
        tailwindVer={tailwindVer}
        setTailwindVer={setTailwindVer}
      />
      <textarea
        readOnly
        ref={configRef}
        className="config p-3 flex-1 resize-none font-mono text-xs"
        id="config"
      ></textarea>
    </main>
  );
}

export default App;
