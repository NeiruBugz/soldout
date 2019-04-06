import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getChart(): Promise<any> {
    return axios.get('https://api.deezer.com/chart');
  }

  getPlaylist(id: number) {
    return axios.get(`https://api.deezer.com/playlist/${id}`);
  }

  getTrack(id: number) {
    return axios.get(`https://api.deezer.com/track/${id}`);
  }

}
