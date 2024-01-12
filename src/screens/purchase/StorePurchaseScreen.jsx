import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Purchases", to: "allstorepurchase" },
  { pagename: "In Progress ", to: "allstorepurchasesintransit" },
  { pagename: "Maize  ", to: "allmaizepurchase" },
  { pagename: "Posted  ", to: "allpostedstorepurchases" },
  { pagename: "New Purchase ", to: "createstorepurchase" },
];

function StorePurchaseScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default StorePurchaseScreen;
