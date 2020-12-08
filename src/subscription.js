const WebSocket = require('ws');

const log = logMsg => {
  const now = new Date(Date.now());
  console.log(now.toLocaleString() + ' | ' + logMsg);
}

const subscribe = (modeluri, timeout) => {

  if (!modeluri) {
    console.error('ERROR: No model URI given');
    return;
  }

  const ws = new WebSocket(`ws://localhost:8081/api/v1/subscribe?modeluri=${modeluri}&timeout=${timeout}`, { perMessageDeflate: false });

  var interval;
  var modificationCount = 0;

  ws.on('open', () => {
    log('client connected');
    interval = setInterval(function () {
      log('ping server to keepalive');
      ws.send(JSON.stringify({ type: 'keepAlive', data: '' }));
    }, timeout - 1000);
  });

  ws.on('message', data => {
    log(data)
    const obj = JSON.parse(data);
    log('Received: ' + obj.type + ' Data: ' + obj.data);
    if (obj.type === 'fullUpdate') {
      modificationCount++;
      if (modificationCount > 2) {
        ws.close();
        return;
      }
    }
  });

  ws.on('close', (code, reason) => {
    clearInterval(interval);
    if (reason === '' && code === 1006) {
      reason = 'Server shutdown';
    }
    log('Session closed:' + code + ' ' + reason);
  });

  ws.on('error', (error) => {
    clearInterval(interval);
    log('Session errored: ' + error);
  })

  return ws;
};

subscribe(process.argv[2], process.argv[3] ? process.argv[3] : 300000)
