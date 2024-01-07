import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Stock Takes", to: "allstocktakes" },
  { pagename: "In progress", to: "allstocktakeinprogress" },
  { pagename: "Posted", to: "allpostedstocktakes" },
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
