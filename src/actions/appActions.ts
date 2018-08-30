import { ActionObjects } from '../types'
import { App } from '../types/ActionObjects'
import { AT } from '../types/ActionTypes'

export const addApplication = (app: App): ActionObjects => ({
    type: AT.ADD_APP,
    app
});