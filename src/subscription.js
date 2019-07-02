const WebSocket = require('ws');

const subscribe = sessionId => {

  if (!sessionId) {
    console.error("ERROR: No session ID given");
    return;
  }

  const ws = new WebSocket(`ws://localhost:8081/api/v1/subscribe/${sessionId}`, {
    perMessageDeflate: false
  });
  ws.on('open', () => console.log("client connected"));
  ws.on('message', data => {
    const obj = JSON.parse(data);
    if (obj.sessionId) {
      sessionId = data.sessionId;
      console.log('Subscribed to session: ', sessionId)
    } else {
      console.log("Received: ", obj);
    }
  });
  return ws;
};

subscribe(process.argv[2])
