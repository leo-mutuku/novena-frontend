import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Return Order", to: "allreturnorders" },
  { pagename: "New return order", to: "createreturnorder" },
];

function ReturnOrdersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ReturnOrdersScreen;
