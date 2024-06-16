import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Daily Packhouse", to: "alldailypackhouse" },

  { pagename: "Posted", to: "allposteddailypackhouse" },
  { pagename: "New Daily Packhouse", to: "createdailypackhouse" },
];

const DailyPackhouseScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default DailyPackhouseScreen;
