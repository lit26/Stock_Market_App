export const setTicker = (ticker) =>{
    return {
        type: 'SET_TICKER',
        payload: ticker
    }
}
export const setInterval = (interval) =>{
    return {
        type: 'SET_INTERVAL',
        payload: interval
    }
}