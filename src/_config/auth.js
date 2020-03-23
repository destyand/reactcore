import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

const locationHelper = locationHelperBuilder({});

// ------------- IS USER -------------

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.auth.user !== null,
    authenticatingSelector: state => state.auth.loading,
    wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    redirectPath: '/login'
});

// ------------- END IS USER -------------

// ------------- IS ADMIN -------------

const userIsAuthenticatedAdminDefaults = {
    authenticatedSelector: state => (state.auth.user !== null) && (state.auth.isAdmin === 'OK'),
    wrapperDisplayName: 'UserIsAdmin'
}

export const userIsAuthenticatedAdmin = connectedAuthWrapper(userIsAuthenticatedAdminDefaults);

export const userIsAdminRedir = connectedRouterRedirect({
    ...userIsAuthenticatedAdminDefaults, 
    redirectPath: '/login',    
    predicate: user => user.isAdmin,
});

// ------------- END IS ADMIN -------------

// ------------- IS GUEST -------------

const userIsNotAuthenticatedDefaults = {
    // Want to redirect the user when they are done loading and authenticated
    authenticatedSelector: state => state.auth.user === null && state.auth.loading === false,
    wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(userIsNotAuthenticatedDefaults);

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
    ...userIsNotAuthenticatedDefaults,
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    authenticatedSelector: state => state.auth.user === null,
    allowRedirectBack: false
})

// ------------- END IS GUEST -------------