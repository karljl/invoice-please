import PropTypes from "prop-types";
import dayjs from "dayjs";

function InvoiceListView({invoices}) {
    return (
        <table>
            <thead>
            <tr>
                <th className="document-number">
                    Document Number
                </th>
                <th className="created">
                    Created
                </th>
                <th className="due-date">
                    Due date
                </th>
                <th className="paid">
                    Paid
                </th>
            </tr>
            </thead>
            <tbody>
            {invoices.map((invoice, index) => (
                <tr key={index}>
                    <td className="document-number">
                        {invoice.document_number}
                    </td>
                    <td className="created">
                        {dayjs(invoice.created).format('DD/MM/YYYY')}
                    </td>
                    <td className="due-date">
                        {dayjs(invoice.due_date).format('DD/MM/YYYY')}
                    </td>
                    <td className="paid">
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