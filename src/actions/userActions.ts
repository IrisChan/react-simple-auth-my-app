import { ActionObjects } from '../types'
import { AT } from '../types/ActionTypes'

export const login = (name: string, password: string): ActionObjects => ({
    type: AT.USER_LOGIN,
    name,
    password
})

export const logout = (): ActionObjects => ({
    type: AT.USER_LOGOUT
})
