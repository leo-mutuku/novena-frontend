import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "All GL", to: "allgl" }];

function GeneralledgerScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default GeneralledgerScreen;
