import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent 
} from '@mui/material';
import { hostDimensionLabels } from '../lib/dataCatalogue';
import { HostFilters } from '../lib/sharedTypes';

interface HostFilterFormProps {
  onFilterApply: (filters: HostFilters) => void;
}

const initialFilters: HostFilters = {
  searchTerm: '',
  country: '',
  os: '',
  clientType: '',
};

function HostFilterForm({ onFilterApply }: HostFilterFormProps) {
  const [filters, setFilters] = useState<HostFilters>(initialFilters);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFilterApply(filters);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    onFilterApply(initialFilters);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
      <TextField
        name="searchTerm"
        label="Search"
        variant="outlined"
        value={filters.searchTerm}
        onChange={handleInputChange}
        size="small"
      />
      {Object.entries(hostDimensionLabels).map(([key, label]) => (
        <FormControl key={key} size="small" sx={{ minWidth: 120 }}>
          <InputLabel id={`${key}-label`}>{label}</InputLabel>
          <Select
            labelId={`${key}-label`}
            id={key}
            name={key.replace('peer_', '')}
            value={filters[key.replace('peer_', '') as keyof HostFilters]}
            label={label}
            onChange={handleSelectChange}
          >
            <MenuItem value="">Any</MenuItem>
            {/* Add menu items dynamically based on available options */}
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        </FormControl>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Apply Filters
      </Button>
      <Button type="button" variant="outlined" onClick={handleReset}>
        Reset
      </Button>
    </Box>
  );
}

export default HostFilterForm;