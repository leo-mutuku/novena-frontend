import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Payrolls ', to:"allpayrolls"},
  {pagename:'Create Payroll', to:"createpayroll"},
]
function PayrollActualScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default PayrollActualScreen