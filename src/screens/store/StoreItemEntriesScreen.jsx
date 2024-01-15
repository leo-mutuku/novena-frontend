import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All Item Entries", to: "allitementries" }];
export const StoreItemEntriesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
