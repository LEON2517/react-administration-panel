import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="">
        <div className="">
          <ul className="">
            <li className="">
              <Link className="" to="/account">Учетная запись</Link>
            </li>
            <li className="">
              <Link className="" to="/bills">Счет</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
