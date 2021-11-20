import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React, { Component } from 'react';
export default function DeatailOrder() {
	const [ data, setData ] = useState(userRows);

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
		{ field: 'createAt', headerName: 'Ngày đăng kí', width: 180 },

		{ field: 'uid', headerName: 'UID', width: 200 },
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<div>
						<DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />
					</div>
				);
			}
		}
	];

	return (
		<div className="userList">
			{/* <DataGrid rows={data} disableSelectionOnClick columns={columns} pageSize={8} checkboxSelection /> */}
		</div>
	);
}
