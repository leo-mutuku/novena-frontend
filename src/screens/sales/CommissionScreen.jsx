import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Commission Entries", to: "salescommission" }];

function CommissionScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CommissionScreen;
