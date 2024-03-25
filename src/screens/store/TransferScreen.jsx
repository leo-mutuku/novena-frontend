import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Store Items", to: "allstoreregister" },
  { pagename: "Create Store item", to: "createstoreregister" },
];
function TransferScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TransferScreen;
