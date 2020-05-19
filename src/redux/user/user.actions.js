import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (user) => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFaliure = (error) => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_FALIURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const emailSignInSuccess = (user) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFaliure = (error) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_FALIURE,
    payload: error
});
