import PropTypes from "prop-types";

function LineItem({lineItem}) {

    return (
        <>
            <input type="text" name="description" value={lineItem.description} placeholder="Description..."/>
            <input type="number" name="amount" value={lineItem.amount} placeholder="Amount..."/>
            <input type="number" name="price" value={lineItem.price} placeholder="Price..."/>
            <input type="number" name="total" value={lineItem.amount * lineItem.price} readOnly/>
        </>
    );
}

LineItem.propTypes = {
    lineItem: PropTypes.object.isRequired
};

export default LineItem;