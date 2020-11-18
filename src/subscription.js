const WebSocket = require('ws');

const subscribe = modeluri => {

  if (!modeluri) {
    console.error('ERROR: No model URI given');
    return;
  }

  let logCount = 0;

  const ws = new WebSocket(`ws://localhost:8081/api/v1/subscribe?modeluri=${modeluri}`, {
    perMessageDeflate: false
  });
  ws.on('open', () => console.log('client connected'));
  ws.on('message', data => {
    const obj = JSON.parse(data);
    if (obj.sessionId) {
      sessionId = obj.sessionId;
      console.log(logCount++ + 'SessionId:', sessionId)
    } else {
      console.log(logCount++ + ' Received: ', obj.type, ' Data: ', obj.data);
    }
  });
  ws.on('close', (code, reason) => {
    if (reason === '' && code === 1006) {
      reason = 'Server shutdown';
    }
    console.log('Session closed:', code, " ", reason);
  });
  ws.on('error', (error) => {
    console.log('Session errored: ', error);
  })
  return ws;
};

subscribe(process.argv[2])
