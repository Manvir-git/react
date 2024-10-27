import React, { useCallback, useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(true);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const inputRef = useRef(null);

    const passGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (number) str += "0123456789";
        if (charAllowed) str += "@#$&";

        for (let i = 0; i < length; i++) {
            let charIndex = Math.floor(Math.random() * str.length);
            pass += str.charAt(charIndex);
        }

        setPassword(pass);
    }, [length, number, charAllowed]);

    useEffect(() => {
        passGenerator();
    }, [length, number, charAllowed, passGenerator]);

    const copyPass = useCallback(() => {
        window.navigator.clipboard.writeText(password);
       inputRef.current?.select();
        if (inputRef.current) {
            inputRef.current?.focus();
        }
    }, [password]);

    return (
        <div className='container'>
          
            {/* Input and Button Section */}
            <div className='input-section'>
                <input
                    ref={inputRef}
                    className='input-field'
                    type='text'
                    value={password}
                    placeholder='password'
                    readOnly
                />
                <button onClick={copyPass} className="button">
                    Copy
                </button>
            </div>

            {/* Range and Checkbox Section */}
            <div className='range-checkbox-section'>
                <input
                    type="range"
                    min='0'
                    max='20'
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className='range-input'
                />
                <label className='label'>Length: {length}</label>

                <input
                    type='checkbox'
                    defaultChecked={number}
                    id='numberInput'
                    onChange={() => setNumber((prev) => !prev)}
                    className='range-input'
                />
                <label className='label' htmlFor='numberInput'>Number</label>

                <input
                    type='checkbox'
                    defaultChecked={charAllowed}
                    id='charInput'
                    onChange={() => setCharAllowed((prev) => !prev)}
                    className='range-input'
                />
                <label className='label' htmlFor='charInput'>Char</label>
            </div>
            <button onClick={passGenerator} className="button">
                Generate
            </button>
        </div>
    );
}

export default App;
