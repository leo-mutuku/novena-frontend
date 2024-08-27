import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Payment Entries", to: "PaymentEntries" }];
const PaymentEntriesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default PaymentEntriesScreen;
