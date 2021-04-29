import Connection from "../connection";
import store from "./store";

const websocket = new Connection(store.dispatch);
window.socket = websocket;
export default websocket;