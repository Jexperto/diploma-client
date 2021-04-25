class Connection {
    #address = "0.0.0.0"
    #mode = ""
    constructor(endpoint, address=this.#address, secure=false) {
        let ws="ws"
        if (secure)
            ws="wss"
        this.socket = new WebSocket(`${ws}://${address}/${endpoint}`)
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onclose = this.onclose
        this.socket.onerror = this.onerror
        this.endpoint = endpoint
    }
    onopen = (e) =>{

    }
    onmessage = (e) =>{

    }
    onclose = (e) =>{

    }
    onerror = (e) =>{

    }

    connectUser(){

    }
    connectAdmin(){

    }

    sendMessage(type, props) {
        switch (type) {
            case "create":
                return;
            case "join":
                return;
            case "add_question":
                return;
            case "start":
                return;
            case "close":
                return;
            case "get_t":
                return;
            case "join_t":
                return;
            case "wr_ans":
                return;
            case "r_ans":
                return;
        }


    }
}
