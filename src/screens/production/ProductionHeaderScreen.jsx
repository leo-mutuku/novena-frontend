import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All production", to: "allproductionheaders" },
  { pagename: "In Transit", to: "allproductionheaderlistintransit" },
  { pagename: "Posted", to: "allpostedtransiactionheaderlist" },
  { pagename: "Production Lines", to: "productionlines" },
  { pagename: "New Production", to: "createproductionheader" },
];

function ProductionHeaderScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ProductionHeaderScreen;
