import AT from './ActionTypes'

export interface App {
    name: string
}

export interface AddAppApplication {
    type: AT.ADD_APP,
    app: App
}

export interface UserLoginAction {
    type: AT.USER_LOGIN,
    id: string,
    name: string
}

export interface UserLogoutAction {
    type: AT.USER_LOGOUT
}

export type ActionObjects = 
    AddAppApplication |
    UserLoginAction | 
    UserLogoutAction
