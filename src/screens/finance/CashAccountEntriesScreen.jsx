import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All Accounts", to: "allcashaccountentries" }];
function CashAccountEntriesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CashAccountEntriesScreen;
