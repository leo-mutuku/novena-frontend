import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bi-Weekly Staff Register", to: "biweeklystaffregister" },
];

const BiWeeklyRegisterScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default BiWeeklyRegisterScreen;
