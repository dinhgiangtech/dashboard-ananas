import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const list = [];
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        setLoading(true);
        querySnapshot.forEach((doc) => {
          const dateObject = new Date(doc.data().createdAt.seconds * 1000);
          const date = dateObject.toLocaleString(); //2019-12-9 10:30:15
          console.log(doc.data().createdAt.seconds);
          list.push({
            email: doc.data().email,
            createAt: date,
            id: doc.id,
          });
        });
        setData(list);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    
      db.collection("users")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "email", headerName: "User", width: 200 },

    {
      field: "supplier",
      headerName: "Nhà cung cấp",
      width: 180,
      renderCell: (params) => {
        return <EmailOutlinedIcon className="userListDelete" />;
      },
    },
    { field: "createAt", headerName: "Ngày đăng kí", width: 180 },

    { field: "id", headerName: "UID", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  if (loading) {
    <div>
      <CircularProgress></CircularProgress>
    </div>;
  }
  return (
    <div className="userList">
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
