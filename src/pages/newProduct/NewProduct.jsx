import "./newProduct.css";
import {useState} from 'react';
import { storage } from "../../firebase";
export default function NewProduct() {
  const [image,setImage]=useState(null)
  const onHandleChange=(e)=>{
  setImage(e.target.files[0])
  console.log(image)
  }
  const uploadImage=()=>{
    var storageRef = storage.ref();
    // Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + image.name).put(image);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on("STATE_CHANGED", // or 'state_changed'
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
   
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <div className="addProductForm">
        <div className="addProductItem">
          <label>Tên sản phẩm</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Giá</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Kiểu dáng</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Loại sản phẩm</label>
          <input type="text" placeholder="123" />
        </div>
        <div className="addProductItem">
          <label>Trạng thái</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          </div>
        <div className="addProductItem">
          <label>Kiểu giày</label>
          <select name="active" id="active">
            <option value="yes">Basas</option>
            <option value="no">Vintage</option>
          </select>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={(e)=>onHandleChange(e)} />
        </div>
        </div>
        <button onClick={uploadImage} className="addProductButton">Create</button>
      </div>
    </div>
  );
}
