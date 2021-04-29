import {createStore} from "redux";
import Connection from "../connection"
import reduce, {initialState} from "./reducers/reducer";

const store = createStore(reduce,initialState);

export default store;