import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Take Mialage", to: "takemialage" },
  { pagename: "Mialage History", to: "mialagehistory" },
];
function MialageScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default MialageScreen;
