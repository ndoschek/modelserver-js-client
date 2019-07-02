const fetch = require('node-fetch');
const body = require('./model');

const fakeModify = (sessionId) => {

  if (!sessionId) {
    console.error("ERROR: No session ID given");
    return;
  }

  fetch(`http://localhost:8081/api/v1/model/SuperBrewer3000.json/${sessionId}`, {
    method: "patch",
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => {
    return resp.json()
  })
    .then(json => console.log(json))
}

fakeModify(process.argv[2])
