import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Sales people", to: "allsalespeople" },
  { pagename: "Create Sales person", to: "createsalesperson" },
];

function SalesPeopleScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default SalesPeopleScreen;
