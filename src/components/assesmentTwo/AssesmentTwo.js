import React, { useState } from 'react';

const AssesmentTwo = () => {
    const [n, setN] = useState(0);
    const [displayList, setDisplayList] = useState([]);

    const handleChange = (e) => {
        setN(Number(e.target.value));
    };

    const renderFizzBuzz = () => {
        if (n <= 0) {
            setDisplayList([]);
            return;
        }

        const results = [];
        for (let i = 1; i <= n; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                results.push('Fizz-Buzz');
            } else if (i % 3 === 0) {
                results.push('Fizz');
            } else if (i % 5 === 0) {
                results.push('Buzz');
            } else {
                results.push(i);
            }
        }
        setDisplayList(results);
    };

    return (
        <div className="fizz-buzz-container text-center space-x-4 mt-5">
            <input type="number" className='border rounded-md py-1 px-2' onChange={handleChange} placeholder="Enter a number" />
            <button className='p-1 rounded-md bg-blue-500 text-white' onClick={renderFizzBuzz}>Show</button>
            <div>
                {displayList.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
};

export default AssesmentTwo;
