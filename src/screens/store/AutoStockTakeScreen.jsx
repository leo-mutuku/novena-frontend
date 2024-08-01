import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Auto Stock Take", to: "autostock" }];

function AutoStockTakeScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default AutoStockTakeScreen;
