import { Reducer } from 'redux'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { ActionObjects } from '../types'

const unauthenticatedState: UserState = {
    isLoggedIn: false,
    id: null,
    name: ''
};

const initialState = {...unauthenticatedState}
const sessionString = window.localStorage.getItem('session')
if (typeof sessionString === 'string' && sessionString.length > 0) {
    const session = JSON.parse(sessionString)
    if (session.decodedIdToken) {
        initialState.isLoggedIn = true
        initialState.id = session.decodedIdToken.id
        initialState.name = session.decodedIdToken.name
    }
}

const reducer: Reducer<UserState> = (state = initialState, action: ActionObjects): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return { ...state, 
                    isLoggedIn: true, 
                    name: action.name
            }
        case AT.USER_LOGOUT:
            return { ...unauthenticatedState }
        default:
            return state
    }
}

export default reducer;