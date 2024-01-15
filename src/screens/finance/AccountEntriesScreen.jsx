import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Account Entries", to: "allaccountentries" },
];
function AccountEntriesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default AccountEntriesScreen;
