import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function ProviderDetail() {
    const {id} = useParams();
    const [provider, setProvider] = useState({});

    useEffect(
        () => {
            axios.get(`http://127.0.0.1:8000/providers/${id}/`)
                .then(response => {
                    setProvider(response.data);
                });
        }, [id]
    );

    if (!provider) {
        return <></>;
    }

    return (
        <div>
            <h1>{provider.name}</h1>

            <p>{provider.phone}</p>
            <p>{provider.email}</p>

            <p>{provider.address}</p>
            <p>{provider.postal_code}</p>
            <p>{provider.city}</p>
            <p>{provider.country}</p>

            <p>{provider.registry_code}</p>
            <p>{provider.vat_number}</p>

            <p>{provider.iban}</p>
            <p>{provider.bic_swift}</p>

            <Link to={`/edit-provider/${id}/`}>Edit</Link>
            <Link to={`/delete-provider/${id}/`}>Delete</Link>
        </div>
    );
}

export default ProviderDetail;