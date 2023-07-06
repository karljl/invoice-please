import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

function ProviderForm() {
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

    const {id} = useParams();
    const navigate = useNavigate();
    const [isExistingProvider, setIsExistingProvider] = useState(false);
    const [provider, setProvider] = useState(providerData);

    useEffect(
        () => {
            if (id !== undefined) {
                setIsExistingProvider(true);
                axios.get(`http://127.0.0.1:8000/providers/${id}/`)
                    .then(response => {
                        setProvider(response.data);
                    });
            }
        }, [id]
    );

    function handleChange(e) {
        const {name, value} = e.target;
        const newData = {...provider, [name]: value};
        setProvider(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let request;
        if (isExistingProvider) {
            request = axios.put(`http://127.0.0.1:8000/providers/${id}/`, provider);
        } else {
            request = axios.post('http://127.0.0.1:8000/providers/', provider);
        }
        request.then(() => {
            navigate('/');
        });
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input type="text" name="name" value={provider.name} placeholder="Name..."/>

            <input type="tel" name="phone" value={provider.phone} placeholder="Phone..."/>
            <input type="email" name="email" value={provider.email} placeholder="E-mail..."/>

            <input type="text" name="address" value={provider.address} placeholder="Address..."/>
            <input type="text" name="postal_code" value={provider.postal_code} placeholder="Postal code..."/>
            <input type="text" name="city" value={provider.city} placeholder="City..."/>
            <input type="text" name="country" value={provider.country} placeholder="Country..."/>

            <input type="text" name="registry_code" value={provider.registry_code} placeholder="Registry code..."/>
            <input type="text" name="vat_number" value={provider.vat_number} placeholder="VAT number..."/>

            <input type="text" name="iban" value={provider.iban} placeholder="IBAN..."/>
            <input type="text" name="bic_swift" value={provider.bic_swift} placeholder="BIC/SWIFT..."/>

            <input type="submit" value="Submit"/>
        </form>
    );
}

export default ProviderForm;