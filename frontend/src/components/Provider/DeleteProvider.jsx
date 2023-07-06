import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function DeleteProvider() {
    const {id} = useParams();
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    function handleDelete() {
        axios.delete(`http://127.0.0.1:8000/providers/${id}/`)
            .then(() => {
                navigate('/');
            });
    }

    return (
        <div>
            <p>Are you sure you wish to delete?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleGoBack}>No</button>
        </div>
    );
}

export default DeleteProvider;