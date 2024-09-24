import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bank", to: "vendorbank" },
  { pagename: "Cash", to: "vendorcash" },

  { pagename: "All Bank", to: "allbanksupplierpayment" },
  { pagename: "All Cash", to: "allcashsupplierpayment" },
];
export const PayVendorScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
