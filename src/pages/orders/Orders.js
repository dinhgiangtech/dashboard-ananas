import "./orders.css";
import React, { Component } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
export default function Orders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("")
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
            status: doc.data().statusConfirm ? "ĐANG GIAO" : "XÁC NHẬN GIAO",
            address: doc.data().address,
            number: doc.data().number
          });
          // doc.data().statusConfirm ? setStatus("ĐANG GIAO") : setStatus("CHỜ XÁC NHẬN")
        });
        setData(list);
        setLoading(false);
      });
  }, []);
  const confirmOrder = (id) => {
    db.collection("order").doc(id)
      .update({
        statusConfirm: true
      })
      .then(() => {
        // setStatus("ĐANG GIAO");
        changeStatus(id)
        alert("Đơn hàng đã xác nhận giao")
      }
      )
      .catch(()=>{
        alert("Đã xảy ra lỗi")
      })
  }
  const changeStatus=(id)=>{
    const list = data.map((item)=>{
      if(item.id===id)
      {
        return{
          ...item,
          status:"ĐANG GIAO"
        }
      }
    })
    setData(list)
  }
  const columns = [
    {
      field: "number",
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
      width: 400,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/detail/" + params.row.id}>
              <button className="productListDelete">CHI TIẾT</button>
            </Link>
            {params.row.status === "XÁC NHẬN GIAO" ? <button onClick={() => confirmOrder(params.row.id)} className="productListEdit">XÁC NHẬN GIAO</button> 
            : <button className="productListDelete">ĐANG GIAO</button>}
          </div>
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
