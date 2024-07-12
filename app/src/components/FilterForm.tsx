import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    FormControl,
    Chip,
    Autocomplete,
    TextField,
  } from '@mui/material';
import { hostDimensionLabels } from '../lib/dataCatalogue';
import { HostDimensionEnumType, HostFilterType } from '../lib/sharedTypes';


interface HostFilterFormProps {
    onFilterApply: (filters: HostFilterType) => void;
    filterOptions: HostFilterType;
  }
  
  function HostFilterForm({ onFilterApply, filterOptions }: HostFilterFormProps) {
    const [filters, setFilters] = useState<HostFilterType>({});
  
    const handleChange = (dimension: HostDimensionEnumType, newValue: string[]) => {
      setFilters(prev => ({ ...prev, [dimension]: newValue }));
      console.log("Filters Updated:", filters);
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onFilterApply(filters);
    };
  
    const handleReset = () => {
      setFilters({});
      console.log("Filters Reset:", filters);
      onFilterApply({});
    };
  
    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {(Object.keys(filterOptions) as HostDimensionEnumType[]).map((dimension) => (
          <FormControl key={dimension} size="small">
            <Autocomplete
              multiple
              id={dimension}
              options={filterOptions[dimension] || []}
              value={filters[dimension]}
              onChange={(_, newValue) => handleChange(dimension, newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label={hostDimensionLabels[dimension]}
                  variant="outlined"
                />
              )}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      const newValue = (filters[dimension] || []).filter(item => item !== option);
                      handleChange(dimension, newValue);
                    }}
                  />
                ))
              }
              sx={{ width: '100%' }}
              ListboxProps={{
                style: { maxHeight: '200px' }
              }}
            />
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