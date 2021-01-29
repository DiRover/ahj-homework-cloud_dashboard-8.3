import API from './api';
import widget from './widget';
import instancesList from './instancesList';
import createMsg from './createMsg';
import widgetChanged from './widgetChanged';



const instancesBox = document.querySelector('.instances');
const addInstancesButton = document.querySelector('.add-instances-button');
const worklog = document.querySelector('.worklog');

const url = 'ws://localhost:7070/ws';
const api = new API(url);
let ws = api.getWebSocket();

addInstancesButton.addEventListener('click', () => {
    console.log('ok');
    if (ws.readyState === WebSocket.OPEN) {
      api.createRequest('create')
      ws.send(api.request); //создаём и отправляем объект запроса на создание инстанса
      } else {
      ws = api.getWebSocket(); // Reconnect
    }
});

instancesBox.addEventListener('click', (e) => {
  const target = e.target;
  const id = target.parentElement.parentElement.id;
  if (target.hasAttribute('data-action')) {
    console.log(id);
    api.createRequest(target.textContent, id);
    ws.send(api.request);
  } else if (target.hasAttribute('data-clear')) {
    //console.log(target.textContent, id);
    api.createRequest(target.textContent, id);
    ws.send(api.request);
  }
})

ws.addEventListener('open', () => {
  console.log('connected');
  api.createRequest('get list')
  ws.send(api.request);
});

ws.addEventListener('message', (e) => {
  console.log(e.data);
  api.responseHandler(e)
  if (api.response.type === 'server info') {
    createMsg(worklog, api.getDate(), api.currentInstaceId, api.currentInstaceMsg);
  }  else if (api.response.type === 'list') {
    instancesList(instancesBox, api.instancesList, widget);
  } else if (api.response.type === 'new instance') {
    widget(instancesBox, api.currentInstaceId, api.currentInstaceStatus);
    createMsg(worklog, api.getDate(), api.currentInstaceId, api.currentInstaceMsg);
  } else if (api.response.type === 'run') {
    const targetInstance = document.getElementById(api.currentInstaceId);
    targetInstance.innerHTML = '';
    targetInstance.innerHTML = widgetChanged(targetInstance, api.currentInstaceId, api.currentInstaceStatus);
  } else if (api.response.type === 'stop') {
    const targetInstance = document.getElementById(api.currentInstaceId);
    targetInstance.innerHTML = '';
    targetInstance.innerHTML = widgetChanged(targetInstance, api.currentInstaceId, api.currentInstaceStatus);
  } else if (api.response.type === 'kill') {
    const targetInstance = document.getElementById(api.currentInstaceId);
    console.log(targetInstance);
    instancesBox.removeChild(targetInstance);
  }
});

ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
});

ws.addEventListener('error', () => {
  console.log('error');
});
