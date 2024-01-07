import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'Posted orders', to:"allpostedorders"},
  {pagename:'Unposted orders', to:"allunpostedorders"},
  
]

function OrderPostingScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default OrderPostingScreen