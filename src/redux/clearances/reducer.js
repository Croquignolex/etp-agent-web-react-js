import Lodash from "lodash";

import * as actions from "./actions";
import {CANCEL} from "../../constants/typeConstants";

// Partial global store for users data management
const initialState = {
    page: 1,
    list: [],
    hasMoreData: false
};

// Reduce
function reduce(state = initialState, action) {
    let nextState;
    switch (action.type) {
        // Resolve event to set clearances data
        case actions.STORE_SET_CLEARANCES_DATA:
            nextState = {list: action.clearances, page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to set next clearances data
        case actions.STORE_SET_NEXT_CLEARANCES_DATA:
            nextState = {list: [...state.list, ...action.clearances], page: action.page, hasMoreData: action.hasMoreData};
            return nextState || state;
        // Resolve event to stop infinite scroll clearances data
        case actions.STORE_STOP_INFINITE_SCROLL_CLEARANCES_DATA:
            nextState = {...state, hasMoreData: false};
            return nextState || state;
        // Resolve event to set new clearance data
        case actions.STORE_SET_NEW_CLEARANCE_DATA:
            nextState = {...state, list: [action.clearance, ...state.list]}
            return nextState || state;
        // Resolve event to set fleet action data
        case actions.STORE_SET_CLEARANCE_ACTION_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) item.actionLoader = !item.actionLoader;
                    return item;
                })
            };
            return nextState || state;
        // Resolve event to cancel clearance data
        case actions.STORE_CANCEL_CLEARANCE_DATA:
            nextState = {
                ...state,
                list: Lodash.map(state.list, (item) => {
                    if(item.id === action.id) {
                        item.status = CANCEL;
                    }
                    return item;
                })
            };
            return nextState || state;
        // Unknown action
        default: return state;
    }
}

export default reduce
