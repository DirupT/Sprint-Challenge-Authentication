import React from 'react';
import axios from 'axios';
import Joke from './Joke';

class Jokes extends React.Component {
    constructor() {
        super();

        this.state = {
            jokes: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5000/api/jokes', { headers: { Authorization: token } })
                .then(response => this.setState({ jokes: response.data }))
                .catch(err => console.log(err.response));
        }
    }

    render() {
        return (
            <div>
                {this.state.jokes.map((joke, index) => <Joke key={index} joke={joke} />)}
            </div>
        );
    }
}

export default Jokes;