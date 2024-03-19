import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Bank Accounts Entries", to: "allbankaccountsentries" },
  //   { pagename: "Create Bank Account", to: "createbankaccount" },
];

function BankAccountEntiresScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default BankAccountEntiresScreen;
