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
let sizeShoe = Object.assign({}, [35, 36, 37, 38]);
let sizeShirt = Object.assign({}, ["M", "L", "S", "X"]);
export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [des, setDes] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const [errorDes, setErrorDes] = useState("");
  const [dataType, setDataType] = useState([]);
  const [style, setStyle] = useState("High Top");
  const [fashion, setFashion] = useState("Shoe");
  const [status,setStatus] = useState("New Arrive");
  const [type,setType] = useState("Basas")
  const onHandleChange = (e) => {
    console.log(e.target.files[0]);
    setImages([...images, e.target.files[0]]);
  };
  const onChangeFashion = (value) => {
    console.log(value.target.value);
    setFashion(value.target.value);
  };
  const removeImage = (del) => {
    const img = images.filter((item) => item.name !== del.name);
    setImages(img);
  };
  const onChangeDescription = (e) => {
    console.log(e.target.value);
    setDes(e.target.value);
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
            console.log(Object.assign({}, fileDownloadUrls));
            let size = fashion === "Shoe" ? sizeShoe : sizeShirt;
            // let ob = {
            //   name: name,
            //   price: price,
            //   description: des,
            //   image: Object.assign({}, fileDownloadUrls),
            //   fashion: fashion,
            //   style: fashion==="Shoe"?style:"",
            //   size: fashion === "accessories" ? "free" : size,
            //   status:status,
            //   realprice:0,
            //   type:type
            // }
            // console.log(ob);

            db.collection("products").add({
              name: name,
              price: price,
              description: des,
              image: Object.assign({}, fileDownloadUrls),
              fashion: fashion,
              style: style,
              size: fashion === "accessories" ? "free" : size,
              status:status,
              realprice:0,
              type:type
            });
          }).then(()=>alert("Thêm sản phẩm thành công"))
          .catch((err)=>alert("Đã xảy ra sự cố"));
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
  const loadType = useMemo(() => {
    if (fashion === "shirt") {
      setDataType(["Graphic Tee", "SweetShirt", "Hoodie"]);
      return dataType.map((value) => {
        return <option value={value}>{value}</option>;
      });
    }
    if (fashion === "Shoe") {
      setDataType(["Basas", "Vintage", "Urbas", "Pattas"]);
      return dataType.map((value) => {
        return <option value={value}>{value}</option>;
      });
    }
    if (fashion === "accessories") {
      setDataType(["Hat"]);
      return dataType.map((value) => {
        return <option value={value}>{value}</option>;
      });
    }
  }, [fashion]);

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
            <select
              onChange={onChangeFashion}
              value={fashion}
              name="active"
              id="active"
            >
              <option value="shirt">Áo</option>
              <option value="Shoe">Giày</option>
              <option value="accessories">Phụ kiện đi kèm</option>
              {/* <option value="Pattas">Pattas</option> */}
            </select>
          </div>
          <div className="addProductItem">
            <label>Kiểu mẫu</label>
            <select onChange={(e)=>setType(e.target.value)} value={type} name="active" id="active">
              {/* {loadType} */}
              {dataType.map((value) => {
                return <option value={value}>{value}</option>;
              })}
              {/* <option value="Basas">Basas</option>
              <option value="Vintage">Vintage</option>
              <option value="Urbas">Urbas</option>
              <option value="Pattas">Pattas</option> */}
            </select>
          </div>
          <div className="addProductItem">
            <label>Trạng thái</label>
            <select onChange={(e)=>setStatus(e.target.value)} value={status} name="active" id="active">
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
        <select
          onChange={(e) => setStyle(e.target.value)}
          value={style}
          name="active"
          id="active"
        >
          <option value="Low Top">Low Top</option>
          <option value="High Top">High Top</option>
        </select>
      </div>
      <div className="addProductItem">
        <label>Size</label>
        <select name="active" id="active">
          <option value="Shoe">42 43 44 45 46</option>
          <option value="shirt">M L S </option>
          <option value="accessories">Free</option>
        </select>
      </div>
      <div className="right">
        <div className="addProductItem">
          <label>Thêm mô tả</label>
          <textarea onChange={onChangeDescription} className="wrapTextArea" />
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
                  <img className="img" src={URL.createObjectURL(item)} />
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
