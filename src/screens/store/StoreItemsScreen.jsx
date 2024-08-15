import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Store Items", to: "allstoreitems" },
  { pagename: "Create Store item", to: "createstoreitem" },
];

function StoreItemsScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default StoreItemsScreen;
