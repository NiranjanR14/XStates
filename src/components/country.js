import React from 'react';
import { useState, useEffect } from 'react';
import './country.css';

const Country = () => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [Statement, setStatement] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://crio-location-selector.onrender.com/countries');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const fetchStates = async () => {
                try {
                    const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setStates(data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };

            fetchStates();
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState) {
            const fetchCities = async () => {
                try {
                    const response = await fetch(` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCities(data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };

            fetchCities();
        } else {
            setCities([]);
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedCity) {
            setStatement(
                <span>
                    <strong>You selected {selectedCity}</strong>, <span style={{ color: 'grey' }}>{selectedState}</span>, <span style={{ color: 'grey' }}>{selectedCountry}</span>
                </span>
            );
        } else {
            setStatement('');
        }
    }, [selectedCity, selectedState, selectedCountry]);

    return (
        <div>
            <h1>XStates buildout</h1>
            <div className="select-box">
            <div className='select-box-item'>
                <label htmlFor="country">Country:</label>
                <select
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div className='select-box-item'>
                <label htmlFor="state">State:</label>
                <select
                    id="state"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
            <div className='select-box-item'>
                <label htmlFor="city">City:</label>
                <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            </div>
            <div className='statement'>{Statement}</div>
        </div>
    );
};

export default Country;