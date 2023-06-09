import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Customer from "../components/Customer.jsx";

function EditCustomer() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/customers/${params.id}/`)
            .then((response) => {
                setCustomer(response.data);
            });
    }, [params.id]);

    const [customer, setCustomer] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/customers/${params.id}/`, customer);
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
            <input type="submit" value={'Submit'} onClick={handleSubmit}/>
        </form>

    );
}

export default EditCustomer;