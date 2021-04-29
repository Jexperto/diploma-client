import {
    currentQuestionDispatch,
    roomDispatch,
    joinDispatch,
    pointsDispatch,
    questionDispatch,
    roundDispatch,
    errorDispatch,
    teamDispatch,
    timerDispatch,
    userDispatch,
    userJoinTeamDispatch,
    teamAnswerDispatch
} from "./store/actions/messageActions";

class Connection {
    #address;
    #mode;
    #props

    constructor(endpoint, dispatch, address = "localhost:8080", secure = false) {
        let ws = "ws"
        if (secure)
            ws = "wss"
        this.socket = new WebSocket(`${ws}://${address}/${endpoint}`)
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onclose = this.onclose
        this.socket.onerror = this.onerror
        this.dispatch = dispatch
        this.#mode = endpoint
    }

    onopen = (e) => {
        console.log("WebSocket is open now with address: " + this.socket.url);
    }
    onmessage = (e) => {
        const data = e.data;
        const obj = (JSON.parse(data));
        console.log("Received\n" + obj)
        const store = this.#props[obj.type];
        switch (this.#mode) {
            case "admin": {
                switch (obj.type) {
                    case "create": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "join": {
                        return;
                    }
                    case "add_question": {
                        this.dispatch(questionDispatch(obj.question_id,store.question,store.answer));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "start": {
                        this.dispatch(roundDispatch(obj.num));
                        this.dispatch(timerDispatch(store.timer));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "pl_con": {
                        this.dispatch(userDispatch(obj.pl_id,obj.nick,obj.team_id));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "ans": {
                        this.dispatch(currentQuestionDispatch(obj.question_id,JSON.parse(obj.answers),undefined,obj.team_id));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "tres": {
                        this.dispatch(teamAnswerDispatch(obj.team,obj.question_id,obj.correct));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "pupd": {
                        this.dispatch(pointsDispatch(obj.team_id,obj.value));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "rend": {
                        this.dispatch(roundDispatch(-obj.num));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                }
                break;
            }
            case "user": {
                switch (obj.type) {
                    case "join": {
                        this.dispatch(joinDispatch(store.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "get_t": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "join_t": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "wr_qst": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "timer_elapsed": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "rend": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "ans": {
                        this.dispatch(roomDispatch(obj.code, obj.admin_id, store.nick));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                }
                break;
            }
        }

    }
    onclose = (e) => {
        console.log(`Connection closed with code ${e.code} and it was${e.wasClean ? "" : "n't"} clean`);
    }
    onerror = (e) => {
        console.error("WebSocket error observed:", e);
    }

    connectUser() {

    }

    connectAdmin() {

    }

    sendMessage(type, props) {
        switch (this.#mode) {
            case "admin": {
                switch (type) {
                    case "create": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({type: type, nick: props.nick}))
                        return;
                    }
                    case "join": {
                        this.#props[type] = {admin_id: props.admin_id}
                        this.socket.send(JSON.stringify({type: type, admin_id: props.admin_id}))
                        return;
                    }
                    case "add_question": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            question: props.question,
                            answer: props.answer
                        }))
                        return;
                    }
                    case "start": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            num: props.num,
                            timer: props.timer
                        }))
                        return;
                    }
                    case "close": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({type: type}))
                        this.socket.close()
                        return;
                    }
                }
                return;
            }
            case "user": {
                switch (type) {
                    case "join": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            nick: props.nick,
                            code: props.code
                        }))
                        return;
                    }
                    case "get_t": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({type: type,}))
                        return;
                    }
                    case "join_t": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            team_id: props.team_id
                        }))
                        return;
                    }
                    case "wr_ans": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            pl_id: props.pl_id,
                            question_id: props.question_id,
                            string: props.string
                        }))
                        return;
                    }


                    case "r_ans": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            pl_id: props.pl_id,
                            question_id: props.question_id,
                            answer_id: props.answer_id
                        }))
                        return;
                    }
                }
            }
        }


    }
}

export default Connection;
