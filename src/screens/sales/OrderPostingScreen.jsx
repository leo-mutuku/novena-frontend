import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Order Clearing", to: "allpostedorders" },
  { pagename: "Cleared Orders", to: "allunpostedorders" },
];

function OrderPostingScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default OrderPostingScreen;
