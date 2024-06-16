import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "TB", to: "alltb" }];

function TrialBalanceScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TrialBalanceScreen;
