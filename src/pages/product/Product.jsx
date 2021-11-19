import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from "react-router-dom";
import './product.css';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import React, { Component, useEffect, useState } from 'react';
import { db } from "../../firebase";
export default function Product() {
	const { productId } = useParams()
	const [data, setData] = useState({});
	const [price,setPrice] = useState(0)
	const [status,setStatus] = useState()
	useEffect(() => {
		fetchProduct()
	}, [productId])
	const fetchProduct = async () => {
		console.log('dddd', productId)
		await db.collection("products").doc(productId).get().
			then((doc) => {
				const list = {
					id:doc.id,
					image: Object.values(doc.data().image),
					name:doc.data().name,
					price:doc.data().price,
					status:doc.data().status,
					style:doc.data().style
					// price:doc.data().price
				}
				console.log(list);
				setPrice(doc.data().price)
				setStatus(doc.data().status)
				setData(list)
			})
	}
	const onChange=(event)=>{
		console.log(event.target.value)
		setPrice(event.target.value)
		
	}
	const handleChange=(event)=>{
		// console.log(event.target)
		setStatus(event.target.value)
	}
	return (
		<div className="product">
			<div className="productTitleContainer">
				<h1 className="productTitle">{data ? data.name : ''}</h1>
				<Link to="/newproduct">
					<button className="productAddButton">Create</button>
				</Link>
			</div>
			<div className="productTop">
				{/* <div className="productTopLeft">
					<Chart data={productData} dataKey="Sales" title="Sales Performance" />
				</div> */}
				<div className="productTopRight">
					<div className="productInfoTop">
						{data.image?<img
							src={data.image[0]}
							alt=""
							className="productInfoImg"
						/>:null}
						<span className="productName">{data ? data.fashion : ''}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">Trạng thái</span>
							<span className="productInfoValue">{data ? data.status : ''}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">Giá</span>
							<span className="productInfoValue">{data ? data.price : ''}đ</span>
						</div>
						{/* <div className="productInfoItem">
							<span className="productInfoKey">active:</span>
							<span className="productInfoValue">yes</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">in stock:</span>
							<span className="productInfoValue">no</span>
						</div> */}
					</div>
				</div>
			</div>
			<div className="productBottom">
				<form className="productForm">
					<div className="productFormLeft">
						<label>Giá</label>
						<input value={price} type="number" onChange={onChange} placeholder="Thay đổi giá" />
						{/* <label>Thay đổi trạng thái</label>
						<select name="inStock" id="idStock">
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select> */}
						<label>Thay đổi trạng thái</label>
						<select value={status} onChange={handleChange} name="active" id="active">
							<option value="New Arrive">New Arrive</option>
							<option value="Sale Off">Sale Off</option>
							<option value="Best Seller">Best Seller</option>
						</select>
					</div>
					<div className="productFormRight">
						<div className="productUpload">
							{data.image?<img
								src={data.image[0]}
								alt=""
								className="productUploadImg"
							/>:null}
							<label for="file">
								<Publish />
							</label>
							<input type="file" id="file" style={{ display: 'none' }} />
						</div>
						<button className="productButton">Update</button>
					</div>
				</form>
			</div>
		</div>
	);
}
