import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'Actual Production', to:"allactualproduction"},
  {pagename:'Post production', to:"production"},
]

function ActualScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default ActualScreen