import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Salary Journal", to: "allsalaryjournals" },
  { pagename: "All Paid Salary Journals", to: "allpaidsalaryjournals" },

  // { pagename: "Create Payment Requisition", to: "createpaymentrequisition" },
];
export const SalaryJournalScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
