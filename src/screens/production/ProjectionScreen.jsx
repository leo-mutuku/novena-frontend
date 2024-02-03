import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All production', to:"allpreparation"},
  {pagename:'In Transit', to:"createproductionprepare"},
  {pagename:'Posted', to:"createproductionprepare"},
]

function ProjectionScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default ProjectionScreen