import React, { useEffect, useState } from 'react';

function Home() {
    const [numbers, setNumbers] = useState([]);

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
            console.log('datos tomados')
            setNumbers(data);
        } catch (error) {
            console.error("There was an error fetching the numbers!", error);
        }
    };

    return (
        <div>
            <h1 className="pt-6 text-center font-bold text-4xl p-3">Home</h1>
            <div className="text-center text-2xl mb-4">
                <p>Bienvenido a esta página web creada con React y Docker</p>
            </div>
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