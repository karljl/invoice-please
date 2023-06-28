import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Customer from "../components/Customer.jsx";

function CreateCustomer() {
    const navigate = useNavigate();

    const customerData = {
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

    const [customer, setCustomer] = useState(customerData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/customers/', customer);
            navigate('/');
        } catch (e) {
            alert('Error!');
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const newData = {...customer, [name]: value};
        setCustomer(newData);
    };

    return (
        <form onChange={handleChange}>
            <Customer customer={customer}/>
            <input type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
    );
}

export default CreateCustomer;