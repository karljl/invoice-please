import axios from "axios";

import InvoiceListView from "../components/InvoiceListView.jsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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
    const [currentProvider, setCurrentProvider] = useState('0');

    function handleChange(e) {
        const id = e.target.value;
        setCurrentProvider(id);
        if (id !== '0') {
            axios.get(`http://127.0.0.1:8000/providers/${id}/invoices/`)
                .then(response => {
                    setInvoices(response.data);
                });
        }

    }

    return (
        <>
            <select defaultValue="0" onChange={handleChange}>
                <option value="0">SELECT YOUR COMPANY</option>
                {providers.map((provider, index) => (
                    <option key={index} value={provider.id}>{provider.name}</option>
                ))}
            </select>
            {currentProvider !== '0' && <Link to={`/create-invoice/${currentProvider}`}>CREATE NEW INVOICE</Link>}
            {invoices.length > 0
                ? <InvoiceListView invoices={invoices}/>
                : 'There are no invoices to display :)'}
        </>

    );
}

export default IndexPage;