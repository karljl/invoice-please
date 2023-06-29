import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

import Invoice from "../components/Invoice.jsx";

function CreateInvoice() {

    useEffect(() => {
            axios.get('http://127.0.0.1:8000/customers/')
                .then(response => {
                    setCustomers(response.data);
                });
        }, []
    );

    const params = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const invoiceData = {
        'document_number': '',
        'created': '',
        'due_date': '',
        'provider': params.provider,
        'customer': '',
        'is_paid': false
    };

    const [invoice, setInvoice] = useState(invoiceData);

    function handleChange(e) {
        const {name, value} = e.target;
        setInvoice({...invoice, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(invoice)
        try {
            await axios.post(`http://127.0.0.1:8000/invoices/new/`, invoice);
            navigate('/');
        } catch (e) {
            alert('Error!');
        }
    };

    return (
        <form onChange={handleChange}>
            <Invoice invoice={invoice} customers={customers}/>
            <input type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
    );
}

export default CreateInvoice;