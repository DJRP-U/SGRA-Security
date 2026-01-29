interface FilterOption {
  label: string;
  value: string | null;
}

interface FilterGroupProps {
  options: FilterOption[];
  currentValue: string | null;
  onChange: (value: string | null) => void;
  label?: string;
}

export default function FilterGroup({ options, currentValue, onChange, label }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex p-1 bg-gray-100 rounded-lg w-fit">
        {options.map((option) => (
          <button
            key={option.value || 'all'}
            onClick={() => onChange(option.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${currentValue === option.value
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}