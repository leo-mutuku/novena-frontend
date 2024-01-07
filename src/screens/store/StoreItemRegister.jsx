import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Registered Items', to:"allregistereditems"},
  {pagename:'Register Item', to:"registeritem"},
]

function StoreItemRegister() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default StoreItemRegister