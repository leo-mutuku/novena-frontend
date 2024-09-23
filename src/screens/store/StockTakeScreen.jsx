import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Stock Takes", to: "allstocktakes" },
  { pagename: "New Stock take", to: "createstocktake" },
];

function StockTakeScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default StockTakeScreen;
