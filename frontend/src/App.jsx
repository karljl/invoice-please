import CreateCustomer from "./pages/CreateCustomer.jsx";
import CreateProvider from "./pages/CreateProvider.jsx";
import EditCustomer from "./pages/EditCustomer.jsx";

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
                        <Link to="/providers">Providers</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/customers" element={<CreateCustomer/>}/>
                <Route path="/edit-customer/:id" element={<EditCustomer/>}/>
                <Route path="/providers" element={<CreateProvider/>}/>
                <Route path="/" element={<Navigate to="/"/>}/>
            </Routes>
        </>
    );
}

export default App;
