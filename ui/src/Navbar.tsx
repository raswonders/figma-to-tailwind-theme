import { ClipboardCopy } from "lucide-react";

interface NavbarProps {
  copyRef: React.RefObject<HTMLButtonElement>;
}

export function Navbar({ copyRef }: NavbarProps) {
  return (
    <div className="p-1 flex justify-between items-center text-xs">
      <div>
        <label className="ps-3 text-base font-normal">
          Tailwindcss
          <select className="font-bold" id="tw-version">
            <option value="4">v4</option>
            <option value="3">v3</option>
          </select>
        </label>
      </div>
      <button className="copy-button p-2 bg-transparent" ref={copyRef}>
        <ClipboardCopy size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}
