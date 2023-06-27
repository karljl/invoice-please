import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Provider from "../components/Provider.jsx";

function CreateProvider() {
    const navigate = useNavigate();
    const providerData = {
        name: "",
        phone: "",
        email: "",
        address: "",
        postal_code: "",
        city: "",
        country: "",
        registry_code: "",
        vat_number: "",
        iban: "",
        bic_swift: ""
    };
    const [provider, setProvider] = useState(providerData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/providers/', provider);
            navigate('/');
        } catch (e) {
            alert('Error!');
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newData = {...provider, [name]: value};
        setProvider(newData);
    };


    return (
        <Provider handleChange={handleChange} handleSubmit={handleSubmit} provider={provider}/>
    );
}

export default CreateProvider;