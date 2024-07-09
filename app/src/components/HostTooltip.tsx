import React from "react";
import { Typography, Box } from "@mui/material";
import {
  Host,
  HostMetricEnumType,
  HostDimensionEnumType,
} from "../lib/sharedTypes";
import { hostDimensionLabels, hostMetricLabels } from "../lib/dataCatalogue";

// Define which metrics and dimensions to display
const metricsToDisplay: HostMetricEnumType[] = [
  "avg_propogation_rate",
  "avg_confirmed_distinct_tx_per_minute",
];

const dimensionsToDisplay: HostDimensionEnumType[] = [
  "peer_ip",
  "peer_country",
  "peer_os",
  "peer_client_type",
];

interface HostTooltipProps {
  host: Host;
  hostMetric: HostMetricEnumType;
  hostColor: string;
  position: { x: number; y: number };
}

function HostTooltip({
  host,
  hostMetric,
  hostColor,
  position,
}: HostTooltipProps): React.JSX.Element {
  const hexDiv = (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        backgroundColor: hostColor,
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        margin: "0 auto 12px",
      }}
    />
  );
  return (
    <Box
      sx={{
        position: "fixed",
        top: position.y + 10,
        left: position.x + 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "12px",
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 1000,
        maxWidth: "250px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {hexDiv}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: "bold", marginBottom: "8px" }}
      >
        Host Metric: {host[hostMetric]}
      </Typography>
      {dimensionsToDisplay.map((dimension) => (
        <Typography
          key={dimension}
          variant="body2"
          sx={{ marginBottom: "4px" }}
        >
          <strong>{hostDimensionLabels[dimension]}:</strong> {host[dimension]}
        </Typography>
      ))}
      {metricsToDisplay.map((metric) => (
        <Typography key={metric} variant="body2" sx={{ marginBottom: "4px" }}>
          <strong>{hostMetricLabels[metric]}:</strong> {host[metric].toFixed(2)}
        </Typography>
      ))}
      <Typography variant="body2" sx={{ marginTop: "8px" }}>
        Last Seen At: {new Date(host.last_seen_at).toLocaleString()}
      </Typography>
    </Box>
  );
}

export default HostTooltip;
