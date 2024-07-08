import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

// Define a type for the possible group by values
type GroupByOption =
  | "peer_region"
  | "peer_country"
  | "peer_os"
  | "peer_client_type";

// Define the props interface
interface GroupByDropdownProps {
  onGroupByChange: (selectedGroupBy: GroupByOption) => void;
}

function GroupByDropdown({
  onGroupByChange,
}: GroupByDropdownProps): React.JSX.Element {
  const [groupBy, setGroupBy] = useState<GroupByOption>("peer_region");

  const handleChange = (event: SelectChangeEvent<GroupByOption>) => {
    const selectedGroupBy = event.target.value as GroupByOption;
    setGroupBy(selectedGroupBy);
    onGroupByChange(selectedGroupBy);
  };

  return (
    <FormControl
      style={{ minWidth: 120, marginBottom: "20px", marginTop: "20px" }}
    >
      <InputLabel id="group-by-label">Group By</InputLabel>
      <Select<GroupByOption>
        labelId="group-by-label"
        id="group-by-select"
        value={groupBy}
        label="Group By"
        onChange={handleChange}
      >
        <MenuItem value="peer_region">Region</MenuItem>
        <MenuItem value="peer_country">Country</MenuItem>
        <MenuItem value="peer_os">Operating System</MenuItem>
        <MenuItem value="peer_client_type">Client</MenuItem>
      </Select>
    </FormControl>
  );
}

export default GroupByDropdown;
