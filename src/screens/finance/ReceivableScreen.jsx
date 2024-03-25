import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Account Receivable", to: "allaccountreceivable" },
];

function ReceivableScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ReceivableScreen;
