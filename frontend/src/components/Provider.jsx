import PropTypes from "prop-types";

function Provider({handleChange, handleSubmit, provider}) {
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

            <input type="submit" value="Submit" onClick={handleSubmit}/>
        </form>
    );
}

Provider.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    provider: PropTypes.object.isRequired,
};

export default Provider;