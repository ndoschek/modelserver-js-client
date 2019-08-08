const fetch = require('node-fetch');
const { data } = require('./model');

const fakeModify = () => {
  fetch(`http://localhost:8081/api/v1/models?modeluri=SuperBrewer3000.coffee`, {
    method: "patch",
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => {
    return resp.json()
  })
    .then(json => console.log(json))
}

fakeModify();
