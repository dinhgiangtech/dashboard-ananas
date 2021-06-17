import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">DASHBOARD</h3>
          <ul className="sidebarList">
          <Link to="/" className="link">
              <li className="sidebarListItem">
               TRANG CHỦ
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                NGƯỜI DÙNG
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                SẢN PHẨM
              </li>
            </Link>
            <Link to="/orders" className="link">
            <li className="sidebarListItem">
              ĐƠN HÀNG
            </li>
            </Link>
            <li className="sidebarListItem">
              BÁO CÁO
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
