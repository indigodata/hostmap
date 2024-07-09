import React from 'react';
import { Typography } from '@mui/material';
import { Host, HostMetricEnumType } from '../lib/sharedTypes';

interface HostTooltipProps {
  host: Host;
  hostMetric: HostMetricEnumType;
  hostColor: string;
  position: { x: number; y: number };
}

function HostTooltip({ host, hostMetric, hostColor, position}: HostTooltipProps) {
  const hexDiv = (size: string) => (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: hostColor,
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px',
      }}
    />
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y + 10,
        left: position.x + 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        pointerEvents: 'none',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {hexDiv('30px')}
      <Typography variant="body2">Host Metric: {host[hostMetric]}</Typography>
    </div>
  );
}

export default HostTooltip;