import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Faker from "../components/Faker/Faker";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../UserContext";

const Layout = (props: { onTokenChange: () => void }) => {

  const user = useContext(UserContext);
  console.log(user?.role)

  return (
    <>
      <Navbar onTokenChange={props.onTokenChange} />
      <hr className="mb-0" style={{ margin: "0" }} />
      {
        user?.role === "SUPERADMIN" && <Faker />
      }
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
