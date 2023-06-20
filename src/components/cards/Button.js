import React from 'react';

const Button = ({ text, url }) => {
    const prevent = (event) =>{
        event.preventDefault()
    }
  return (
    <button>
      <a  href={url} onClick={prevent}>{text}</a>
    </button>
  );
};

export default Button;