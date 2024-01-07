import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All GL', to:"allgl"},
  {pagename:'Create GL', to:"creategl"},
]

function GeneralledgerScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default GeneralledgerScreen