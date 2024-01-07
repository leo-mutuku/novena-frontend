import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All TB', to:"alltb"},
  {pagename:'Create TB', to:"createtb"},
]

function TrialBalanceScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default TrialBalanceScreen