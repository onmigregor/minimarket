import React from 'react';

interface AvailabilitySelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export default function AvailabilitySelectorComponent({ value, onChange, options }: AvailabilitySelectorProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
