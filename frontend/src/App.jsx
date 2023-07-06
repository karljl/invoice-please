import IndexPage from "./IndexPage.jsx";
import ProviderDetail from "./components/Provider/ProviderDetail.jsx";
import ProviderForm from "./components/Provider/ProviderForm.jsx";
import DeleteProvider from "./components/Provider/DeleteProvider.jsx";

import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {

    return (
        <div className="app">
            <Routes>
                <Route path="/" exact element={<IndexPage/>}/>

                <Route path="/provider/:id" element={<ProviderDetail/>}/>
                <Route path="/create-provider/" element={<ProviderForm/>}/>
                <Route path="/edit-provider/:id" element={<ProviderForm/>}/>
                <Route path="/delete-provider/:id" element={<DeleteProvider/>}/>
            </Routes>
        </div>
    );
}

export default App;
