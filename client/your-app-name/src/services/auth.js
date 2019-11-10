// import React from "react";
//
//
// async function handleSignIn(values) {
//     let res = await fetch('api/v1/users-sign-in', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             "email": values.email,
//             "password": values.password
//         })
//
//     });
//
//
//     if (res.ok) {
//         dispatch({
//             type: 'loginUser',
//             payload: {
//                 authenticated: true,
//                 user: res
//             }
//         });
//     }
//     else{
//
//     }
// }