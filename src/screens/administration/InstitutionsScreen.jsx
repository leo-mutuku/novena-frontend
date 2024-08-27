import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Institution', to:"allinstitution"},
  {pagename:'Create Institution', to:"createinstitution"},
]
function InstitutionsScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default InstitutionsScreen