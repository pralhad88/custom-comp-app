import React from 'react';

export default function Header() { // Created functional based component for app header.
  return ( 
    <div className="header">
        <a href="#" className="logo">Logo</a>
        <div className="header-right">
            <a href="#">Home</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
        </div>
    </div>
  );
}
