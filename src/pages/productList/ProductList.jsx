import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React, { Component } from "react";
import { db } from "../../firebase";
export default function ProductList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchListProduct();
  }, []);
  const fetchListProduct = async () => {
    // let list = []
    await db
      .collection("products")
      .get()
      .then((querySnapshot) => {
        let list = querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            id: doc.id,
            image: Object.values(doc.data().image),
            name: doc.data().name,
            price: doc.data().price,
            status:doc.data().status
          };
        });
        setData(list);
      });
  };
  const handleDelete = (id) => {
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        setData(data.filter((item) => item.id !== id));
		alert("Đã xoá sản phẩm thành công")
      })
      .catch(() => alert("Lỗi xảy ra"));
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        // console.log('image', params.row.image)
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image[1]} />
            {params.row.name}
          </div>
        );
      },
    },
    // { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
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
          <div>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">CHỈNH SỬA</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="Button">THÊM SẢN PHẨM</button>
      </Link>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
    </div>
  );
}
