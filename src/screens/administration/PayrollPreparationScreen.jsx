import PageActionComponent from '../../components/PageActionComponent'
const pagemenus =
[
  {pagename:'All Payroll Preparations', to:"allpayrollpreparations"},
  {pagename:'Payroll Preparations', to:"payrollpreparations"},
]
function PayrollPreparationScreen() {
  return (
    <>
    <PageActionComponent pagemenus={pagemenus}/>
     </>
  )
}

export default PayrollPreparationScreen