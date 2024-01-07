import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Accounts', to:"allaccounts"},
  {pagename:'Create Account', to:"createAccount"},
]
function AccountsScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
 
  )
}

export default AccountsScreen