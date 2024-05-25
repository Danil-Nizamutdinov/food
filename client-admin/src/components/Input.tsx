import React, { memo } from "react";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = memo(
  ({ value, setValue, placeholder, type }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="input_text"
      />
    );
  }
);

export default Input;
