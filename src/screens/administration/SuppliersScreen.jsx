import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Suppliers", to: "allsuppliers" },
  { pagename: "Create Supplier", to: "createsupplier" },
];
function SuppliersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default SuppliersScreen;
