import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Stock Takes", to: "allstocktakes" },
  { pagename: "In progress", to: "allstocktakes" },
  { pagename: "Posted", to: "allstocktakes" },
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
