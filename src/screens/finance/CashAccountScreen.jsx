import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Cash Accounts", to: "allcashaccounts" },
  { pagename: "Create Cash Account", to: "createCashAccount" },
];
function CashAccountScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CashAccountScreen;
