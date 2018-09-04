import { ActionObjects } from '../types'
import { AT } from '../types/ActionTypes'

export const login = (id: string, name: string): ActionObjects => ({
    type: AT.USER_LOGIN,
    id,
    name
})

export const logout = (): ActionObjects => ({
    type: AT.USER_LOGOUT
})
