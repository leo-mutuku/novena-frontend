import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "In Come Statement", to: "incomestatement" }];

function IncomeStatementScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default IncomeStatementScreen;
