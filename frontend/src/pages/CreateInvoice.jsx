import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

import Invoice from "../components/Invoice.jsx";
import LineItem from "../components/LineItem.jsx";

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
        'customer': '0',
        'is_paid': false
    };

    const [invoice, setInvoice] = useState(invoiceData);

    const lineItemData = {
        'description': '',
        'amount': 0,
        'price': 0,
        'total': 0
    };

    const [lineItems, setLineItems] = useState([lineItemData]);

    function handleChangeInvoice(e) {
        const {name, value} = e.target;
        setInvoice({...invoice, [name]: value});
    }

    function handleAddLineItem(event) {
        event.preventDefault();
        const newLineItems = [...lineItems];
        newLineItems.push(lineItemData);
        setLineItems(newLineItems);
    }

    function handleRemoveLineItem(event, index) {
        event.preventDefault();
        const newLineItems = [...lineItems];
        newLineItems.splice(index, 1);
        setLineItems(newLineItems);
    }

    function handleChangeLineItem(event, index) {
        const {name, value} = event.target;
        const newLineItem = {
            ...lineItems[index],
            [name]: value
        };
        newLineItem.total = newLineItem.amount * newLineItem.price;

        const newLineItems = lineItems.slice();
        newLineItems[index] = newLineItem;
        setLineItems(newLineItems);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data: newInvoice} = await axios.post(`http://127.0.0.1:8000/invoices/new/`, invoice);
            const lineItemRequests = lineItems.map(lItem => {
                const data = {...lItem, 'invoice': newInvoice.id};
                return axios.post('http://127.0.0.1:8000/lineitems/new/', data);
            });
            await Promise.all(lineItemRequests);
            navigate('/');
        } catch (e) {
            alert('Error!');
        }
    };

    return (
        <form>
            <div onChange={handleChangeInvoice}>
                <Invoice invoice={invoice} customers={customers}/>
            </div>
            <div>
                <button disabled={lineItems.length > 3} onClick={handleAddLineItem}>ADD NEW ROW</button>
            </div>
            <div>
                {lineItems.map((lItem, index) => (
                    <div key={index} onChange={(e) => {
                        handleChangeLineItem(e, index);
                    }}>
                        <LineItem lineItem={lItem}/>
                        {lineItems.length > 1 && <button onClick={(e) => {
                            handleRemoveLineItem(e, index);
                        }}>DELETE</button>}
                    </div>
                ))}
            </div>
            <input disabled={invoice.customer === '0'} type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
    );
}

export default CreateInvoice;