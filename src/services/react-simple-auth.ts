import { guid } from './utilities'

const sessionKey = `session`

export interface IProvider<T> {
    buildAuthorizeUrl(): string
    extractError(redirectUrl: string): Error | undefined
    extractSession(redirectUrl: string): T
    validateSession(session: T): boolean
    getAccessToken(session: T, resourceId: string): string,
    getSignOutUrl(redirectUrl: string): string
}

export interface IAuthenticationService {
    acquireTokenAsync<T>(provider: IProvider<T>): Promise<T>
    restoreSession<T>(provider: IProvider<T>): T | undefined
    invalidateSession(): void
    getAccessToken<T>(provider: IProvider<T>, resourceId: string): string
}

export const service: IAuthenticationService = {
    acquireTokenAsync<T>(provider: IProvider<T>): Promise<T> {
        // create unique request key
        const requestKey = `react-simple-auth-request-key-${guid()}`
        // set request key as empty in local storage
        window.localStorage.setItem(requestKey, '')
        // Create new window set to authorize url, with unique request key, and centered options
        const [width, height] = [500, 500]
        const windowOptions = {
            width, 
            height,
            left: Math.floor(screen.width / 2 - width / 2),
            top: Math.floor(screen.height / 2 - height / 2)
        }

        const oauthAuthorizeUrl = provider.buildAuthorizeUrl()
        const windowOptionsString = Object.entries(windowOptions).map(([key, value]) => `${key}=${value}`).join(',')
        const loginWindow = window.open(oauthAuthorizeUrl, requestKey, windowOptionsString)

        return new Promise<any>((resolve, reject) => {
            const checkWindow = (loginWindow: Window | any) => {
                if (!loginWindow.closed) {
                    setTimeout(() => checkWindow(loginWindow), 180)
                    return
                }

                const redirectUrl = window.localStorage.getItem(requestKey)
                window.localStorage.removeItem(requestKey)

                if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
                    reject(new Error(`login window was closed or incomplete`))
                    return
                }

                const error = provider.extractError(redirectUrl)
                if (error) {
                    reject(error)
                    return
                }

                const session = provider.extractSession(redirectUrl)
                window.localStorage.setItem(sessionKey, JSON.stringify(session))
                resolve(session)
            }

            checkWindow(loginWindow)
        })
    },

    restoreSession<T>(provider: IProvider<T>): T | undefined {
        const sessionString = window.localStorage.getItem('session')
        if (typeof sessionString !== 'string' || sessionString.length === 0) {
            return undefined
        }

        const session: T = JSON.parse(sessionString)
        if (!provider.validateSession(session)) {
            window.localStorage.removeItem(sessionKey)
            return undefined
        }

        return session
    },

    invalidateSession(): void {
        window.localStorage.removeItem(sessionKey)
    },

    getAccessToken<T>(provider: IProvider<T>, resourceId: string): string {
        const sessionString = window.localStorage.getItem(sessionKey)
        if (typeof sessionString !== 'string' || sessionString.length === 0) {
            throw new Error(`You attempted to get access token for resource id: ${resourceId} from the session but the session did not exist`)
        }

        const session: T = JSON.parse(sessionString)

        return provider.getAccessToken(session, resourceId)
    }
}