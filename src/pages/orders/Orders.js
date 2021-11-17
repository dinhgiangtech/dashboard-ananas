import "./orders.css";
import React, { Component }  from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
export default function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const list = [];
    db.collection("order")
      .get()
      .then((querySnapshot) => {
        setLoading(true);
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            user: doc.data().fname + " " + doc.data().lname,
            price: doc.data().price,
            status: "Đang vận chuyển",
            address: doc.data().address,
          });
        });
        setData(list);
        setLoading(false);
      });
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "Mã đơn hàng",
      width: 200,
    },
    {
      field: "user",
      headerName: "Người đặt",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">CHI TIẾT</button>
            </Link>
          
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        autoHeight={false}
      />
    </div>
  );
}
