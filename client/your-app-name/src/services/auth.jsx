import React, {useReducer} from "react";


const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        username: "Billy",
        email: 'Password',
        signed: false
    }
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
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignIn: (values) => {

                    let fetchUser = async (values) => {
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
                            let stored_user = {username: txt.username,
                                                email: txt.email,
                                                aboutMe: txt.aboutMe,
                                                role: txt.role,
                                                createdAt: txt.createdAt,
                                                updatedAt: txt.updatedAt,
                                                signed: true};
                            dispatch({type: 'signInUser', payload: stored_user});

                            localStorage.setItem('currentUser', JSON.stringify(stored_user));
                            localStorage.setItem('signed', JSON.stringify(true));

                        } else {
                            // dispatch({type: 'signInUser', payload: guest})
                            console.log('Wrong email or password');
                        }
                    }   ;
                    fetchUser(values);


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