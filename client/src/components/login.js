import React, {Component} from 'react'


export default class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        fetch('/api/authenticate', {
            method: 'POST',
            mode: 'same-origin',
            redirect: 'follow',
            body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(error => {
                console.error(error);
                alert('Error logging in, please try again');
            });
        alert('Authentication incoming!');
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login Below !</h1>
                <input
                    type='email'
                    name='email'
                    placeholder='Enter email'
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required/>
                <br/>
                <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required/>
                <br/>
                <input type='submit' value='Submit'/>
            </form>);
    }
}