import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All pack house', to:"allpackhouse"},
  {pagename:'Create Pack house', to:"createpackhouse"},
]

function PackHouseScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default PackHouseScreen