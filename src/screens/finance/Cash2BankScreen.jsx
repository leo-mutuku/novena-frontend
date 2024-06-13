import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Cash 2 Bank", to: "cash2bank" },
  { pagename: "Create Cash 2 Bank", to: "createcash2bankk" },
];

function Cash2BankScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default Cash2BankScreen;
