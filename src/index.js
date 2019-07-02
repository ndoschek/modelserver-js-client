const WebSocket = require('ws');

const ws = new WebSocket("ws://localhost:8081/api/v1/model/SuperBrewer3000.json", {
  perMessageDeflate: false
});

let sessionId;

ws.on('open', () => console.log("client connected"));
ws.on('message', data => {
  const obj = JSON.parse(data)
  if (obj.sessionId) { 
    sessionId = obj.sessionId;
    console.log('Created session: ', sessionId)
  } else {
    console.log("Received: ", obj);
  }
});
