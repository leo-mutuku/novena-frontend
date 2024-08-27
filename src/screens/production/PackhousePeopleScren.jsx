import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All packhouse people", to: "allpackhousepeople" },
  { pagename: "Create Packhouse person", to: "createpackhouseperson" },
];

function PackhousePeopleScren() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default PackhousePeopleScren;
