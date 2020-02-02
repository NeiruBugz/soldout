export interface TrackInterface {
  id: number;
  name: string;
  artist: {
    id: number;
    name: string;
  };
  src: string;
}

export interface TrackForGameInterface {
  id: number;
  name: string;
  artist: string;
}
