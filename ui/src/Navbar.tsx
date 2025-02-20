import { ClipboardCopy } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import type { TailwindVer } from "../../ui/src/App";

interface NavbarProps {
  copyRef: React.RefObject<HTMLButtonElement>;
  tailwindVer: TailwindVer;
  setTailwindVer: Dispatch<SetStateAction<TailwindVer>>;
}

export function Navbar({ copyRef, tailwindVer, setTailwindVer }: NavbarProps) {
  return (
    <div className="p-1 flex justify-between items-center text-xs">
      <div>
        <label className="ps-3 text-base font-normal">
          Tailwindcss
          <select
            className="font-bold"
            id="tw-version"
            value={tailwindVer}
            onChange={(e) => setTailwindVer(e.target.value as TailwindVer)}
          >
            <option value="v3">v3</option>
            <option value="v4">v4</option>
          </select>
        </label>
      </div>
      <button className="copy-button p-2 bg-transparent" ref={copyRef}>
        <ClipboardCopy size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
