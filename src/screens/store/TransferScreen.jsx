import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Tansfer Order list", to: "alltransferorders" },
  {
    pagename: "Create Transfer order",
    to: "createtransferorder",
  },
];
function TransferScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TransferScreen;
