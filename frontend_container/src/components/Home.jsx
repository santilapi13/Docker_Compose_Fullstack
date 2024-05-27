import React, { useEffect, useState } from 'react';

function Home() {
    const [numbers, setNumbers] = useState([]);
    const [enteredValue, setEnteredValue] = useState('');

    useEffect(() => {
        fetchNumbers();
    }, []);

    const fetchNumbers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setNumbers(data.map(item => item.data.value));
        } catch (error) {
            console.error("There was an error fetching the numbers!", error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: { value: enteredValue } })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEnteredValue('');
            if (data.ok)
                fetchNumbers();
        } catch (error) {
            console.error("There was an error posting the number!", error);
        }
    }

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    }

    return (
        <div>
            <h1 className="pt-6 text-center font-bold text-4xl p-3">Home</h1>
            <div className="text-center text-2xl mb-4">
                <p>Bienvenido a esta página web creada con React y Docker</p>
            </div>
            <form className="text-center" onSubmit={ submitHandler }>
                <input 
                    type='text'
                    placeholder='Número a insertar...'
                    value={enteredValue}
                    onChange={valueChangeHandler}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cargar números</button>
            </form>
            <div className="text-center text-xl mt-4">
                <h2 className="font-semibold text-3xl mb-2">Números desde el backend:</h2>
                {numbers.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {numbers.map((number, index) => (
                            <li key={index} className="mb-1">
                                {number}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Cargando números...</p>
                )}
            </div>
        </div>
    );
}

export default Home;