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
import { createRef } from "react";

export default function Product() {
	const { productId } = useParams()
	const [data, setData] = useState({});
	const [percent, setPercent] = useState(0)
	const [status, setStatus] = useState()
	const [price, setPrice] = useState(0)
	const [priceRef, setPriceRef] = useState(0)
	useEffect(() => {
		fetchProduct()
	}, [productId])
	const fetchProduct = async () => {
		console.log('dddd', productId)
		await db.collection("products").doc(productId).get().
			then((doc) => {
				const list = {
					id: doc.id,
					image: Object.values(doc.data().image),
					name: doc.data().name,
					price: doc.data().price,
					status: doc.data().status,
					style: doc.data().style
				}
				// console.log(list);
				setPriceRef(doc.data().price)
				setPrice(doc.data().price)
				setStatus(doc.data().status)
				setData(list)
				// priceRef=doc.data().price
			})
	}
	const onChangeDiscount = (event) => {
		console.log(event.target.value)
		setPercent(event.target.value)
		// console.log(price)
		// console.log(priceRef)
		let temp=priceRef-percent*priceRef
		console.log(temp)
		setPrice(temp)

	}
	const handleChange = (event) => {
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
			{/* <div className="productTop">
				<div className="productTopRight">
					
				</div>
			</div> */}
			<div className="productBottom">
				<form className="productForm">
					{/* <div className="productInfoTop"> */}
					{/* {data.image ? <img
							src={data.image[0]}
							alt=""
							className="productInfoImg"
						/> : null}
						<span className="productName">{data ? data.fashion : ''}</span> */}
					{/* </div> */}
					<div class="productFormLeft">
						<div className="productInfoBottom">
							<div className="productInfoItem">
								<span className="productInfoKey">Trạng thái</span>
								<span className="productInfoValue">{data ? data.status : ''}</span>
							</div>
							<div className="productInfoItem">
								<span className="productInfoKey">Giá</span>
								<span className="productInfoValue">{data ? data.price : ''}đ</span>
							</div>
							<div className="productInfoItem">
								<label>Giảm giá xuống</label>
								<select onChange={onChangeDiscount} value={percent} name="active" id="active">
									<option value={0}></option>
									<option value={0.1}>-10%</option>
									<option value={0.2}>-20%</option>
									<option value={0.3}>-30%</option>
									<option value={0.4}>-40%</option>
									<option value={0.5}>-50%</option>
									<option value={0.6}>-60%</option>
								</select>
							</div>
							<div className="productInfoItem">
								<span className="productInfoKey">Giá sau khi giảm</span>
								<span className="productInfoValue">{price}đ</span>
							</div>
							<div className="productInfoItem">
								<label>Thay đổi trạng thái</label>
								<select value={status} onChange={handleChange} name="active" id="active">
									<option value="New Arrive">New Arrive</option>
									<option value="Sale Off">Sale Off</option>
									<option value="Best Seller">Best Seller</option>
								</select>
							</div>
							<div className="productInfoTop">
								{data.image ? data.image.map((image) => {
									return <img
										src={image}
										alt=""
										className="productInfoImg"
									/>
								}) : null}
								<span className="productName">{data ? data.fashion : ''}</span>
							</div>
							<button className="productButton">Update</button>
						</div>
					</div>
					{/* <div className="productFormRight">
						<div className="productUpload">
							{data.image ? <img
								src={data.image[0]}
								alt=""
								className="productUploadImg"
							/> : null}
							<label for="file">
								<Publish />
							</label>
							<input type="file" id="file" style={{ display: 'none' }} />
						</div>
					</div> */}
				</form>
			</div>
		</div>
	);
}
