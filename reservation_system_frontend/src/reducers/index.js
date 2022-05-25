import detailsReducer from './postDetails'
// import transactionReducer from './transactionReducers'
import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import adminReducers from './adminReducers'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['customer', 'admin']
}

// const rootReducer = combineReducers({
//     detail: detailsReducer
// });

const allReducers = combineReducers({
    customer: detailsReducer,
    admin: adminReducers
});

export default persistReducer(persistConfig, allReducers);