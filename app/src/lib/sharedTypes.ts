
enum HostDimensionEnum {
  peer_id = 'peer_id',
  peer_ip = 'peer_ip',
  peer_region = 'peer_region',
  peer_country = 'peer_country',
  peer_os = 'peer_os',
  peer_client_type = 'peer_client_type',
  peer_client_version = 'peer_client_version',
  last_seen_at = 'last_seen_at',
};

enum HostMetricEnum {
  avg_propogation_rate = 'avg_propogation_rate',
  avg_propogation_rate_2w = 'avg_propogation_rate_2w',
  avg_confirmed_distinct_tx_per_minute = 'avg_confirmed_distinct_tx_per_minute',
};

type HostDimensionEnumType = keyof typeof HostDimensionEnum;
type HostMetricEnumType = keyof typeof HostMetricEnum;

type HostDimensions = {
  [key in HostDimensionEnum]: string;
}

type HostMetrics = {
  [key in HostMetricEnum]: number;
}

interface Host extends HostDimensions, HostMetrics {};

interface OrderedGroupSizes {
  [key: string]: number;
};

export type {
  Host,
  HostDimensionEnumType,
  HostMetricEnumType,
  OrderedGroupSizes
};
