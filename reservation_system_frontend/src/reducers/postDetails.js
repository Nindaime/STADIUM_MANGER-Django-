const detailsReducer = (state = {
    loggedIn: false,
    userID: null,
    username: ""
}, action) => {
    switch(action.type){
        case 'LOAD_C_DATA':
            return {
                loggedIn: true,
                userID: action.payload.query,
                username: action.payload.user
            }
        case 'CLEAR_C_DATA':
            return {
                loggedIn: false,
                userID: null,
                username: ""
            }
        default:
            return state
    }
}

export default detailsReducer;