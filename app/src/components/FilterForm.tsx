import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  OutlinedInput,
  SelectChangeEvent 
} from '@mui/material';
import { HostDimensionEnum, hostDimensionLabels } from '../lib/dataCatalogue';
import { HostDimensionEnumType, HostFilterType } from '../lib/sharedTypes';

interface HostFilterFormProps {
  onFilterApply: (filters: HostFilterType) => void;
}

const initialFilters: HostFilterType = Object.values(HostDimensionEnum).reduce((acc, key) => {
  acc[key] = [];
  return acc;
}, {} as HostFilterType);

function HostFilterForm({ onFilterApply }: HostFilterFormProps) {
  const [filters, setFilters] = useState<HostFilterType>(initialFilters);

  const handleSelectChange = (event: SelectChangeEvent<string[]>, dimension: HostDimensionEnumType) => {
    const value = event.target.value as string[];
    setFilters(prev => ({ ...prev, [dimension]: value }));
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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      {Object.values(HostDimensionEnum).map((dimension) => (
        <FormControl key={dimension} size="small">
          <InputLabel id={`${dimension}-label`}>{hostDimensionLabels[dimension]}</InputLabel>
          <Select
            labelId={`${dimension}-label`}
            id={dimension}
            multiple
            value={filters[dimension]}
            onChange={(event) => handleSelectChange(event, dimension)}
            input={<OutlinedInput label={hostDimensionLabels[dimension]} />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {/* Add menu items dynamically based on available options for each dimension */}
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
            <MenuItem value="option4">Option 4</MenuItem>
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