import "./style.css";
import { useState } from "react";
export default function InputText({ label, onChange, type }) {
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
    </div>
  );
}
