import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Staff', to:"allstaff"},
  {pagename:'Create staff', to:"createstaff"},
 
]

const StaffScreen = () => {
  return (
    <>
   <PageActionComponent pagemenus={pagemenus}/>
    </>
  )
}

export default StaffScreen