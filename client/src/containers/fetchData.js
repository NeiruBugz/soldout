import io from "socket.io-client";

const putPlayList = () => {
  const socket = io("ws://127.0.0.1:3000", { transports: ["websocket"] });
  const playlistId = "5734677122";
  socket.emit("start", { playlistId });
  socket.on("tracks", message => {
    console.log("Message from server ", message);
  });
};

export default putPlayList;
