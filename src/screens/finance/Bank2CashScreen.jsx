import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Bank 2 Cash", to: "bank2cash" },
  { pagename: "Transfer Bank 2 Cash", to: "createbank2cash" },
];

function Bank2CashScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default Bank2CashScreen;
