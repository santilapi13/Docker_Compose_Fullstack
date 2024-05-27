import React, { useEffect, useState } from 'react';

function Home() {
    const [characters, setCharacters] = useState([]);
    const [enteredName, setEnteredName] = useState('');
    const [enteredFilm, setEnteredFilm] = useState('');
    const [enteredSkill, setEnteredSkill] = useState('');
    const [enteredIsGood, setEnteredIsGood] = useState(false);


    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCharacters(data.map(item => item.data));
        } catch (error) {
            console.error("There was an error fetching the numbers!", error);
        }
    };

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    }

    const filmChangeHandler = (e) => {
        setEnteredFilm(e.target.value);
    }

    const skillChangeHandler = (e) => {
        setEnteredSkill(e.target.value);
    }

    const isGoodChangeHandler = (e) => {
        setEnteredIsGood(e.target.checked);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const value = {
            nombre: enteredName,
            pelicula: enteredFilm,
            habilidad: enteredSkill,
            bueno: enteredIsGood
        }
        try {
            const response = await fetch('http://localhost:3000/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: value })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEnteredName('');
            setEnteredFilm('');
            setEnteredSkill('');
            setEnteredIsGood(false);
            if (data.ok)
                fetchCharacters();
        } catch (error) {
            console.error("There was an error posting the number!", error);
        }
    };

    setInterval(fetchCharacters, 15000);

    return (
        <div>
            <h1 className="pt-6 text-center font-bold text-4xl p-3">Home</h1>
            <div className="text-center text-2xl mb-4">
                <p>Bienvenido a esta página web creada con React y Docker</p>
            </div>
            <h2 className="pt-6 text-center font-bold text-xl p-3">Insertar un personaje:</h2>
            <form className="text-center" onSubmit={ submitHandler }>
                <input 
                    type='text'
                    placeholder='Nombre del personaje...'
                    value={enteredName}
                    onChange={nameChangeHandler}
                />
                <input 
                    type='text'
                    placeholder='Película...'
                    value={enteredFilm}
                    onChange={filmChangeHandler}
                />
                <input 
                    type='text'
                    placeholder='Habilidad...'
                    value={enteredSkill}
                    onChange={skillChangeHandler}
                />
                <li>
                    <input
                        type='checkbox'
                        value={enteredIsGood}
                        onChange={isGoodChangeHandler}
                    />
                    <label>¿Es bueno?</label>
                </li>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cargar personaje</button>
            </form>
            <div className="text-center text-xl mt-4">
                <h2 className="font-semibold text-3xl mb-2">Personajes traídos desde la base de datos:</h2>
                {characters.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {characters.map((character, index) => (
                            <li key={index} className="mb-1">
                                <b>Personaje:</b> { character.nombre } <b>Película:</b> { character.pelicula } <b>Habilidad:</b> { character.habilidad } <b>¿Es bueno?</b> { character.bueno ? 'Sí' : 'No' }
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