import { ClipboardCopy } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import type { TailwindVer } from "../../ui/src/App";

interface NavbarProps {
  configRef: React.RefObject<HTMLTextAreaElement>;
  tailwindVer: TailwindVer;
  setTailwindVer: Dispatch<SetStateAction<TailwindVer>>;
}

export function Navbar({
  configRef,
  tailwindVer,
  setTailwindVer,
}: NavbarProps) {
  return (
    <div className="ps-3 flex justify-between items-center text-xs">
      <div>
        <label className="text-base font-normal">
          Tailwindcss
          <select
            className="ml-1 rounded-md border bg-[var(--figma-color-bg-secondary)] border-[var(--figma-color-border)]"
            id="tw-version"
            value={tailwindVer}
            onChange={(e) => setTailwindVer(e.target.value as TailwindVer)}
          >
            <option value="v4">v4</option>
            <option value="v3">v3</option>
          </select>
        </label>
      </div>
      <button
        className="copy-button p-2 bg-transparent"
        onClick={() => {
          configRef.current?.select();
          document.execCommand("copy");
          parent.postMessage(
            {
              pluginMessage: { type: "notify", text: "Copied to clipboard" },
            },
            "*",
          );
        }}
      >
        <ClipboardCopy size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
