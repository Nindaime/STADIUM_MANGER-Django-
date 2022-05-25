const adminReducers = (state = false, action) => {
    switch(action.type){
        case 'LOAD_A_DATA':
            return true
        case 'CLEAR_A_DATA':
            return false
        default:
            return state
    }
}

export default adminReducers;