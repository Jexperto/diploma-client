import Connection from "../utils/connection";
import store from "./store";

let websocket = new Connection(store.dispatch, "backend:8080");

export function getWebSocket() {
    return websocket
}

export default getWebSocket()
window.socket = websocket;