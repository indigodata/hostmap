enum HostDimensionEnum {
  peer_id = "peer_id",
  peer_ip = "peer_ip",
  peer_port = "peer_port",
  peer_region = "peer_region",
  peer_country = "peer_country",
  peer_city = "peer_city",
  peer_os = "peer_os",
  peer_client_type = "peer_client_type",
  peer_rlp_protocol_version = "peer_rlp_protocol_version",
  peer_capabilities = "peer_capabilities",
  peer_client_version = "peer_client_version",
  peer_runtime_version = "peer_runtime_version",
  in_sync = "in_sync",
  upgraded_at = "upgraded_at",
  last_seen_at = "last_seen_at",
}

enum HostMetricEnum {
  avg_propogation_rate = "avg_propogation_rate",
  avg_propogation_rate_2w = "avg_propogation_rate_2w",
  max_propogation_rate_2w = "max_propogation_rate_2w",
  avg_confirmed_distinct_tx_per_minute = "avg_confirmed_distinct_tx_per_minute",
  avg_sync_lag = "avg_sync_lag",
  avg_sync_lag_2w = "avg_sync_lag_2w",
}

const hostMetricLabels: Record<HostMetricEnum, string> = {
  avg_propogation_rate: "Avg Propagation Rate",
  avg_propogation_rate_2w: "Avg Propagation Rate (2w)",
  max_propogation_rate_2w: "Max Propagation Rate (2w)",
  avg_confirmed_distinct_tx_per_minute: "Pre-Conf Txns per Minute",
  avg_sync_lag: "Avg Sync Lag",
  avg_sync_lag_2w: "Avg Sync Lag (2w)",
};

const hostDimensionLabels: Record<HostDimensionEnum, string> = {
  peer_id: "Peer ID",
  peer_ip: "Peer IP",
  peer_port: "Peer Port",
  peer_region: "Region",
  peer_country: "Country",
  peer_city: "City",
  peer_os: "Operating System",
  peer_client_type: "Client",
  peer_rlp_protocol_version: "RLP Protocol Version",
  peer_capabilities: "Capabilities",
  peer_client_version: "Client Version",
  peer_runtime_version: "Runtime Version",
  in_sync: "In Sync",
  upgraded_at: "Upgraded At",
  last_seen_at: "Last Seen At",
};

export {
  HostDimensionEnum,
  HostMetricEnum,
  hostDimensionLabels,
  hostMetricLabels,
};
