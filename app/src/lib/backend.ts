import axios from 'axios';

import { API_BASE_PATH } from '../conf';
import { Host } from './sharedTypes';

export default class Client {
  url: string;

  constructor() {
    this.url = API_BASE_PATH;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getHosts(): Promise<Host[]> {
    const url = this.url + '/Prod/hosts';
    console.log("Fetching hosts from:", url);
    const resp = await axios.get(url);
    return resp.data;
  }
}
