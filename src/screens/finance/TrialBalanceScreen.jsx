import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Sales Income", to: "alltb" }];

function TrialBalanceScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TrialBalanceScreen;
