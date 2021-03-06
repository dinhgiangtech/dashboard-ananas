import "./newProduct.css";

import { storage } from "../../firebase";
import CloseIcon from '@material-ui/icons/Close';
import InputText from "../../components/input"
import React, { Component,useState }  from 'react';

export default function UpdateProduct() {
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
      <h1 className="addProductTitle">S???n ph???m m???i</h1>
      <div className="left">
        <div className="addProductForm">
                <InputText label={"T??n s???n ph???m"} value={name} onChange={onChangeName}></InputText>
                <InputText type="number" label={"Gi??"}  value={name} onChange={onChangePrice} ></InputText>
          <div className="addProductItem">
            <label>Lo???i s???n ph???m</label>
            <select name="active" id="active">
              <option value="Basas">Gi??y</option>
              <option value="Vintage">??o</option>
              <option value="Urbas">Ph??? ki???n ??i k??m</option>
              <option value="Pattas">Pattas</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Tr???ng th??i</label>
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
        <label>Ki???u d??ng</label>
        <select name="active" id="active">
          <option value="Low Top">Low Top</option>
          <option value="High Top">High Top</option>
        </select>
      </div>
      <div className="right">
        <div className="addProductItem">
          <label>Th??m m?? t???</label>
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
          TH??M S???N PH???M
        </button>
      </div>
    </div>
  );
}
