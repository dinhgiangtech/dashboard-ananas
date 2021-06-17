import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {moneyFormat} from '../../utils/formatMoney'
import {db} from '../../firebase'
import { CircularProgress } from '@material-ui/core';
export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(false)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const list = [];
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        setLoading(true);
        querySnapshot.forEach((doc) => {
          const price=moneyFormat(doc.data().price)
          list.push({
            name: doc.data().name,
            price: doc.data().price,
            id: doc.id,
            status:doc.data().status,
            img:doc.data().image[0],
            type:doc.data().type,
            style:doc.data().style
          });
        });
        setData(list);
        setLoading(false);
      });
  }, []);
  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img width="60px" height="60px" src="https://ananas.vn/wp-content/uploads/Track-6_Suede_Moonphase_1500x800.jpg" alt=""/>
           {params.row.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
    },
    {
      field: "price",
      headerName: "Giá",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
           <span> {moneyFormat(params.row.price)}</span>
          </div>
        );
      },
    },
    { field: "style", headerName: "Kiểu dáng", width: 150 },
    {field:"type",headerName:"Loại",width:120},
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
       <Link to="/newproduct">
          <button className="Button">THÊM SẢN PHẨM</button>
        </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
