import {Dropdown} from "semantic-ui-react";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../services/auth";


export default function UserSearch(props) {
    const [options, setOptions] = useState(
    );
    let userContext = useContext(AuthContext);

    return (

        <Dropdown
            icon={null}
            placeholder="Enter username"
            search
            selection
            className="form-control js-user-search selectized "
            style={{"margin-top" : "15px"}}
            onChange={(e, data) => {
                props.history.push('/');
                setTimeout(() => {
                    props.history.push(`/${data.value}`)
                }, 100);

            }}
            onSearchChange={async (e) => {
                const jwt = userContext.getJwt();
                let results = await fetch(`/api/v1/users/search?search=${e.target.value}`, {
                    headers: {


                        Authorization: `Bearer ${jwt}`,

                    }
                });
                let searched_users = await results.json();
                let opts = Object.values(searched_users).map((user, index) => {
                    return (
                        {
                            key: index, value: user.username, text: user.username, image: {
                                avatar: true,
                                src: user.ava_url,
                            }
                        }
                    )
                });
                console.log('options: ', opts);
                setOptions(Object.values(opts));

            }}
            options={options}
        />
    )
}