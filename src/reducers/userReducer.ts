import { Reducer } from 'redux'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { ActionObject } from '../types'
import { microsoftProvider } from '../providers/microsoft'
import { service } from '../services/react-simple-auth'

const unauthenticatedState: UserState = {
    isLoggedIn: false,
    id: null,
    name: ''
};

const initialState = {...unauthenticatedState}
const session = service.restoreSession(microsoftProvider)
if (session) {
    initialState.isLoggedIn = true
    initialState.id = session && session.decodedIdToken ? session.decodedIdToken.oid : null
    initialState.name = session && session.decodedIdToken ? session.decodedIdToken.name : null
}

const reducer: Reducer<UserState> = (state = initialState, action: ActionObject): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return { ...state, 
                    isLoggedIn: true, 
                    name: action.name
            }
        case AT.USER_LOGOUT:
            service.invalidateSession()
            return { ...unauthenticatedState }
        default:
            return state
    }
}

export default reducer;