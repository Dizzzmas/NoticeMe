import React, {useReducer} from "react";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser')) || {
        username: 'Guest',
        signed: false
    },
};

const guest = {
    username: 'Guest',
    signed: false
};

const AuthContext = React.createContext();


const reducer = (state, action) => {
    console.log("AAAAAa", action.payload);
    switch (action.type) {
        case 'signInUser':
            return {
                ...state,
                currentUser: action.payload.user,
            };
        case 'logoutUser':
            return {
                ...state,
                currentUser: {user: guest},
            };
        case 'followedUser':
            return {
                ...state,
                followedCount: state.followedCount + 1
            };
        case 'unFollowedUser':
            return {
                ...state,
                followedCount: state.followedCount - 1
            };
        default:
            return state;
    }
};

const AuthContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignIn: (stored_user) => {
                    dispatch({type: 'signInUser', payload: stored_user});
                },
                handleLogOut: () => {
                    localStorage.removeItem('jwt');
                    sessionStorage.removeItem('jwt');
                    localStorage.removeItem('currentUser');
                    sessionStorage.removeItem('currentUser');

                    dispatch({type: 'logoutUser', payload: guest});
                },
                getJwt: () => {
                    const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
                    if (!jwt) {
                        return window.location.replace('/signIn');
                    }
                    return jwt;
                },
                handleFollow: () =>{
                    dispatch({type: 'followedUser'});
                },
                handleUnfollow: () => {
                    dispatch({type: 'unFollowedUser'});
                }

            }
            }
        >
            {props.children}
        </AuthContext.Provider>
    )
};


export {
    AuthContextProvider,
    AuthContext
}