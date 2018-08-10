import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import Timeout from './Timeout/Timeout';

class Jokes extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedIn: true,
            jokes: [],
            time: 5
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5000/api/jokes', { headers: { Authorization: token } })
                .then(response => this.setState({ jokes: response.data }))
                .catch(err => console.log(err.response));
        } else {
            this.setState({ loggedIn: false });
            this.setInterval();
            this.setTimeout();
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    setTimeout = () => {
        this.props.setTimeout(() => {
            this.props.history.push('/signin');
        }, this.state.time * 1000);
    }

    setInterval = () => {
        let timeLeft = this.state.time;
        this.props.setInterval(() => {
            timeLeft--;
            this.setState({ time: timeLeft });
        }, 1000)
    }

    render() {
        if (!this.state.loggedIn) {
            return <h3>You need to be logged in to view this page... Redirecting to login page in {this.state.time}</h3>
        }

        return (
            <div>
                <button onClick={this.logout}>Logout</button>
                {this.state.jokes.map((joke, index) => <Joke key={index} joke={joke} />)}
            </div>
        );
    }
}

export default Timeout(Jokes);