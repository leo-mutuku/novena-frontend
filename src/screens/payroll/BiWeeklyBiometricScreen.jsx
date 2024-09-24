import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bi-Weekly Staff Biometric", to: "biweeklystaffbiometric" },
];

const BiWeeklyBiometricScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default BiWeeklyBiometricScreen;
