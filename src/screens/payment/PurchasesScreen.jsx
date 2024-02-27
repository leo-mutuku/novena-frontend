import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Purchases Payment", to: "allpurchasepayment" },

  { pagename: "Posted", to: "allpostedpurchasepayment" },
];
export const PurchasesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
