import React from 'react';
import axios from 'axios';
import Joke from './Joke';
import Timeout from './Timeout/Timeout';

class Jokes extends React.Component {
    constructor() {
        super();

        this.state = {
            jokes: [],
            user: [],
            loggedIn: true,
            time: 5
        }
    }

    componentDidMount() {
        // Gets token from localStorage and if it exists, get jokes from api.
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5000/api/jokes', { headers: { Authorization: token } })
                .then(response => this.setState({ jokes: response.data.jokes, user: response.data.user }))
                .catch(err => console.log(err.response));
        } else {
            // Sets login state to false and starts timer for redirection to login page
            this.setState({ loggedIn: false });
            this.setInterval();
            this.setTimeout();
        }
    }

    logout = () => {
        // Removes token from localStorage and refreshes the page
        localStorage.removeItem('token');
        window.location.reload();
    }

    setTimeout = () => {
        // Redirects to login page after 5 seconds (this.state.time * 1000)
        this.props.setTimeout(() => {
            this.props.history.push('/signin');
        }, this.state.time * 1000);
    }

    setInterval = () => {
        // Starts a 5 second timer
        let timeLeft = this.state.time;
        this.props.setInterval(() => {
            timeLeft--;
            this.setState({ time: timeLeft });
        }, 1000)
    }

    render() {
        // If user is not logged in, this will display a redirection message 
        if (!this.state.loggedIn) {
            return <h3>You need to be logged in to view this page... Redirecting to login page in {this.state.time}</h3>
        }
        // Displays Loading... if user hasn't been found
        if (this.state.user.length === 0) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h1>Welcome, {this.state.user.username}</h1>
                <button onClick={this.logout}>Logout</button>
                {/*Maps over the jokes on state and returns a new component for each, called Joke*/}
                {this.state.jokes.map((joke, index) => <Joke key={index} joke={joke} />)}
            </div>
        );
    }
}

export default Timeout(Jokes);