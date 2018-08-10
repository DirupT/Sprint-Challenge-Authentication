import React from 'react';

const Joke = props => {
    return (
        <div className='joke-container'>
            <p><strong>{props.joke.type}</strong></p>
            <p>{props.joke.setup}</p>
            <p>{props.joke.punchline}</p>
        </div>
    )
}

export default Joke;