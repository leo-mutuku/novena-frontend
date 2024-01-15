import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Purchases Payment", to: "allpurchasepayment" },
  { pagename: "In Transit", to: "allpurchasepaymentintransit" },
  { pagename: "Posted", to: "allpostedpurchasepayment" },
  { pagename: "Create New", to: "createpurchasepayment" },
];
export const PurchasesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
