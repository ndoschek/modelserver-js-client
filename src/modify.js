const fetch = require('node-fetch');
const body = require('./model');

const fakeModify = () => {

  fetch(`http://localhost:8081/api/v1/models/SuperBrewer3000.json/`, {
    method: 'patch',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => {
    return resp.json()
  })
    .then(json => console.log(json))
}

fakeModify()
