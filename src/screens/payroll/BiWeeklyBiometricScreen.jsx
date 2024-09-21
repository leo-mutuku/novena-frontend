import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bi-Weekly Staff Register", to: "biweeklystaffbiometric" },
];

const BiWeeklyBiometricScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default BiWeeklyBiometricScreen;
