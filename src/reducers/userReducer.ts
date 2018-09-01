import { Reducer } from 'redux'
import { UserState } from '../types'
import { AT } from '../types/ActionTypes'
import { ActionObjects } from '../types'

const initialState: UserState = {
    isLoggedIn: false,
    name: ''
};

const reducer: Reducer<UserState> = (state = initialState, action: ActionObjects): UserState => {
    switch (action.type) {
        case AT.USER_LOGIN:
            return { ...state, isLoggedIn: true, name: action.name };
        case AT.USER_LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default reducer;