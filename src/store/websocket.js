import Connection from "../connection";
import store from "./store";

let websocket = new Connection(store.dispatch);

export function getWebSocket() {
    return websocket
}

export default getWebSocket()
window.socket = websocket;