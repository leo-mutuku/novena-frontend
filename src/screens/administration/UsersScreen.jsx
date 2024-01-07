import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All users', to:"allusers"},
  {pagename:'Create user', to:"createuser"},
 
]

const UsersScreen = () => {
  return (
    <>
   <PageActionComponent pagemenus={pagemenus}/>
    </>
  )
}

export default UsersScreen