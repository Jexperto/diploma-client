import {
    currentQuestionDispatch,
    roomDispatch,
    joinDispatch,
    pointsDispatch,
    questionDispatch,
    roundDispatch,
    errorDispatch,
    teamDispatch,
    userQuestionDispatch,
    timerDispatch,
    userDispatch,
    userJoinTeamDispatch,
    teamAnswerDispatch, setUserJoinTeamDispatch
} from "./store/actions/messageActions";

class Connection {
    #address;
    #mode;
    #props = {};
    #secure = false;
    #queue = [];
    #addQuestionCounter = 0;

    constructor(dispatch, address = "localhost:8080", secure = false) {
        this.dispatch = dispatch
        this.#address = address;
        this.#props["add_question"]=[];

    }

    getMode() {
        return this.#mode;
    };

    #setmethods = () => {
        this.socket.onopen = this.onopen
        this.socket.onmessage = this.onmessage
        this.socket.onclose = this.onclose
        this.socket.onerror = this.onerror
    }

    onopen = (e) => {
        console.log("WebSocket is open now with address: " + this.socket.url);
        this.#queue.forEach((value) => {
            this.sendMessage(value.type, value.props)
        })
        this.#queue = [];
    }
    onmessage = (e) => {
        const data = e.data;
        const obj = (JSON.parse(data));
        const store = this.#props[obj.type];
        console.log("Received:", obj)
        if (obj.type === "error") {
            this.dispatch(errorDispatch(obj.err_desc));
            return;
        }
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
                        console.log(store)
                        this.dispatch(questionDispatch(obj.question_id, store[this.#addQuestionCounter].question, store[this.#addQuestionCounter].answer));
                        this.#addQuestionCounter++;
                        //this.#props[obj.type] = undefined;
                        return;
                    }
                    case "add_t": {
                        let teams = {};
                        for (let i = 0; i < obj.team_ids.length; i++) {
                            teams[obj.team_ids[i]] = store.team_names[i];
                        }
                        this.dispatch(teamDispatch(teams));
                        return;
                    }
                    case "start": {
                        this.dispatch(roundDispatch(obj.num));
                        this.dispatch(timerDispatch(store.timer));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "pl_con": {
                        this.dispatch(userDispatch(obj.pl_id, obj.nick, obj.team_id));
                        return;
                    }
                    case "ans": {
                        this.dispatch(currentQuestionDispatch(obj.question_id, obj.answers, undefined, obj.team_id));
                        return;
                    }
                    case "tres": {
                        this.dispatch(teamAnswerDispatch(obj.team, obj.question_id, obj.correct));
                        return;
                    }
                    case "pupd": {
                        this.dispatch(pointsDispatch(obj.team_id, obj.value));
                        return;
                    }
                    case "rend": {
                        this.dispatch(roundDispatch(-obj.num));
                        return;
                    }
                }
                break;
            }
            case "user": {
                switch (obj.type) {
                    case "join": {
                        this.dispatch(joinDispatch(store.code, obj.pl_id, store.nick));
                        this.dispatch(setUserJoinTeamDispatch(obj.players))
                        this.#props["join_t"]= {pl_id:obj.pl_id};
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "pl_con": {
                        this.dispatch(userDispatch(obj.pl_id, obj.nick, obj.team_id));
                        return;
                    }
                    case "get_t": {
                        let teams = {};
                        for (let i = 0; i < obj.teams.length; i++) {
                            teams[obj.teams[i].team_id] = obj.teams[i].team_name;
                        }
                        this.dispatch(teamDispatch(teams));
                        return;
                    }
                    case "join_t": {
                        this.dispatch(userJoinTeamDispatch(store.pl_id, obj.team_id));
                        //this.#props[obj.type] = undefined;
                        return;
                    }
                    case "wr_qst": {
                        // let questions = [];
                        // for (let i = 0; i < obj.questions.length; i++) {
                        //     questions[obj.questions[i].question_id] = obj.questions[i].string;
                        // }
                        this.dispatch(userQuestionDispatch(obj.questions));
                        return;
                    }
                    case "timer_elapsed": {
                        this.dispatch(timerDispatch(-1));
                        return;
                    }
                    case "start": {
                        this.dispatch(roundDispatch(obj.num));
                        this.#props[obj.type] = undefined;
                        return;
                    }
                    case "rend": {
                        this.dispatch(roundDispatch(-obj.num));
                        return;
                    }
                    case "ans": {
                        this.dispatch(currentQuestionDispatch(obj.question_id, obj.answers, obj.question));
                        return;
                    }
                }
                break;
            }
        }

    }
    onclose = (e) => {
        console.log(`Connection closed with code ${e.code} and it was${e.wasClean ? "" : "n't"} clean`);
        this.socket = undefined;
        this.#mode = undefined;
    }
    onerror = (e) => {
        console.error("WebSocket error observed:", e);
    }

    close() {
        this.socket.close()
        this.socket = undefined;
    }

    isConnected() {
        return (this.socket !== undefined)
    }

    connectUser() {
        if (this.socket)
            return;
        const ws = this.#secure ? "wss" : "ws";
        const endpoint = "user";
        const address = this.#address;
        this.#mode = endpoint
        this.socket = new WebSocket(`${ws}://${address}/${endpoint}`)
        this.#setmethods();
    }

    connectAdmin() {
        if (this.socket)
            return;
        const ws = this.#secure ? "wss" : "ws";
        const endpoint = "admin";
        const address = this.#address;
        this.#mode = endpoint
        this.socket = new WebSocket(`${ws}://${address}/${endpoint}`)
        this.#setmethods();
    }

    sendMessage(type, props) {
        if (this.socket.readyState !== 1) {
            this.#queue.push({type, props});
            return;
        }
        console.log("Sent:", type, props)
        switch (this.#mode) {
            case "admin": {
                switch (type) {
                    case "create": {
                        this.#props[type] = props;
                        this.socket.send(JSON.stringify({type: type, nick: props.nick}));
                        return;
                    }
                    case "join": {
                        this.#props[type] = {admin_id: props.admin_id}
                        this.socket.send(JSON.stringify({type: type, admin_id: props.admin_id}))
                        return;
                    }
                    case "add_question": {
                        this.#props[type].push(props)
                        this.socket.send(JSON.stringify({
                            type: type,
                            question: props.question,
                            answer: props.answer
                        }))
                        return;
                    }
                    case "add_t": {
                        this.#props[type] = props
                        this.socket.send(JSON.stringify({
                            type: type,
                            team_names: props.team_names
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
                        this.socket.send(JSON.stringify({type: type}))
                        return;
                    }
                    case "join_t": {
                       // this.#props[type] = props
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
