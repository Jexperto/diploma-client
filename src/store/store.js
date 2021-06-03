import {createStore} from "redux";
import reduce, {initialState} from "./reducers/reducer";

let store = undefined;

function getStore() {
    if (!store)
        store = createStore(reduce, initialState,
          //  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    return store;
}

export default getStore();