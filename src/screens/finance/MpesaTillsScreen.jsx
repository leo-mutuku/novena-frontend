import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Mpesa Tilss', to:"allmpesatill"},
  {pagename:'Create Mpesa Till', to:"creatempesatill"},
]

function MpesaTillsScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default MpesaTillsScreen