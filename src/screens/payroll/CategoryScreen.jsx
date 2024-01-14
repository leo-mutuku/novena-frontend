import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Daily Packhouse", to: "alldailypackhouse" },
  { pagename: "In Tansit", to: "alldailypackhouseintransit" },
  { pagename: "Posted", to: "allposteddailypackhouse" },
  { pagename: "New Daily Packhouse", to: "createdailypackhouse" },
];

export const CategoryScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
