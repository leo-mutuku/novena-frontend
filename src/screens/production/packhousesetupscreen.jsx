import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Pack type settings", to: "packtypesettings" }];

const PackhouseSetupScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default PackhouseSetupScreen;
