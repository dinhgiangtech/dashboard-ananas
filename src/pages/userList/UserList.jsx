import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { db } from "../../firebase";
import moment from 'moment';
export default function UserList() {
	const [ data, setData ] = useState([]);
	useEffect(()=>{
		fetchListProduct()
	},[])
	const fetchListProduct = async () => {
		// let list = []
		await db
		  .collection("users")
		  .get()
		  .then((querySnapshot) => {
			let list = querySnapshot.docs.map((doc) => {
			  console.log(doc.data());
			  return {
				id:doc.id,
				email: doc.data().email,
			  };
			});
			console.log(list)
			setData(list);
		  });
	  };
	const handleDelete = (id) => {
		setData(data.filter((item) => item.id !== id));
	};
	const columns = [
		{ field: 'email', headerName: 'User', width: 150 },

		{
			field: 'supplier',
			headerName: 'Nhà cung cấp',
			width: 180,
			renderCell: (params) => {
				return <EmailOutlinedIcon className="userListDelete" onClick={() => handleDelete(params.row.id)} />;
			}
		},

		{ field: 'id', headerName: 'UID', width: 200 },
	];

	return (
		<div className="userList">
			<DataGrid rows={data} disableSelectionOnClick columns={columns} pageSize={8} checkboxSelection />
		</div>
	);
}
