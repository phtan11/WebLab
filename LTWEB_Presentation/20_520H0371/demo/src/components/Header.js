import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <a className="navbar-brand">
          Thế Giới Di Động
        </a>
        <ul className="nav navbar-nav">
          <li>
            <a>Trang Chủ</a>
          </li>
          
          <li className="active">
            <a >Sản Phẩm</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
