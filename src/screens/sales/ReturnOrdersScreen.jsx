import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All return orders", to: "allreturnorders" },
  { pagename: "In Transit", to: "allreturnordersintransit" },
  { pagename: "Posted", to: "allpostedreturnorders" },
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
