<<<<<<< HEAD
import './newProduct.css';
import React, { Component } from 'react';
export default function NewProduct() {
	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Product</h1>
			<form className="addProductForm">
				<div className="addProductItem">
					<label>Image</label>
					<input type="file" id="file" />
				</div>
				<div className="addProductItem">
					<label>Name</label>
					<input type="text" placeholder="Apple Airpods" />
				</div>
				<div className="addProductItem">
					<label>Stock</label>
					<input type="text" placeholder="123" />
				</div>
				<div className="addProductItem">
					<label>Active</label>
					<select name="active" id="active">
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
				<button className="addProductButton">Create</button>
			</form>
		</div>
	);
=======
import "./newProduct.css";
import { useState } from "react";
import { storage } from "../../firebase";
import CloseIcon from '@material-ui/icons/Close';
import InputText from "../../components/input";
export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [name,setName]=useState('')
  const [price,setPrice]=useState(0)
  const onHandleChange = (e) => {
    setImages([...images, e.target.files[0]]);
  };
  const removeImage=(del)=>{
    console.log(del.name)
    const img=images.filter((item)=>item.name!==del.name)
    setImages(img)
  }
  const uploadImage = () => {
    // var storageRef = storage.ref();
    // // Upload file and metadata to the object 'images/mountains.jpg'
    // var uploadTask = storageRef.child("images/" + image.name).put(image);    // // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on(
    //   "STATE_CHANGED", // or 'state_changed'
    //   (snapshot) => {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //   },
    //   (error) => {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case "storage/unauthorized":
    //         break;
    //       case "storage/canceled":
    //         break;
    //       case "storage/unknown":
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
  };
  const onChangeName=(value)=>{
    setName(value)
  }
  const onChangePrice=(value)=>{
    const priceValid= value.replace(/\+|-/ig, '');
    setPrice(priceValid)
    console.log(priceValid)

  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Sản phẩm mới</h1>
      <div className="left">
        <div className="addProductForm">
                <InputText label={"Tên sản phẩm"} value={name} onChange={onChangeName}></InputText>
                <InputText type="number" label={"Giá"}  value={name} onChange={onChangePrice} ></InputText>
          <div className="addProductItem">
            <label>Loại sản phẩm</label>
            <select name="active" id="active">
              <option value="Basas">Giày</option>
              <option value="Vintage">Áo</option>
              <option value="Urbas">Phụ kiện đi kèm</option>
              <option value="Pattas">Pattas</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Trạng thái</label>
            <select name="active" id="active">
              <option value="New Arrive">New Arrive</option>
              <option value="Sale Off">Sale</option>
              <option value="Best Seller">Best Seller</option>
            </select>
          </div>
        </div>
        <div></div>
      </div>
      <div className="addProductItem">
        <label>Kiểu dáng</label>
        <select name="active" id="active">
          <option value="Low Top">Low Top</option>
          <option value="High Top">High Top</option>
        </select>
      </div>
      <div className="right">
        <div className="addProductItem">
          <label>Thêm mô tả</label>
          <textarea className="wrapTextArea" />
        </div>

        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e) => onHandleChange(e)} />
        </div>
        {images
          ? images.map((item) => {
              return (
                <div className="wrapImage">
                  <img
                    className="img"
                    src={URL.createObjectURL(item)}
                    width="150px"
                    height="150px"
                  />
                  <CloseIcon
                    onClick={() => removeImage(item)}
                    className="icon"
                  />
                </div>
              );
            })
          : null}
      </div>
      <div className="btSubmit">
        <button onClick={uploadImage} className="addProductButton">
          THÊM SẢN PHẨM
        </button>
      </div>
    </div>
  );
>>>>>>> 8ec2860fc4302886bd3d8afbc52a7a6d7677576a
}
