import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface SelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hide = (e: MouseEvent) =>
      !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", hide);
    return () => document.removeEventListener("mousedown", hide);
  }, []);

  const active = options.find((o) => o.value === value);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-3 text-sm rounded-xl border transition-all ${
          open ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300"
        } bg-white text-left`}
      >
        <span className={active ? "text-black" : "text-gray-400"}>
          {active?.label || placeholder}
        </span>
        {open ? (
          <ChevronUp size={16} color="gray" />
        ) : (
          <ChevronDown size={16} color="gray" />
        )}
      </button>

      {open && (
        <div className="absolute z-30 w-full mt-2 bg-white border rounded-xl shadow-xl overflow-hidden">
          <ul className="max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 ${
                  value === opt.value
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-gray-700"
                }`}
              >
                {opt.label}
                {value === opt.value && <Check size={14} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
