import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Products setup", to: "allpackhouse" },
  { pagename: "Packaging setup", to: "createpackhouse" },
];

const ProductionSetupScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default ProductionSetupScreen;
