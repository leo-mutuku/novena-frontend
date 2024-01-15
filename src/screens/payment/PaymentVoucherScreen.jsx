import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All PV", to: "allpvs" },
  { pagename: "In Transit", to: "allpvintransit" },
  { pagename: "Posted", to: "allpostedpv" },
  { pagename: "Create PV", to: "createpv" },
];
export const PaymentVoucherScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
