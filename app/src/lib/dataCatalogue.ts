enum HostDimensionEnum {
  peer_id = "peer_id",
  peer_ip = "peer_ip",
  peer_region = "peer_region",
  peer_country = "peer_country",
  peer_os = "peer_os",
  peer_client_type = "peer_client_type",
  peer_client_version = "peer_client_version",
  last_seen_at = "last_seen_at",
}

enum HostMetricEnum {
  avg_propogation_rate = "avg_propogation_rate",
  avg_propogation_rate_2w = "avg_propogation_rate_2w",
  avg_confirmed_distinct_tx_per_minute = "avg_confirmed_distinct_tx_per_minute",
}

const hostMetricLabels: Record<HostMetricEnum, string> = {
  avg_propogation_rate: "Avg Propagation Rate",
  avg_propogation_rate_2w: "Avg Propagation Rate (2w)",
  avg_confirmed_distinct_tx_per_minute: "Pre-Conf Txns per Minute",
};

const hostDimensionLabels: Record<HostDimensionEnum, string> = {
  peer_id: "Peer ID",
  peer_ip: "Peer IP",
  peer_region: "Region",
  peer_country: "Country",
  peer_os: "Operating System",
  peer_client_type: "Client",
  peer_client_version: "Client Version",
  last_seen_at: "Last Seen At",
};

export {
  HostDimensionEnum,
  HostMetricEnum,
  hostDimensionLabels,
  hostMetricLabels,
};
