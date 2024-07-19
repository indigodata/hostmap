import React, { useState } from 'react';
import { Host, HostMetricEnumType } from '../lib/sharedTypes';
import HostTooltip from './HostTooltip';

interface HexagonGridProps {
  hosts: Host[];
  scaledHostSize: number;
  getColorForRate: (rate: number, quintiles: number[]) => string;
  hostMetric: HostMetricEnumType;
  metricQuintiles: number[];
}

function HexagonGrid({ hosts, scaledHostSize, getColorForRate, hostMetric, metricQuintiles }: HexagonGridProps) {
  const [hoveredHost, setHoveredHost] = useState<Host | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredColor, setHoveredColor] = useState<string>('');

  const hexagonMarginPercentage = 0.05;
  
  const hexagonSize = scaledHostSize;
  const hexagonMargin = hexagonSize * hexagonMarginPercentage;
  const nodesPerRow = Math.max(3, Math.ceil(Math.sqrt(hosts.length)));

  const handleMouseEnter = (host: Host, event: React.MouseEvent) => {
    const color = getColorForRate(host[hostMetric], metricQuintiles);
    setHoveredHost(host);
    setMousePosition({ x: event.clientX, y: event.clientY });
    setHoveredColor(color);
  };

  const handleMouseLeave = () => {
    setHoveredHost(null);
  };

  const hexDiv = (host: Host, size: number | string) => {
    return (
      <div
        key={host.peer_id}
        onMouseEnter={(event) => handleMouseEnter(host, event)}
        onMouseLeave={handleMouseLeave}
        style={{
          width: size,
          height: size,
          backgroundColor: getColorForRate(host[hostMetric], metricQuintiles),
          margin: `${hexagonMargin}px`,
          position: 'relative',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,              
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: `${hexagonSize / 2}px`,
      }}
    >
      {Array.from({ length: Math.ceil(hosts.length / nodesPerRow) }, (_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: 'flex',
            marginTop: rowIndex === 0 ? 0 : `calc(-${hexagonSize / 4}px)`,
            transform: rowIndex % 2 === 1 ? `translateX(calc(${hexagonSize / 2}px + ${hexagonMargin}px))` : 'none',
          }}
        >
          {hosts.slice(rowIndex * nodesPerRow, rowIndex * nodesPerRow + nodesPerRow).map((host) => (
            hexDiv(host, hexagonSize)
          ))}
        </div>
      ))}
      {hoveredHost && (
        <HostTooltip
          host={hoveredHost}
          hostMetric={hostMetric}
          hostColor={hoveredColor}
          position={mousePosition}
        />
      )}
    </div>
  );
}

export default HexagonGrid;