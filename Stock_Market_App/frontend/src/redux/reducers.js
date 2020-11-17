const tickerReducer = (state = {ticker: ''}, action) =>{
    switch (action.type){
        case 'SET_TICKER':
            return {ticker: action.payload};
        default:
            return state;
    }
        
}

export default tickerReducer;