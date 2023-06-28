import {Link} from "react-router-dom";

function IndexPage() {
    return (
        <nav>
            <Link to={"/customers"}>
                Customers
            </Link>
        </nav>
    )
}

export default IndexPage