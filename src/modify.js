const fetch = require('node-fetch');
const { data } = require('./model');

const fakeModify = (modeluri) => {
  fetch(`http://localhost:8081/api/v1/models?modeluri=${modeluri}`, {
    method: "patch",
    body: JSON.stringify({ data }),
    headers: { 'Content-Type': 'application/json' },
  }).then(resp => {
    return resp.json()
  })
    .then(json => console.log(json))
}

fakeModify(process.argv[2]);
