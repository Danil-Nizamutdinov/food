import React, { memo } from "react";

interface InputRadioProps {
  items: { value: string; label: string }[];
  value: string | null;
  setValue: (value: string) => void;
}

const InputRadio: React.FC<InputRadioProps> = ({ items, value, setValue }) => {
  return (
    <div className="input_box_radio">
      {items.map((i) => (
        <div key={i.value}>
          <input
            type="radio"
            value={i.value}
            id={i.value}
            checked={value === i.value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label htmlFor={i.value}>{i.label}</label>
        </div>
      ))}
    </div>
  );
};
export default InputRadio;
