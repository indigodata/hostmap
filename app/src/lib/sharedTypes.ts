import { HostDimensionEnum, HostMetricEnum } from "./dataCatalogue";

type HostDimensionEnumType = keyof typeof HostDimensionEnum;
type HostMetricEnumType = keyof typeof HostMetricEnum;
type HostFilterType = Partial<Record<HostDimensionEnumType, string[]>>;

type HostDimensions = {
  [key in HostDimensionEnum]: string;
};

type HostMetrics = {
  [key in HostMetricEnum]: number;
};

interface Host extends HostDimensions, HostMetrics {}

interface OrderedGroupSizes {
  [key: string]: number;
}

type DimFilterValues = Partial<
  Record<HostDimensionEnumType, OrderedGroupSizes>
>;

export type {
  Host,
  HostDimensionEnumType,
  DimFilterValues,
  HostFilterType,
  HostMetricEnumType,
  OrderedGroupSizes,
};
