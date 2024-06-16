import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Balance sheet", to: "balanceSheet" }];

function BalanceSheetScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default BalanceSheetScreen;
