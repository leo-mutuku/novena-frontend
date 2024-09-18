import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "New Vendor", to: "allvendors" },
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
