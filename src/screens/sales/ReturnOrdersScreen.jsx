import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Create Return Order", to: "allreturnorders" },
  { pagename: "All Return Order", to: "allreturnorders" },
  { pagename: "Reverse order", to: "reverseorderlist" },
];

function ReturnOrdersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ReturnOrdersScreen;
