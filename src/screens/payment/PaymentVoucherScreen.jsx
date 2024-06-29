import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "bankpv" },

  { pagename: "Cash", to: "cashpv" },
  { pagename: "All", to: "allpv" },
];
export const PaymentVoucherScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
