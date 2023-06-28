import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-item new-invoice">
                    <Link to={'#'}>Create a new invoice</Link>
                </div>
                <div className="nav-item">
                    <Link to={'#'}>I am also a navbar item</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;