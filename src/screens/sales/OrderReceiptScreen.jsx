import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank Receipts", to: "bankreceipts" },
  { pagename: "Cash Recepts", to: "cashreceipts" },
  { pagename: "All Bank Receipts", to: "bankreceipts" },
  { pagename: "All Cash Recepts", to: "cashreceipts" },
];

function OrderReceiptScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default OrderReceiptScreen;
