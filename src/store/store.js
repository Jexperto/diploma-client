import {createStore} from "redux";
import reduce, {initialState} from "./reducers/reducer";

const store = createStore(reduce,initialState);

export default store;