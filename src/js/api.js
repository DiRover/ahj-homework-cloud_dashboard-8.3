export default class API {
    constructor(url) {
      this.url = url;
      this.response;
      this.request;
      this.instancesList;
      this.currentInstaceId;
      this.serverInfoMsg;
      this.currentInstaceStatus;
    }
  
    getWebSocket() {
      return new WebSocket(this.url);
    }

    createRequest(type, id) {
      if (type === 'get list') {
        this.request = JSON.stringify({type: 'get list'});
      } else if (type === 'create') {
        this.request = JSON.stringify({type: 'create'});
      } else if (type === 'pause') {
        this.request = JSON.stringify({type: 'pause', id: id});
      } else if (type === 'play_arrow') {
        this.request = JSON.stringify({type: 'play_arrow', id: id});
      } else if (type === 'clear') {
        this.request = JSON.stringify({type: 'clear', id: id});
      }
    }

    responseHandler(e) {
      this.response = JSON.parse(e.data);
      if (this.response.type === 'list') {
        this.instancesList = this.response.list;
        console.log(this.instancesList);
      } else if (this.response.type === 'server info') {
        this.currentInstaceId = this.response.id;
        this.currentInstaceMsg = this.response.msg;
      } else if (this.response.type === 'new instance') {
        this.currentInstaceId = this.response.id;
        this.currentInstaceStatus = this.response.status;
        this.currentInstaceMsg = this.response.msg;
      } else if (this.response.type === 'run') {
        this.currentInstaceId = this.response.id;
        this.currentInstaceStatus = this.response.status;
        this.currentInstaceMsg = this.response.msg;
      } else if (this.response.type === 'stop') {
        this.currentInstaceId = this.response.id;
        this.currentInstaceStatus = this.response.status;
        this.currentInstaceMsg = this.response.msg;
      } else if (this.response.type === 'kill') {
        this.currentInstaceId = this.response.id;
        this.currentInstaceStatus = this.response.status;
        this.currentInstaceMsg = this.response.msg;
      }
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