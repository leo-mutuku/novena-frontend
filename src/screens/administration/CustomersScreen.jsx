import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Institution", to: "allcustomers" },
  { pagename: "Create Institution", to: "createcustomer" },
];
function CustomersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default CustomersScreen;
