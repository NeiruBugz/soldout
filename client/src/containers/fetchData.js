const API_URL = "https://gts.dergunov.net/api";

const fetchPlaylist = () =>
  fetch(`${API_URL}/playlist`).then(res => res.json());

export default fetchPlaylist;
