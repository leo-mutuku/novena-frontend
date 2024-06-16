import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Cash Flow", to: "cashflow" }];

function CashFlowScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CashFlowScreen;
