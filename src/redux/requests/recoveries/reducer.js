import * as actions from "./actions";
import {requestFailedValue, requestInitValue, requestSucceededValue} from "../../../functions/reduxFunctions";

// Partial global store for requests data management
const initialState = {
    list: {failed: false, loading: true, succeeded: false, message: ""},
    next: {failed: false, loading: false, succeeded: false, message: ""},
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // ======================================================== recoveries
        // Resolve event to set recoveries init request store data
        case actions.STORE_RECOVERIES_REQUEST_INIT:
            nextState = {...state, list: requestInitValue()};
            return nextState || state;
        // Resolve event to set recoveries failed request store data
        case actions.STORE_RECOVERIES_REQUEST_FAILED:
            nextState = {...state, list: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set recoveries succeeded request store data
        case actions.STORE_RECOVERIES_REQUEST_SUCCEEDED:
            nextState = {...state, list: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set recoveries reset request store data
        case actions.STORE_RECOVERIES_REQUEST_RESET:
            nextState = {...state, list: initialState.list};
            return nextState || state;
        // ======================================================== Next recoveries
        // Resolve event to set next recoveries init request store data
        case actions.STORE_NEXT_RECOVERIES_REQUEST_INIT:
            nextState = {...state, next: requestInitValue()};
            return nextState || state;
        // Resolve event to set next recoveries failed request store data
        case actions.STORE_NEXT_RECOVERIES_REQUEST_FAILED:
            nextState = {...state, next: requestFailedValue(action.message)};
            return nextState || state;
        // Resolve event to set next recoveries succeeded request store data
        case actions.STORE_NEXT_RECOVERIES_REQUEST_SUCCEEDED:
            nextState = {...state, next: requestSucceededValue(action.message)};
            return nextState || state;
        // Resolve event to set next recoveries reset request store data
        case actions.STORE_NEXT_RECOVERIES_REQUEST_RESET:
            nextState = {...state, next: initialState.next};
            return nextState || state;
        // ========================================================
        // Unknown action
        default: return state;
    }
}

export default reduce
