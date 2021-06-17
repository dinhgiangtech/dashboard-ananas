import "./newProduct.css";
import { useState } from "react";
import { storage } from "../../firebase";
export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const list=[]
  const onHandleChange = (e) => {
    setImages([...images,e.target.files[0]])
  };
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
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Sản phẩm mới</h1>
      <div className="left">
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Tên sản phẩm</label>
          <input type="text" placeholder="Tên sản phẩm" />
        </div>
        <div className="addProductItem">
          <label>Giá</label>
          <input type="text" placeholder="VNĐ" />
        </div>
        <div className="addProductItem">
          <label>Kiểu dáng</label>
          <select name="active" id="active">
            <option value="Low Top">Low Top</option>
            <option value="High Top">High Top</option>
          </select>
        </div>
        </div>
        <div>
        <div className="addProductItem">
          <label>Loại sản phẩm</label>
          <input type="text" placeholder="123" />
        </div>
      </div>
    </div>

      <div className="right">  
        <div className="addProductItem">
          <label>Trạng thái</label>
          <select name="active" id="active">
            <option value="New Arrive">New Arrive</option>
            <option value="Sale">Sale</option>
            <option value="Best Seller">Best Seller</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Kiểu giày</label>
          <select name="active" id="active">
            <option value="yes">Basas</option>
            <option value="no">Vintage</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Thêm mô tả</label>
         <textarea/>
        </div>

          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" onChange={(e) => onHandleChange(e)} />
          </div>
          {
            images?
            images.map((item)=>{
              return <div className="wrapImage"><img className="img" src={URL.createObjectURL(item)} width="150px" height="150px"/></div>
            }):null
          }
        

        </div>
        <div className="btSubmit">
        <button onClick={uploadImage} className="addProductButton">
          THÊM SẢN PHẨM
        </button>
        </div>
    </div>
  );
}
