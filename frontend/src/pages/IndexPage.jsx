import axios from "axios";

import InvoiceListView from "../components/InvoiceListView.jsx";
import {useEffect, useState} from "react";

function IndexPage() {
    useEffect(
        () => {
            axios.get('http://127.0.0.1:8000/providers/')
                .then(response => {
                    setProviders(response.data);
                });
        }, []
    );

    const [invoices, setInvoices] = useState([]);
    const [providers, setProviders] = useState([]);

    function handleChange(e) {
        const id = e.target.value;
        axios.get(`http://127.0.0.1:8000/providers/${id}/invoices/`)
            .then(response => {
                setInvoices(response.data);
            });
    }

    return (
        <>
            <select onChange={handleChange}>
                <option value="0" selected disabled>Select your company</option>
                {providers.map((provider, index) => (
                    <option key={index} value={provider.id}>{provider.name}</option>
                ))}
            </select>
            <InvoiceListView invoices={invoices}/>
        </>

    );
}

export default IndexPage;