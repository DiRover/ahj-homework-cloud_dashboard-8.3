export default class API {
    constructor(url) {
      this.url = url;
      this.response; //записываем ответ сервера
      this.request; //записываем запрос на сервер
    }
  
    getWebSocket() {
      return new WebSocket(this.url);
    }

    createRequest(type, id) {
      if (type === 'get list') { //запрашиваем список серверов
        this.request = JSON.stringify({type: 'get list'});
      } else if (type === 'create') { //создаём сервер
        this.request = JSON.stringify({type: 'create'});
      } else if (type === 'pause') {//останавливаем сервер
        this.request = JSON.stringify({type: 'pause', id: id});
      } else if (type === 'play_arrow') {//запускам сервер
        this.request = JSON.stringify({type: 'play_arrow', id: id});
      } else if (type === 'clear') {//удаляем сервер
        this.request = JSON.stringify({type: 'clear', id: id});
      }
    }

    responseHandler(e) {//обрабатываем ответ
      this.response = JSON.parse(e.data);
    }

    getDate() { //получаем текущею дату сообщения
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const now = hour + ':' + minutes + ':' + seconds + ' ' + day + '.' + month + '.' + year;
      return now; 
    }

  }