import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img className="mr-10" width={40} height={40} src="./react-s-shop/img/logo.png" />
        <div>
          <Link to="/">
          <h3 className="text-uppercase">React And Boots</h3>
          <p className="opacity-5">Step by step</p></Link>
        </div>
      </div>
      <ul className="d-flex">
        <li className="cu-p " onClick={props.onClickCart}>
          <img width={18} height={18} src="./react-s-shop/img/cart.svg" className="mr-10" /><span>35 USD</span>
        </li>
        <li className="cu-p ">
          <Link to="/favorites">
          <img width={18} height={18} src="./react-s-shop/img/heart-icon.svg" /><span>Favorites</span>
          </Link>
        </li>
        <li className="cu-p">
          <Link to="/profile">
          <img width={18} height={18} src="./react-s-shop/img/user.svg" /> Profile
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;