import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Dispatched orders", to: "dispatchedorders" }];
function OrdersDispatchScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default OrdersDispatchScreen;
