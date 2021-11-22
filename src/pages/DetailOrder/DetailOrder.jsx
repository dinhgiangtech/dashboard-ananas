import "./newProduct.css";

import { storage,db } from "../../firebase";
import CloseIcon from '@material-ui/icons/Close';
import InputText from "../../components/input"
import React, { Component, useState, useEffect} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams
} from "react-router-dom";
export default function UpdateProduct() {
	const [data,setData] = useState({})
	const { orderId } = useParams()
	useEffect(()=>{
		fetchOrder(orderId)
	},[orderId])
	const fetchOrder=async(orderId)=>{
		await db.collection("order").doc(orderId).get().
			then((doc) => {
				let temp={
					id:doc.data().orderId,
					address:doc.data().address,
					date:doc.data().date,
					products:doc.data().product,
					name:doc.data().fname + " "+ doc.data().lname,
					number:doc.data().number,
					status: doc.data().statusConfirm ? "ĐANG GIAO" : "XÁC NHẬN GIAO",
					price:doc.data().price
				}
				console.log(temp)
				setData(temp)
			})
			.catch((error)=>{alert("Đã xảy ra lỗi,vui lòng thử lại",error)})

	}
	return (
		<div className="newProduct">
			<h1 className="addProductTitle">Sản phẩm mới</h1>
			<div className="left">
				<div>
					<div className="wrapItem">
						<label className="label">Tên người đặt:   </label>
						<span>{data.name}</span>
					</div>
					<div className="wrapItem">
						<label className="label">Số điện thoại:   </label>
						<span>{data.number}</span>
					</div>
					<div className="wrapItem">
						<label className="label">Trạng thái:   </label>
						<span>{data.status}</span>
					</div>
					<div className="wrapItem">
						<label className="label">ĐỊA CHỈ:   </label>
						<span>{data.address}</span>
					</div>
					<div className="wrapProduct" >
						<label className="label">CÁC SẢN PHẨM ĐẶT MUA:   </label>
						<div>
							{data.products?data.products.map((item)=>{
								return(
									<div className="item">
										<span class="name">Tên sản phẩm: {item.name}</span>
										<span className="name">Size :{item.size}</span>
									</div>
								)
							}):null}</div>
					</div>
					<div className="wrapItem">
						<label className="label">TỔNG TIỀN:   </label>
						<span>{data.price}</span>
					</div>
					<button className="productListEdit">XÁC NHẬN GIAO HÀNG</button>
				</div>
				<div></div>
			</div>
		</div>
	);
}
