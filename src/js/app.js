import API from './api';
import widget from './widget';
import instancesList from './instancesList';
import createMsg from './createMsg';


const instancesBox = document.querySelector('.instances');
const addInstancesButton = document.querySelector('.add-instances-button');
const worklog = document.querySelector('.worklog');
//два элемента ниже необходимы для автоматической прокрутки списков серверов и лога вниз
const instancesContainer = document.querySelector('.container-instances');
const worklogContainer = document.querySelector('.container-worklog');

const url = 'ws://localhost:7070/ws';
const api = new API(url);
let ws = api.getWebSocket();

addInstancesButton.addEventListener('click', () => {//добавление сервера
    console.log('ok');
    if (ws.readyState === WebSocket.OPEN) {
      api.createRequest('create')
      ws.send(api.request); //создаём и отправляем объект запроса на создание инстанса
      } else {
      ws = api.getWebSocket(); // Reconnect
    }
});

instancesBox.addEventListener('click', (e) => { //обрабатываем события кликов на кнопках серверов
  const target = e.target;
  const id = target.parentElement.parentElement.id;
  if (target.hasAttribute('data-action')) {//для кнопок start/stop
    console.log(id); //передаём название кнопки и id сервера
    api.createRequest(target.textContent, id);
    ws.send(api.request);
  } else if (target.hasAttribute('data-clear')) { //обрабатываем кнопку удаление сервера 
    api.createRequest(target.textContent, id);
    ws.send(api.request);
  }
})

ws.addEventListener('open', () => {
  console.log('connected');
  api.createRequest('get list'); //запрашиваем список серверов при первом же соединениии
  ws.send(api.request);
});

ws.addEventListener('message', (e) => {
  console.log(e.data);
  api.responseHandler(e)
  if (api.response.type === 'server info') { //получем сообщения для ворклога
    createMsg(worklog, api.getDate(), api.response.id, api.response.msg); //рисуем его
    worklogContainer.scrollBy(0, 9999999);//прокручиваем лог вниз
  }  else if (api.response.type === 'list') {//получаем существующие сервера
    instancesList(instancesBox, api.response.list, widget);//рисуем их
    instancesContainer.scrollBy(0, 9999999);//прокручиваем список серверов вниз
  } else if (api.response.type === 'new instance') {//получаем новый сервер
    widget(instancesBox, api.response.id, api.response.status);//создаём виджет сервера
    instancesContainer.scrollBy(0, 9999999);//прокручиваем список серверов вниз
    createMsg(worklog, api.getDate(), api.response.id, api.response.msg);//и записываем в лог
    worklogContainer.scrollBy(0, 9999999);//прокручиваем лог вниз
  } else if (api.response.type === 'run') {//получаем инфу о запуске сервера
    const targetInstance = document.getElementById(api.response.id);//получем виджет запущено сервера
    targetInstance.innerHTML = '';//чистим его
    createMsg(worklog, api.getDate(), api.response.id, api.response.msg);//записываем лог
    worklogContainer.scrollBy(0, 9999999);//прокручиваем лог вниз
    targetInstance.innerHTML = widget(targetInstance, api.response.id, api.response.status, true);//перерисовываем виджет теперь раннинг
  } else if (api.response.type === 'stop') { //получаем инфу о стопе сервера
    const targetInstance = document.getElementById(api.response.id);//получем виджет остановленного сервера
    targetInstance.innerHTML = '';//чистим его
    createMsg(worklog, api.getDate(), api.response.id, api.response.msg);//записываем лог
    worklogContainer.scrollBy(0, 9999999);//прокручиваем лог вниз
    targetInstance.innerHTML = widget(targetInstance, api.response.id, api.response.status, true);//перерисовываем виджет теперь стоппед
  } else if (api.response.type === 'kill') { //получаем инфу о удалении сервера
    createMsg(worklog, api.getDate(), api.response.id, api.response.msg);//записываем лог
    worklogContainer.scrollBy(0, 9999999);//прокручиваем лог вниз
    const targetInstance = document.getElementById(api.response.id);//получем виджет удаляемого сервера
    console.log(targetInstance);
    instancesBox.removeChild(targetInstance);//удаляем виджет удалённого сервера
  }
});

ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
});

ws.addEventListener('error', () => {
  console.log('error');
});
