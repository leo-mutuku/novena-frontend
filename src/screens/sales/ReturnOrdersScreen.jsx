import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All return orders", to: "allreturnorders" },
  { pagename: "In progress", to: "allreturnorders" },
  { pagename: "Posted", to: "allreturnorders" },
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
