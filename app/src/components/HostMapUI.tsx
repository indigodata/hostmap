import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import HexagonGrid from "./HexagonGrid";
import Dropdown from "./Dropdown";
import Client from "../lib/backend";
import {
  Host,
  HostDimensionEnumType,
  HostMetricEnumType,
  OrderedGroupSizes,
} from "../lib/sharedTypes";
import { newHostGroups, calculateScaledHostSize } from "../lib/utils";
import { hostDimensionLabels, hostMetricLabels } from "../lib/dataCatalogue";

function HostMapUI(): React.JSX.Element {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [scaledHostSize, setScaledHostSize] = useState<number>(0);
  const [groupBy, setGroupBy] = useState<HostDimensionEnumType>("peer_region");
  const [hostMetric, setHostMetric] = useState<HostMetricEnumType>(
    "avg_propogation_rate"
  );
  const [orderedGroupSizes, setOrderedGroupSizes] = useState<OrderedGroupSizes>(
    {}
  );
  const [metricQuintiles, setMetricQuintiles] = useState<number[]>([]);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const minBuffer = 20; // Pixels between groups
  const client = new Client();

  useEffect(() => {
    const fetchHosts = async () => {
      const fetchedHosts: Host[] = await client.getHosts();
      setHosts(fetchedHosts);
    };
    fetchHosts();
  }, []);

  // Effects Triggered by GroupBy state change
  // (1) Calculate the Host count by the new groupBy dimension
  // (2) Calculate the new scaled host size
  useEffect(() => {
    if (hosts === undefined || hosts.length === 0) {
      console.log("No hosts available yet");
      return;
    }

    const orderedGroupSizes = newHostGroups(hosts, groupBy);
    const totalHosts = hosts.length;

    const newScaledHostSize = calculateScaledHostSize(
      totalHosts,
      orderedGroupSizes,
      minBuffer,
      screenWidth,
      screenHeight
    );

    setScaledHostSize(newScaledHostSize);
    setOrderedGroupSizes(orderedGroupSizes);
  }, [hosts, groupBy]);

  // Effects Triggered by Host Metric state change
  // (1) Sort hosts by the selected metric
  // (2) Calculate quintiles for color scale
  useEffect(() => {
    if (hosts === undefined || hosts.length === 0) {
      console.log("No hosts available yet");
      return;
    }
    const orderedHosts: Host[] = hosts.sort(
      (a, b) => b[hostMetric] - a[hostMetric]
    );
    setHosts(orderedHosts);

    const metricValuesSorted: number[] = orderedHosts.map(
      (host) => host[hostMetric]
    );

    const hostCount: number = hosts.length;

    const quintiles: number[] = [
      metricValuesSorted[Math.floor(hostCount * 0.1)],
      metricValuesSorted[Math.floor(hostCount * 0.2)],
      metricValuesSorted[Math.floor(hostCount * 0.3)],
      metricValuesSorted[Math.floor(hostCount * 0.4)],
      metricValuesSorted[Math.floor(hostCount * 0.5)],
      metricValuesSorted[Math.floor(hostCount * 0.6)],
      metricValuesSorted[Math.floor(hostCount * 0.7)],
      metricValuesSorted[Math.floor(hostCount * 0.8)],
      metricValuesSorted[Math.floor(hostCount * 0.9)],
    ];
    
    setMetricQuintiles(quintiles);
  }, [hosts, hostMetric]);

  const colorScaleFn = (rate: number, quintiles: number[]) => {
    const quintilesAsc = [...quintiles].sort((a, b) => a - b);
    const colors = ["#d73027", "#fc8d59", "#fee08b", "#d9ef8b", "#1a9850"];
    if (rate <= quintilesAsc[0]) return colors[0];
    if (rate < quintilesAsc[1]) return colors[1];
    if (rate < quintilesAsc[2]) return colors[2];
    if (rate < quintilesAsc[3]) return colors[2];
    if (rate < quintilesAsc[4]) return colors[3];
    if (rate < quintilesAsc[5]) return colors[3];
    if (rate < quintilesAsc[6]) return colors[3];
    if (rate < quintilesAsc[7]) return colors[4];
    if (rate < quintilesAsc[8]) return colors[4];
    return colors[4];
  };

  const handleGroupByChange = (selectedValue: HostDimensionEnumType) => {
    console.log("Group by changed to:", selectedValue);
    setGroupBy(selectedValue);
  };

  const handleHostMetricChange = (selectedValue: HostMetricEnumType) => {
    console.log("Host metric changed to:", selectedValue);
    setHostMetric(selectedValue);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingLeft: "30px",
      }}
    >
      <Dropdown
        label="Group By"
        options={hostDimensionLabels}
        defaultValue="peer_region"
        onChange={handleGroupByChange}
      />
      <Dropdown
        label="Host Metric"
        options={hostMetricLabels}
        defaultValue="avg_propogation_rate"
        onChange={handleHostMetricChange}
      />
      <div
        key="host-groups"
        className="grid-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gridGap: "30px",
        }}
      >
        {Object.keys(orderedGroupSizes).map((groupLabel) => (
          <div key={groupLabel} className="group-item">
            <Typography variant="h6" component="h3" gutterBottom>
              {groupLabel}
            </Typography>

            <HexagonGrid
              hosts={hosts.filter((host) => host[groupBy] === groupLabel) || []}
              scaledHostSize={scaledHostSize}
              getColorForRate={colorScaleFn}
              hostMetric={hostMetric}
              metricQuintiles={metricQuintiles}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostMapUI;
