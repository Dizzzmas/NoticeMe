import React, {useContext} from "react";
import {AuthContext} from "../../services/auth";

export default function Profile() {
  let authCont = useContext(AuthContext);
    return (
        <div>
        <p>Username: {authCont.currentUser.username}</p>
        <img src={authCont.currentUser.avaUrl}/>
        </div>

    );
}
