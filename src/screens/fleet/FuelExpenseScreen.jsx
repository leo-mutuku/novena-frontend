import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "New Expense", to: "newfuelexpense" },
  { pagename: "All Fuel Expenses", to: "allfuelexpenses" },
];
function FuelExpenseScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default FuelExpenseScreen;
