import PropTypes from "prop-types";

function Customer({handleChange, handleSubmit, customer}) {
    return (
        <form onChange={handleChange}>
            <input type="text" name="name" value={customer.name} placeholder="Name..."/>

            <input type="tel" name="phone" value={customer.phone} placeholder="Phone..."/>
            <input type="email" name="email" value={customer.email} placeholder="E-mail..."/>

            <input type="text" name="address" value={customer.address} placeholder="Address..."/>
            <input type="text" name="postal_code" value={customer.postal_code} placeholder="Postal code..."/>
            <input type="text" name="city" value={customer.city} placeholder="City..."/>
            <input type="text" name="country" value={customer.country} placeholder="Country..."/>

            <input type="text" name="registry_code" value={customer.registry_code} placeholder="Registry code..."/>
            <input type="text" name="vat_number" value={customer.vat_number} placeholder="VAT number..."/>

            <input type="text" name="iban" value={customer.iban} placeholder="IBAN..."/>
            <input type="text" name="bic_swift" value={customer.bic_swift} placeholder="BIC/SWIFT..."/>

            <input type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
    );
}

Customer.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired,
};

export default Customer;