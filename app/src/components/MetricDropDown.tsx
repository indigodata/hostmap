import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

// Define a type for the possible metric values
type HostMetric =
  | "avg_propogation_rate"
  | "avg_propogation_rate_2w"
  | "avg_confirmed_distinct_tx_per_minute";

// Define the props interface
interface MetricDropDownProps {
  onHostMetricChange: (selectedHostMetric: HostMetric) => void;
}

function MetricDropDown({
  onHostMetricChange,
}: MetricDropDownProps): React.JSX.Element {
  const [hostMetric, setHostMetric] = useState<HostMetric>(
    "avg_propogation_rate"
  );

  const handleChange = (event: SelectChangeEvent<HostMetric>) => {
    const selectedHostMetric = event.target.value as HostMetric;
    setHostMetric(selectedHostMetric);
    onHostMetricChange(selectedHostMetric);
  };

  return (
    <FormControl
      style={{ minWidth: 120, marginBottom: "20px", marginTop: "20px" }}
    >
      <InputLabel id="metric-label">Metric</InputLabel>
      <Select<HostMetric>
        labelId="metric-label"
        id="metric-select"
        value={hostMetric}
        label="Metric"
        onChange={handleChange}
      >
        <MenuItem value="avg_propogation_rate">Avg Propagation Rate</MenuItem>
        <MenuItem value="avg_propogation_rate_2w">
          Avg Propagation Rate (2w)
        </MenuItem>
        <MenuItem value="avg_confirmed_distinct_tx_per_minute">
          Pre-Conf Txns per Minute
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default MetricDropDown;
