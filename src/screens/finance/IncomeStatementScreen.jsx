import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Income Statement", to: "incomestatement" }];

function IncomeStatementScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default IncomeStatementScreen;
