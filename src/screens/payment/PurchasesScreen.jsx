import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "bankpurchasepayment" },
  { pagename: "Cash", to: "cashpurchasepayment" },

  { pagename: "All", to: "allpurchasepurchasepayemnt" },
];
export const PurchasesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
