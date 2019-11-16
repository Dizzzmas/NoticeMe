import React, {useReducer} from "react";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser')) || {
        username: 'Guest',
        signed: false
    }
};

// let fetchCurrentUser = async() => {
//     let currentUser = await fetch('/api/v1/me')
// }

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
                    dispatch({type: 'logoutUser', payload: guest});
                }
            }
            }
        >
            {props.children}
        </AuthContext.Provider>
    )
};

// let fetchUser = async (values) => {
//     console.log(values.remember_me);
//     let res = await fetch('/api/v1/users-sign-in', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             "email": values.email,
//             "password": values.password
//         })
//
//     });
//     let txt = await res.json();
//     console.log(txt);
//     if (res.ok) {
//         let stored_user = {
//             username: txt.username,
//             email: txt.email,
//             aboutMe: txt.aboutMe,
//             role: txt.role,
//             createdAt: txt.createdAt,
//             updatedAt: txt.updatedAt,
//             signed: true,
//         };
//
//         if (values.remember_me) {
//             await localStorage.setItem('currentUser', JSON.stringify(stored_user));
//         } else {
//             await sessionStorage.setItem('currentUser', JSON.stringify(stored_user));
//         }
//         return stored_user;
//
//     } else {
//         console.log("Login failed");
//         return ({message: 'Log In failed'});
//     }
// };
//
// let fetchLogOut = async () => {
//     try {
//         await fetch('/api/v1/users-log-out', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (!sessionStorage.getItem('currentUser')) {
//             await localStorage.removeItem('currentUser');
//         } else {
//             await sessionStorage.removeItem('currentUser');
//         }
//         return ({message: 'Logout successful'});
//
//     } catch (error) {
//         console.log("Err", error);
//         return ({message: 'Logut failed'});
//     }
// };

// let fetchSignUp = async (values) => {
//     try {
//         let res = await fetch('/api/v1/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 "username": values.username,
//                 "password": values.password,
//                 "email": values.email,
//             })
//
//         });
//         let txt = await res.json();
//         if(res.ok){
//             console.log('SignUp successful');
//
//         }
//     } catch (error) {
//             console.log({message: "SignUp failed"});
//     }
// }

export {
    AuthContextProvider,
    AuthContext
}