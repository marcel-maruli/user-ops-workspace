import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface SelectProps {
  options: Option[] | OptionGroup[];
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

  const getActiveOption = () => {
    for (const item of options) {
      if ("options" in item) {
        const found = item.options.find((o) => o.value === value);
        if (found) return found;
      } else {
        if (item.value === value) return item;
      }
    }
    return null;
  };

  const active = getActiveOption();

  const OptionItem = ({ opt }: { opt: Option }) => (
    <li
      data-testid={`select-option-${opt.value}`}
      onClick={() => {
        onChange(opt.value);
        setOpen(false);
      }}
      className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 ${
        value === opt.value
          ? "bg-blue-50 text-blue-700 font-bold"
          : "text-gray-700"
      }`}
    >
      {opt.label}
      {value === opt.value && <Check size={14} />}
    </li>
  );

  return (
    <div className="relative w-full" ref={ref}>
      <button
        data-testid="select-button"
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
          <ul className="max-h-64 overflow-y-auto py-1">
            {options.map((item, index) => {
              if ("options" in item) {
                return (
                  <div key={`group-${index}`}>
                    <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50/50">
                      {item.label}
                    </div>
                    {item.options.map((opt) => (
                      <OptionItem key={opt.value} opt={opt} />
                    ))}
                  </div>
                );
              }
              return <OptionItem key={item.value} opt={item} />;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
