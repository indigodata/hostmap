import axios from 'axios';
import Papa from 'papaparse';

import { API_BASE_PATH } from '../conf';
import { Host, HostDimensionEnumType, HostMetricEnumType } from './sharedTypes';
import { HostDimensionEnum, HostMetricEnum } from './dataCatalogue';

export default class Client {
  url: string;

  constructor() {
    this.url = API_BASE_PATH;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private parseCsv(csv: string): any[] {
    const result = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.toLowerCase(),
    });

    if (result.errors && result.errors.length > 0) {
      console.warn('CSV parsing errors:', result.errors);
    }

    return result.data;
  }

  private async deserializeHosts(data: ArrayBuffer): Promise<Host[]> {
    const csvString = new TextDecoder().decode(data);
    const records: any[] = this.parseCsv(csvString);

    const hosts: Host[] = records.map(record => {
      const host: Partial<Host> = {};
      Object.entries(record).forEach(([key, value]) => {
        if (key in HostDimensionEnum) {
          host[key as HostDimensionEnumType] = String(value);
        } else if (key in HostMetricEnum) {
          host[key as HostMetricEnumType] = Number(value);
        }
      });
      return host as Host;
    });

    return hosts;
  }

  async getHosts(): Promise<Host[]> {
    const url = this.url + '/Prod/hosts';
    console.log("Fetching hosts");
    const resp = await axios.get(url, { responseType: 'arraybuffer' });
    const hosts = await this.deserializeHosts(resp.data);
    return hosts;
  }
}