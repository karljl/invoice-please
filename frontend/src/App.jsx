import {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const [providers, setProviders] = useState([])
    const [invoices, setInvoices] = useState([])

    useEffect(
        () => {
            axios.get('http://127.0.0.1:8000/providers/')
                .then(response => {
                    setProviders(response.data)
                })
        }, []
    )

    const handleChange = (event) => {
        const index = event.target.value
        if (index !== '') {
            axios.get(`http://127.0.0.1:8000/providers/${index}/invoices/`)
                .then(response => {
                    setInvoices(response.data)
                })
        } else {
            setInvoices([])
        }
    }

    return (
        <>
            <select onChange={handleChange}>
                <option value=''>Select an option</option>
                {providers.map((provider, index) => (
                    <option key={index} value={provider.id}>{provider.name}</option>
                ))}
            </select>
            <br/>
            {invoices.map((invoice, index) => (
                <ul key={index}>
                    <li>{invoice.document_number}</li>
                    <li>{invoice.created}</li>
                    <li>{invoice.due_date}</li>
                </ul>
            ))}
        </>
    )
}

export default App
