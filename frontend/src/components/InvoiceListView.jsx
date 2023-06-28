import PropTypes from "prop-types";

function InvoiceListView({invoices}) {
    return (
        <table>
            <thead>
            <tr>
                <th>
                    Document Number
                </th>
                <th>
                    Created
                </th>
                <th>
                    Due date
                </th>
                <th>
                    Paid
                </th>
            </tr>
            </thead>
            <tbody>
            {invoices.map((invoice, index) => (
                <tr key={index}>
                    <td>
                        {invoice.document_number}
                    </td>
                    <td>
                        {invoice.created}
                    </td>
                    <td>
                        {invoice.due_date}
                    </td>
                    <td>
                        {invoice.is_paid ? 'Yes' : 'No'}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

InvoiceListView.propTypes = {
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default InvoiceListView;