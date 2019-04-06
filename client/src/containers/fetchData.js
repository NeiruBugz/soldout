const playlistId = "5734677122";

const putPlayList = () => {
  const socket = new WebSocket("ws://gts.dergunov.net:3000");
  socket.addEventListener("open", event => {
    socket.send(JSON.stringify({ events: "events", data: "Hello pidor" }));
  });

  socket.addEventListener("message", event => {
    console.log("Message from server ", event.data);
  });
};

export default putPlayList;
