import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Chip,
  Autocomplete,
  TextField,
  InputLabel,
} from "@mui/material";
import { hostDimensionLabels } from "../lib/dataCatalogue";
import { HostDimensionEnumType, HostFilterType } from "../lib/sharedTypes";

interface HostFilterFormProps {
  onFilterApply: (filters: HostFilterType) => void;
  filterOptions: HostFilterType;
}

function HostFilterForm({ onFilterApply, filterOptions }: HostFilterFormProps) {
  const [filters, setFilters] = useState<HostFilterType>({});

  useEffect(() => {
    // Initialize filters with empty arrays for each dimension in filterOptions
    const initialFilters: HostFilterType = {};
    Object.keys(filterOptions).forEach((dimension) => {
      initialFilters[dimension as HostDimensionEnumType] = [];
    });
    setFilters(initialFilters);
  }, [filterOptions]);

  const handleChange = (
    dimension: HostDimensionEnumType,
    newValue: string[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [dimension]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Only include non-empty arrays in the applied filters
    const appliedFilters: HostFilterType = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        appliedFilters[key as HostDimensionEnumType] = value;
      }
    });
    onFilterApply(appliedFilters);
    console.log("Applied filters:", appliedFilters);
  };

  const handleReset = () => {
    const resetFilters: HostFilterType = {};
    Object.keys(filterOptions).forEach((dimension) => {
      resetFilters[dimension as HostDimensionEnumType] = [];
    });
    setFilters(resetFilters);
    onFilterApply({});
  };

  const handlePaste = (dimension: HostDimensionEnumType, event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const pastedValues = pastedText.split(/[,\s]+/).filter(Boolean); // Split by commas or whitespace

    setFilters(prev => ({
        ...prev,
        [dimension]: [...new Set([...(prev[dimension] || []), ...pastedValues])]
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
    >
      <InputLabel id={`filter-label`}>Host Filters</InputLabel>
      {(Object.keys(filterOptions) as HostDimensionEnumType[]).map(
        (dimension) => (
          <FormControl key={dimension} size="small">
            <Autocomplete
              multiple
              id={dimension}
              options={filterOptions[dimension] || []}
              value={filters[dimension] || []}
              onChange={(_, newValue) => handleChange(dimension, newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={hostDimensionLabels[dimension]}
                  variant="outlined"
                  onPaste={(event) => handlePaste(dimension, event)}
                />
              )}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              sx={{ width: "100%" }}
              ListboxProps={{
                style: { maxHeight: "200px" },
              }}
            />
          </FormControl>
        )
      )}
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
