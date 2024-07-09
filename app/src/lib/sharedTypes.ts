import { HostDimensionEnum, HostMetricEnum } from './dataCatalogue';

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
