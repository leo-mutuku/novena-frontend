import { Outlet } from "react-router-dom";
import PageNavBar from "../../components/navbars/PageNavBar";
import SideBardComponent from "../../components/sidebar/SideBardComponent";
import { sidelinks } from "./administration/sidelinks";
import { FiUsers } from "react-icons/fi";
const index = () => {
  return (
    <>
      <PageNavBar pageName={"ADMIN"} pageIcon={FiUsers} />
      <div className="flex flex-row">
        <div className="w-[25%] pr-1">
          <SideBardComponent sideLinks={sidelinks} />
        </div>
        <div className="w-[73%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default index;
