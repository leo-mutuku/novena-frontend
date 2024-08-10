import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Expenses Entries", to: "salesexpenselist" },
  { pagename: "New Expense", to: "newsalesexpense" },
];

function SalesExpenseScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default SalesExpenseScreen;
