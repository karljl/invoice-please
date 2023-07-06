import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function IndexPage() {
    const [providers, setProviders] = useState([]);
    const [currentProvider, setCurrentProvider] = useState('');

    useEffect(
        () => {
            axios.get('http://127.0.0.1:8000/providers/')
                .then(response => {
                    const fetchedProviders = response.data;
                    setProviders(fetchedProviders);
                    if (fetchedProviders.length > 0) {
                        setCurrentProvider(fetchedProviders[0].id);
                    }
                });
        }, []
    );

    function handleChange(e) {
        setCurrentProvider(e.target.value);
    }

    return (
        <div>
            <select onChange={handleChange}>
                {providers.map((provider, index) => (
                    <option key={index} value={provider.id}>{provider.name}</option>
                ))}
            </select>
            <Link to={`/provider/${currentProvider}/`}>Provider details</Link>
        </div>
    );
}

export default IndexPage;