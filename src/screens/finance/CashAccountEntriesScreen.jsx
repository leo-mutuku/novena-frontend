import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Cash Account Entries", to: "allcashaccountentries" },
];
function CashAccountEntriesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CashAccountEntriesScreen;
