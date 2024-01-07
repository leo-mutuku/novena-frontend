import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All orders", to: "allorders" },
  { pagename: "In progress", to: "allorders" },
  { pagename: "Posted", to: "allorders" },
  { pagename: "New order", to: "createorder" },
];

function OrdersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default OrdersScreen;
