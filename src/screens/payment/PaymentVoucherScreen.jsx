import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All PV", to: "allpv" },
  { pagename: "Paid PV", to: "allpaidpv" },
];
export const PaymentVoucherScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
