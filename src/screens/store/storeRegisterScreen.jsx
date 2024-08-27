import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Store Items', to:"allstoreregister"},
  {pagename:'Create Store item', to:"createstoreregister"},
]

function StoreRegisterScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default StoreRegisterScreen