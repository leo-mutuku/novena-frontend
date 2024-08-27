import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "P&L Statement", to: "profitandloss" }];

function ProfitAndLossAccountScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ProfitAndLossAccountScreen;
