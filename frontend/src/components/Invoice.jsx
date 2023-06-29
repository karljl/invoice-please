import PropTypes from "prop-types";

function Invoice({invoice, customers}) {
    return (
        <>
            <input type="text" name="document_number" value={invoice.document_number} placeholder="Document number..."/>
            <input type="date" name="created" value={invoice.created}/>
            <input type="date" name="due_date" value={invoice.due_date}/>
            <select name="customer">
                {customers.map((customer, index) => (
                    <option key={index} value={customer.id}>{customer.name}</option>
                ))}
            </select>
            <input type="text" name="provider" value={invoice.provider} readOnly/>
            <input type="checkbox" name="is_paid" disabled checked={false}/>
        </>
    );
}

Invoice.propTypes = {
    invoice: PropTypes.object.isRequired,
    customers: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Invoice;