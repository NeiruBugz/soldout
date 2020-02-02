export interface DeezerApiUser {
  id: number;
  name: string;
  tracklist: string;
  type: 'user';
}

export interface DeezerApiAlbum {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  title: string;
  tracklist: string;
  type: 'album';
}

export interface DeezerApiArtist {
  id: number;
  link: string;
  name: string;
  tracklist: string;
  type: 'artist';
}

export interface DeezerApiTrack {
  album: DeezerApiAlbum;
  artist: DeezerApiArtist;
  duration: number;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  id: number;
  link: string;
  preview: string;
  rank: number;
  readable: boolean;
  time_add: number;
  title: string;
  title_short: string;
  title_version: string;
  type: string;
}

export interface DeezerApiTracks {
  checksum: '858f62a9ae1ae6baf137be4e0a20c091';
  data: DeezerApiTrack[];
}

export interface DeezerApiPlaylist {
  checksum: string;
  collaborative: boolean;
  creation_date: string;
  creator: DeezerApiUser;
  description: string;
  duration: number;
  fans: number;
  id: number;
  is_loved_track: boolean;
  link: string;
  nb_tracks: number;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  public: boolean;
  share: string;
  title: string;
  tracklist: string;
  tracks: DeezerApiTracks;
  type: 'playlist';
}
