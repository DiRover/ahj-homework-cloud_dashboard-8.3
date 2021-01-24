export default class API {
    constructor(url) {
      this.url = url;
    }
  
    getWebSocket() {
      return new WebSocket(this.url);
    }

    createRequest() {
        const data = {type:'create'}
    }
  
    
  }