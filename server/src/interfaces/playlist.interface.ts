import { Document } from 'mongoose';

export interface Playlist extends Document {
  playlistId: number;
  name: string;
}
