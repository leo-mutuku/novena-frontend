import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "New Vendor", to: "newvendor" },
  { pagename: "All Vendors", to: "allvendors" },
];
function VendorsScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default VendorsScreen;
