import React, {useReducer} from "react";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('currentUser')) || {
        username: 'Guest',
        signed: false
    }
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
                currentUser: action.payload,
            };
        case 'logoutUser':
            return {
                ...state,
                currentUser: {username: "Guest"},
            };
        default:
            return state;
    }
};

const AuthContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    let fetchUser = async (values) => {
        console.log(values.remember_me);
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
            let stored_user = {
                username: txt.username,
                email: txt.email,
                aboutMe: txt.aboutMe,
                role: txt.role,
                createdAt: txt.createdAt,
                updatedAt: txt.updatedAt,
                signed: true
            };
            dispatch({type: 'signInUser', payload: stored_user});
            if(values.remember_me) {
                localStorage.setItem('currentUser', JSON.stringify(stored_user));
            }
            else{
                sessionStorage.setItem('currentUser', JSON.stringify(stored_user));
            }

        } else {
            console.log("Login failed");
            dispatch({type: 'signInUser', payload: guest});
        }
    };

    let fetchLogOut = async () => {
        try {
            await fetch('/api/v1/users-log-out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            dispatch({type: 'logoutUser', payload: guest});

        } catch (error) {
            console.log("Err", error);

        }
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                handleSignIn: async(values) => {await fetchUser(values)},
                handleLogOut: async() => {await fetchLogOut()}
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