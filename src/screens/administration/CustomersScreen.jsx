import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Customers", to: "allcustomers" },
  { pagename: "Create Customer", to: "createcustomer" },
];
function CustomersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CustomersScreen;
