export interface Track {
  name: string;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    album_type: string;
    release_date: string;
  };
  track_number: number;
}
