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
            <div className="text-center text-4xl pt-6 mb-8">
                <p>Bienvenido a esta página web creada con React y Docker</p>
            </div>
            <div className="flex flex-col w-3/4 bg-zinc-300 rounded-lg p-4 mx-auto cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg hover:border-zinc-500 hover:shadow-zinc-700">
                <h2 className=" text-center font-semibold text-3xl p-3 mb-4">Insertar un personaje</h2>
                <form className="flex flex-col items-center space-y-4" onSubmit={submitHandler}>
                    <div className="flex w-2/3 justify-center space-x-4">
                        <input
                            className="flex-grow w-1/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            type="text"
                            placeholder="Nombre del personaje..."
                            value={enteredName}
                            onChange={nameChangeHandler}
                        />
                        <input
                            className="flex-grow w-1/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            type="text"
                            placeholder="Película..."
                            value={enteredFilm}
                            onChange={filmChangeHandler}
                        />
                        <input
                            className="flex-grow w-1/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
                            type="text"
                            placeholder="Habilidad..."
                            value={enteredSkill}
                            onChange={skillChangeHandler}
                        />
                    </div>
                    <li className="flex items-center space-x-2">
                        <input
                            id="isGoodCheckbox"
                            className="form-checkbox"
                            type="checkbox"
                            checked={enteredIsGood}
                            onChange={isGoodChangeHandler}
                        />
                        <div className="relative inline-block">
                            <label
                                htmlFor="isGoodCheckbox"
                                onClick={() => setIsGood(!enteredIsGood)}
                                className={`text-gray-500 cursor-pointer italic font-bold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 ${enteredIsGood ? 'after:bg-green-700' : 'after:bg-red-700'} after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100`}
                            >
                                ¿Es bueno?
                            </label>
                        </div>
                    </li>
                    <button className="bg-zinc-600 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded">
                        Cargar personaje
                    </button>
                </form>
            </div>
            <div className="text-center text-xl mt-20 mb-10">
                <h2 className="font-semibold text-3xl mb-10">Personajes traídos desde la base de datos</h2>
                {characters.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-4">
                        {characters.map((character, index) => (
                            <div key={index} className={`bg-gray-200 rounded-lg p-4 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg ${character.bueno ? 'hover:border-green-500 hover:shadow-green-700' : 'hover:border-red-500 hover:shadow-red-700'}`} style={{ minWidth: '400px' }}>
                                <p className={`text-center mb-2 font-bold ${character.bueno ? 'text-green-700' : 'text-red-600'}`}>{character.nombre}</p>
                                <p><b>Película:</b> {character.pelicula}</p>
                                <p><b>Habilidad:</b> {character.habilidad}</p>
                                <p className="text-center"><b>¿Es bueno?</b> {character.bueno ? <span className="italic text-green-700 font-semibold">Sí</span> : <span className="italic text-red-600 font-semibold">No</span>}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Buscando personajes...</p>
                )}
            </div>
        </div>
    );
}

export default Home;