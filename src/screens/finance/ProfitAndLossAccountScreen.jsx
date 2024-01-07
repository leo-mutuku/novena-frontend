import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'P&L Statement', to:"#"},
  {pagename:'Generate P&L Statement', to:"#"},
]

function ProfitAndLossAccountScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default ProfitAndLossAccountScreen