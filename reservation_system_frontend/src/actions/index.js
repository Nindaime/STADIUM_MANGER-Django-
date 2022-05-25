// customers
export const add_customer = (data) => {
    return {
        type: 'LOAD_C_DATA',
        payload: data
    }
}
export const clear_customer = () => {
    return {
        type: 'CLEAR_C_DATA'
    }
}


// admin
export const add_admin = (val) => {
    return {
        type: 'LOAD_A_DATA',
    }
}

export const clear_sdmin = () => {
    return {
        type: 'CLEAR_A_DATA'
    }
}