import "./newProduct.css";

import { storage, db } from "../../firebase";
import CloseIcon from "@material-ui/icons/Close";
import InputText from "../../components/input";
import React, { Component, useState, useMemo } from "react";
const isNotEmpty = (text) => {
  if (text.length > 0) {
    return true;
  }
  return false;
};
const validatePrice = (number) => {
  if (number > 0) {
    return true;
  }
  return false;
};
export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [des, setDes] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorDes, setErrorDes] = useState("");
  const [dataType,setDataType] = useState([])

  const [fashion,setFashion] = useState("")
  const onHandleChange = (e) => {
    console.log(e.target.files[0]);
    setImages([...images, e.target.files[0]]);
  };
  const onChangeFashion=(value)=>{
    console.log(value.target.value)
    setFashion(value.target.value)
  }
  const removeImage = (del) => {
    const img = images.filter((item) => item.name !== del.name);
    setImages(img);
  };
  const uploadImage = async () => {
    let checkName = isNotEmpty(name);
    let checkPrice = validatePrice(price);
    let checkDes = isNotEmpty(des);
    !checkName ? setErrorName("Tên không được để trống") : null;
    !checkPrice ? setErrorPrice("Giá tiền phải lớn hơn không") : null;
    !checkDes ? setErrorDes("Thông tin mô tả không được bỏ trống") : null;
    console.log(checkDes || checkPrice || checkDes);
    if (checkDes || checkPrice || checkDes) {
      if (images.length > 0) {
        const promises = images.map((image) => {
          const ref = storage.ref().child(`images/${image.name}`);
          return ref.put(image.uploadTask).then(() => ref.getDownloadURL());
        });

        Promise.all(promises)
          .then((fileDownloadUrls) => {
            console.log(Object.assign({}, fileDownloadUrls))
            // console.log()
            // db.collection("products").add({
            //   // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //   // title: title,
            //   // description: description,
            //   // pictures: fileDownloadUrls,
            //   // user: user.uid,
            // });
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const onChangeName = (value) => {
    setName(value);
  };
  const onChangePrice = (value) => {
    const priceValid = value.replace(/\+|-/gi, "");
    setPrice(priceValid);
    console.log(priceValid);
  };
  const loadType=useMemo(()=>{
    if(fashion==="shirt")
    {
      return setDataType(["Graphic Tee","SweetShirt","Hoodie"])
    }
    if(fashion==="Shoe")
    {
      return setDataType(["Basas","Vintage","Urbas","Pattas"])
    }
  },[fashion])

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Sản phẩm mới</h1>
      <div className="left">
        <div className="addProductForm">
          <InputText
            error={errorName}
            label={"Tên sản phẩm"}
            value={name}
            onChange={onChangeName}
          ></InputText>
          <InputText
            error={errorPrice}
            type="number"
            label={"Giá"}
            value={name}
            onChange={onChangePrice}
          ></InputText>
          <div className="addProductItem">
            <label>Loại sản phẩm</label>
            <select onChange={onChangeFashion} value={fashion} name="active" id="active">
              <option value="shirt">Áo</option>
              <option value="Shoe">Giày</option>
              <option value="accessories">Phụ kiện đi kèm</option>
              {/* <option value="Pattas">Pattas</option> */}
            </select>
          </div>
          <div className="addProductItem">
            <label>Kiểu mẫu</label>
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
          <span>{errorDes}</span>
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
}
