import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "bankpurchasepayment" },
  { pagename: "Cash", to: "cashpurchasepayment" },

  { pagename: "All Bank", to: "#" },
  { pagename: "All Cash", to: "#" },
];
export const PurchasesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
