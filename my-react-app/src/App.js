import  React   from 'react';
// import  ReactDOM    from 'react-dom/client'; 
import './App.css';
import { useState, useEffect } from 'react';

const   Cmp = () => {
    const   name = 'khtk';
    return (
        <div className='cmp'>
            <h1>{2 + 2}</h1>
            {
                name ? (
                <>
                    {name}
                </>
            ): (
                <>
                    <h1>Test</h1>
                    <h1>There is no name a batal</h1>
                </>
            )}
        </div>
    );
}

const   Person = (props) => {
    return (
        <>
            <h1>Name: {props.name}</h1>
            <h2>Last Name: {props.LastName}</h2>
            <h2>Age: {props.age}</h2>
        </>
    )
}

const   App = () => {
    // const   IsUserLoggedIn = true;
    const   [counter, setCounter] = useState(0);
    useEffect(() => {
        alert("you've changed the counter to " + counter)
    }, [counter]);
    return  (
        <div className='App'>
            <Cmp />
            <Person
                name={'ihsan'}
                LastName={'khtk'}
                age={'24'}
            />
            <button onClick={ () => setCounter((prevCount) => prevCount - 1)}>-</button>
                <h1>{counter}</h1>
            <button onClick={ () => setCounter((prevCount) => prevCount + 1)}>+</button>
        
        </div>
    );
}

export default  App;