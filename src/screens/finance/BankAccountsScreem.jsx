import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Bank Accounts', to:"bankaccounts"},
  {pagename:'Create Bank Account', to:"createbankaccount"},
]

function BankAccountsScreem() {
  return (
    
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
 
  )
}

export default BankAccountsScreem