import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Attendance Register", to: "attregister" },
  { pagename: "Controlled Attendance", to: "controlledattentance" },
];

function BioMetricScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default BioMetricScreen;
