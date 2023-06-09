import CreateCustomer from "./pages/CreateCustomer.jsx";
import CreateProvider from "./pages/CreateProvider.jsx";
import EditCustomer from "./pages/EditCustomer.jsx";
import IndexPage from "./pages/IndexPage.jsx";

import {Route, Routes} from "react-router-dom";

import './App.css';
import CreateInvoice from "./pages/CreateInvoice.jsx";

function App() {

    return (
        <div className="app">
            <Routes>
                <Route path="/" exact element={<IndexPage/>}/>
                <Route path="/customers" element={<CreateCustomer/>}/>
                <Route path="/edit-customer/:id" element={<EditCustomer/>}/>
                <Route path="/providers" element={<CreateProvider/>}/>
                <Route path="/create-invoice/:provider" element={<CreateInvoice/>}/>
            </Routes>
        </div>
    );
}

export default App;
