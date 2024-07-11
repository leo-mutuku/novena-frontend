import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "bankpurchasepayment" },
  { pagename: "Cash", to: "cashpurchasepayment" },

  { pagename: "All Bank", to: "allbanksupplierpayment" },
  { pagename: "All Cash", to: "allcashsupplierpayment" },
];
export const PurchasesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
