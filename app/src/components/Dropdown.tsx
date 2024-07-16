import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface DropdownProps<T extends string> {
  label: string;
  options: Record<T, string>;
  defaultValue: T;
  onChange: (selectedValue: T) => void;
}

function Dropdown<T extends string>({ label, options, defaultValue, onChange }: DropdownProps<T>) {
  const [value, setValue] = useState<T>(defaultValue);

  const handleChange = (event: SelectChangeEvent<T>) => {
    const selectedValue = event.target.value as T;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <FormControl style={{ minWidth: 120, marginBottom: '20px', marginTop: '20px',  width: "100%" }}>
      <InputLabel id={`${label.toLowerCase()}-label`}>{label}</InputLabel>
      <Select<T>
        labelId={`${label.toLowerCase()}-label`}
        id={`${label.toLowerCase()}-select`}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {(Object.keys(options) as T[]).map((key) => (
          <MenuItem key={key} value={key}>
            {options[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;