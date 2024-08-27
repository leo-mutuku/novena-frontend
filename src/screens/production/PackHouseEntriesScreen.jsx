import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All pack house entris", to: "allpackhouseentries" },
];

export const PackHouseEntriesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
