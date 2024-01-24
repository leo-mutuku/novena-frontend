import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All orders", to: "allorders" },
  { pagename: "In Tansit", to: "allordersintansit" },
  { pagename: "Posted", to: "postedallorders" },
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
