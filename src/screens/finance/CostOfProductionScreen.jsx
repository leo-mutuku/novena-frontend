import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Cost of Production", to: "costofproduction" }];

function CostOfProductionScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CostOfProductionScreen;
