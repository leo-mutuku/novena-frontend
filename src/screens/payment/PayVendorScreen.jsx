import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "vendorbank" },
  { pagename: "Cash", to: "vendorcash" },

  
  { pagename: "All Payments", to: "allcashvendorpayment" },
];
export const PayVendorScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
