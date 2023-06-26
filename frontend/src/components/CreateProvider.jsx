import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CreateProvider() {
    const navigate = useNavigate()
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
    }
    const [provider, setProvider] = useState(providerData)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/providers/', provider)
            navigate('/')
        } catch (e) {
            alert('Error!')
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        const newData = {...provider, [name]: value}
        setProvider(newData)
    }


    return (
        <form onChange={handleChange}>
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

            <input type="submit" value="Create a new Provider" onClick={handleSubmit}/>
        </form>
    )
}

export default CreateProvider