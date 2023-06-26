import CreateCustomer from "./components/CreateCustomer.jsx";
import CreateProvider from "./components/CreateProvider.jsx";
import EditCustomer from "./components/EditCustomer.jsx";

import {Route, Routes, Link, Navigate} from "react-router-dom";

function App() {

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/customers">Customers</Link>
                    </li>
                    <li>
                        <Link to="/edit-customer">Edit Customer</Link>
                    </li>
                    <li>
                        <Link to="/providers">Providers</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/customers" element={<CreateCustomer/>}/>
                <Route path="/edit-customer" element={<EditCustomer/>}/>
                <Route path="/providers" element={<CreateProvider/>}/>
                <Route path="/" element={<Navigate to="/"/>}/>
            </Routes>
        </>
    )
}

export default App
