import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All stock adjustment", to: "allstockadjustment" },
  { pagename: "New Stock Adjustment", to: "createstockadjustment" },
];

function ItemAdjustmentScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ItemAdjustmentScreen;
