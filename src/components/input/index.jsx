import "./style.css";
import React, { Component,useState }  from 'react';
export default function InputText({ label, onChange,error, type }) {
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="addProductItem">
      <label>{label}</label>
      <input
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        type={type}
        placeholder="Tên sản phẩm"
      />
      <span className="addProductItem">{error}</span>
    </div>
  );
}
