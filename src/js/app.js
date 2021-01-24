import API from './api';
import widget from './widget';

const instancesBox = document.querySelector('.instances');
const addInstancesButton = document.querySelector('.add-instances-button');
const worklog = document.querySelector('.worklog');

const url = 'ws://localhost:7070/ws';
const api = new API(url);
let ws = api.getWebSocket();

addInstancesButton.addEventListener('click', () => {
    console.log('ok');
})

ws.addEventListener('open', () => {
  console.log('connected');
  ws.send('hello');
});

ws.addEventListener('message', (evt) => {
  console.log(evt);
});

ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
});

ws.addEventListener('error', () => {
  console.log('error');
});
