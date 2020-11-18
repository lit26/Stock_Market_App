import { combineReducers } from 'redux' 

const tickerReducer = (state = '', action) =>{
    switch (action.type){
        case 'SET_TICKER':
            return action.payload;
        default:
            return state;
    }
        
}
const intervalReducer = (state='1d',action) =>{
    switch (action.type){
        case 'SET_INTERVAL':
            return action.payload;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    ticker: tickerReducer,
    interval: intervalReducer
})

export default allReducers;