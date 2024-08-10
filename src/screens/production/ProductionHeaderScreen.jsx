import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All production", to: "allproductionheaders" },

  { pagename: "New Production", to: "createproductionheader" },
  { pagename: "Reverse Production", to: "createproductionheader" },
];

function ProductionHeaderScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ProductionHeaderScreen;
