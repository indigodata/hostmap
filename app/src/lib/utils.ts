import { Host, HostDimensionEnumType, OrderedGroupSizes } from "./sharedTypes";

const getOrderedGroupSizes = (
  hosts: Host[],
  groupBy: HostDimensionEnumType
): OrderedGroupSizes => {
  const groupSizes: OrderedGroupSizes = hosts.reduce((acc, host) => {
    // acc stands for accumulator, which is an object that accumulates the group sizes
    const groupKey: string = host[groupBy];
    if (!acc[groupKey]) {
      acc[groupKey] = 0;
    }
    acc[groupKey] += 1;
    return acc;
  }, {} as OrderedGroupSizes);

  // Convert the object to an array of [key, value] pairs, sort it, and create a new object from the sorted pairs
  const sortedGroupSizes = Object.fromEntries(
    Object.entries(groupSizes).sort(([, a], [, b]) => b - a)
  );

  return sortedGroupSizes;
};

export function calculateScaledHostSize(
  totalHosts: number,
  hostGroups: OrderedGroupSizes,
  minBuffer: number,
  maxWidth: number,
  maxHeight: number
) {
  const totalArea = maxWidth * maxHeight;
  const hostGroupEntries = Object.entries(hostGroups);

  let topTwoGroupWidth = 0;

  if (hostGroupEntries.length === 0) {
    return maxWidth;
  } else if (hostGroupEntries.length === 1) {
    topTwoGroupWidth = Math.ceil(Math.sqrt(hostGroupEntries[0][1])) + minBuffer;
  } else {
    topTwoGroupWidth =
      Math.ceil(Math.sqrt(hostGroupEntries[0][1])) +
      Math.ceil(Math.sqrt(hostGroupEntries[1][1])) +
      minBuffer;
  }

  const hexWidth = maxWidth / topTwoGroupWidth;
  const hexagonArea = totalArea / totalHosts;

  const hexagonSize = Math.sqrt(hexagonArea / 0.866);
  const finalHexSize = Math.min(hexWidth, hexagonSize);

  return Math.floor(finalHexSize);
}

export { getOrderedGroupSizes };
