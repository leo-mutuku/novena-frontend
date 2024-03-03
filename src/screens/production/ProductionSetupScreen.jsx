import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Products setup List", to: "productssetuplist" },

  { pagename: "Packaging setup List", to: "packagesetuplist" },
];

const ProductionSetupScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default ProductionSetupScreen;
