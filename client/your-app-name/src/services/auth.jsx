import React, {useReducer} from "react";


const initialState = {
    currentUser: {
        username: "Billy",
        email: 'Password'
    },
    signed: false
};
const guest = {
    username: 'Guest'
};

const AuthContext = React.createContext();
const reducer = (state, action) => {
    console.log("AAAAAa", action.payload);
    switch (action.type) {
        case 'signInUser':
            return {
                ...state,
                currentUser: action.payload,
                signed: true
            };
        case 'logoutUser':
            return {
                ...state,
                currentUser: {username: "Guest"},
                signed: false
            };
        default:
            return state;
    }
};

const AuthContextProvider = props => {
    console.log(props.email);
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignIn: async (values) => {

                    let res = await fetch('/api/v1/users-sign-in', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": values.email,
                            "password": values.password
                        })

                    });
                    let txt = await res.json();
                    console.log(txt);
                    if (res.ok) {
                        dispatch({type: 'signInUser', payload: txt})
                    } else {
                        // dispatch({type: 'signInUser', payload: guest})
                        console.log('Wrong email or password');
                    }

                },
                // handleLogOut: () => dispatch({type: 'logoutUser', payload: user})
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export {
    AuthContextProvider,
    AuthContext
}