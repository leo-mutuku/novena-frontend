import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import SecuredHomeScreen from "./screens/SecuredHomeScreen.jsx";
import ProductionScreen from "./screens/production/ProductionScreen.jsx";
import StoreScreen from "./screens/store/StoreScreen.jsx";
import SalesScreen from "./screens/sales/SalesScreen.jsx";
import FleetScreen from "./screens/fleet/FleetScreen.jsx";
import FinanceScreen from "./screens/finance/FinanceScreen.jsx";
import AdministrationScreen from "./screens/administration/AdministrationScreen.jsx";
import ProductionDashboardScreen from "./screens/production/ProductionDashboardScreen.jsx";
import ProductionHeaderScreen from "./screens/production/ProductionHeaderScreen.jsx";
import AdministrationDashboardScreen from "./screens/administration/AdministrationDashboardScreen.jsx";
import UsersScreen from "./screens/administration/UsersScreen.jsx";
import SuppliersScreen from "./screens/administration/SuppliersScreen.jsx";
import StaffScreen from "./screens/administration/StaffScreen.jsx";
import InstitutionsScreen from "./screens/administration/InstitutionsScreen.jsx";
import PackHouseScreen from "./screens/production/PackHouseScreen.jsx";
import ReturnOrdersScreen from "./screens/sales/ReturnOrdersScreen.jsx";
import OrderInvoiceScreen from "./screens/sales/OrderInvoiceScreen.jsx";
import OrdersScreen from "./screens/sales/OrdersScreen.jsx";
import OrderReceiptScreen from "./screens/sales/OrderReceiptScreen.jsx";
import OrdersDispatchScreen from "./screens/sales/OrdersDispatchScreen.jsx";

import AccountsScreen from "./screens/finance/AccountsScreen.jsx";
import GeneralledgerScreen from "./screens/finance/GeneralledgerScreen.jsx";
import MpesaPaybillsScreen from "./screens/finance/MpesaPaybillsScreen.jsx";
import MpesaTillsScreen from "./screens/finance/MpesaTillsScreen.jsx";
import BankAccountsScreem from "./screens/finance/BankAccountsScreem.jsx";
import TrialBalanceScreen from "./screens/finance/TrialBalanceScreen.jsx";
import ProfitAndLossAccountScreen from "./screens/finance/ProfitAndLossAccountScreen.jsx";
import StoreItemRegister from "./screens/store/StoreItemRegister.jsx";
import StoreItemsScreen from "./screens/store/StoreItemsScreen.jsx";
import ItemAdjustmentScreen from "./screens/store/ItemAdjustmentScreen.jsx";
import CreateUser from "./screens/administration/users/CreateUser.jsx";
import UserList from "./screens/administration/users/UserList.jsx";
import CreateAccount from "./screens/finance/accounts/CreateAccount.jsx";

import ViewAccounts from "./screens/finance/accounts/ViewAccounts.jsx";
import PurchaseScreen from "./screens/purchase/PurchaseScreen.jsx";
import StorePurchaseScreen from "./screens/purchase/StorePurchaseScreen.jsx";
import StoreRequisitionScreen from "./screens/purchase/StoreRequisitionScreen.jsx";
import AccountsList from "./screens/finance/accounts/AccountsList.jsx";
import GLList from "./screens/finance/gl/GLList.jsx";
import CreateGL from "./screens/finance/gl/CreateGL.jsx";
import StockTakeScreen from "./screens/store/StockTakeScreen.jsx";
import CreateInstition from "./screens/administration/insititutions/CreateInstition.jsx";
import Institutionlist from "./screens/administration/insititutions/Institutionlist1.jsx";
import SupplierList from "./screens/administration/suppliers/SupplierList1.jsx";
import CreateSupplier from "./screens/administration/suppliers/CreateSupplier.jsx";
import CreateStaff from "./screens/administration/staff/CreateStaff.jsx";
import StaffList from "./screens/administration/staff/StaffList1.jsx";
import MpesaPaybillList from "./screens/finance/mpesapaybill/MpesaPaybillList.jsx";
import CreateMpesaPaybill from "./screens/finance/mpesapaybill/CreateMpesaPaybill.jsx";
import MpesatillList from "./screens/finance/mpesatill/MpesatillList.jsx";
import CreatempesaList from "./screens/finance/mpesatill/CreatempesaList.jsx";
import BankAccountsList from "./screens/finance/bankaccounts/BankAccountsList.jsx";
import ItemListList from "./screens/store/itemregister/ItemListList.jsx";
import CreateItemList from "./screens/store/itemregister/CreateItemList.jsx";
import CreateStockTake from "./screens/store/stocktake/CreateStockTake.jsx";
import StocktakeList from "./screens/store/stocktake/StocktakeList.jsx";
import StockAdjustmentlist from "./screens/store/stockadjustment/StockAdjustmentlist.jsx";
import CreateStockAdjustment from "./screens/store/stockadjustment/CreateStockAdjustment.jsx";
import StoreItemslist from "./screens/store/storeitems/StoreItemslist.jsx";
import CreateStoreItemslist from "./screens/store/storeitems/CreateStoreItemslist.jsx";
import Orderlist from "./screens/sales/orders/OrderHeaderList.jsx";
import CreateOrder from "./screens/sales/orders/CreateOrderHeader.jsx";
import ReturnOrderlist from "./screens/sales/returnorders/ReturnOrderlist.jsx";

import OrderDispatchList from "./screens/sales/orderdispatch/OrderDispatchListHeader1.jsx";
import CreateOrderDispatch from "./screens/sales/orderdispatch/CreateOrderDispatchHeader.jsx";
import OrderInvoiceList from "./screens/sales/orderinvoice/OrderInvoiceList.jsx";
import CreateOrderInvoce from "./screens/sales/orderinvoice/CreateOrderInvoce.jsx";

import OrderReceiptList from "./screens/sales/orderreceipt/OrderReceiptList.jsx";
import SalesPeoplelist from "./screens/sales/salespeople/SalesPeoplelist.jsx";
import CreateSalesPeople from "./screens/sales/salespeople/CreateSalesPeople.jsx";
import RequisitionList from "./screens/purchase/requisition/RequisitionList.jsx";
import CreatePurchase from "./screens/purchase/purchase/CreatePurchase.jsx";
import PurchaseList from "./screens/purchase/purchase/PurchaseList.jsx";
import StoreRegisterScreen from "./screens/store/storeRegisterScreen.jsx";
import StoreRegisterList from "./screens/store/storeregister/StoreRegisterList.jsx";
import CreateStoreRegister from "./screens/store/storeregister/CreateStoreRegister.jsx";
import AllPostedStorePurchases from "./screens/purchase/purchase/AllPostedStorePurchases1.jsx";
import AllStorePurchasesInTransit from "./screens/purchase/purchase/AllStorePurchasesInTransit.jsx";
import CreateBankAccount from "./screens/finance/bankaccounts/CreateBankAccount.jsx";
import CreatePackhousePerson from "./screens/production/packhousepeople/CreatePackhousePerson.jsx";
import PackhosePeopleList from "./screens/production/packhousepeople/PackhosePeopleList.jsx";
import Allpostedrequisitions from "./screens/payment/payments/requisitions/AllPostedRequisitions.jsx";
import CreateRequisition from "./screens/purchase/requisition/CreateRequisition.jsx";
import StockTakeInProgress from "./screens/store/stocktake/StockTakeInProgress.jsx";
import PostedStockTake from "./screens/store/stocktake/PostedStockTake.jsx";
import StockAdjustmentInProgress from "./screens/store/stockadjustment/StockAdjustmentInProgress.jsx";
import PostedStockAdjustment from "./screens/store/stockadjustment/PostedStockAdjustment.jsx";
import PayrollScreen from "./screens/payroll/PayrollScreen.jsx";
import PaymentScreen from "./screens/payment/PaymentScreen.jsx";
import AllMaizePurchase from "./screens/purchase/purchase/AllMaizePurchase.jsx";
import ProductionHeaderList from "./screens/production/productionheaders/ProductionHeaderList.jsx";
import CreateProductionHeader from "./screens/production/productionheaders/CreateProductionHeader.jsx";
import AllPostedProductionHeaderList from "./screens/production/productionheaders/AllPostedProductionHeaderList.jsx";
import AllProductionHeaderListInTransit from "./screens/production/productionheaders/AllProductionHeaderListInTransit.jsx";
import DailyPackhouseScreen from "./screens/production/DailyPackhouseScreen.jsx";
import DailyPackHouseHeadersList from "./screens/production/dailypackhouse/DailyPackHouseHeadersList.jsx";
import AllPostedDailyPackhouse from "./screens/production/dailypackhouse/AllPostedDailyPackhouse.jsx";
import CreateDailyPackhouseHeader from "./screens/production/dailypackhouse/CreateDailyPackhouseHeader.jsx";
import AllDailyPackhouseHeaderInTransit from "./screens/production/dailypackhouse/AllDailyPackhouseHeaderInTransit.jsx";
import PackhouseList from "./screens/production/packhouse/PackhouseList.jsx";
import CreatePackHouse from "./screens/production/packhouse/CreatePackHouse.jsx";
import { PackHouseEntriesScreen } from "./screens/production/PackHouseEntriesScreen.jsx";
import PackhouseEntriesList from "./screens/production/packhouseentries/PackhouseEntriesList.jsx";
import CreatePayrollHeaders from "./screens/payroll/payrollHeader/CreatePayrollHeaders.jsx";
import PayrollHeadersList from "./screens/payroll/payrollHeader/PayrollHeadersList.jsx";
import { PayrollHeaderScreen } from "./screens/payroll/PayrollHeaderScreen.jsx";
import { CategoryScreen } from "./screens/payroll/CategoryScreen.jsx";
import CategoryList from "./screens/payroll/category/CategoryList.jsx";
import CreateCategory from "./screens/payroll/category/CreateCategory.jsx";
import { PurchasesScreen } from "./screens/payment/PurchasesScreen.jsx";
import { RequisitionsScreen } from "./screens/payment/RequisitionsScreen.jsx";
import { PaymentVoucherScreen } from "./screens/payment/PaymentVoucherScreen.jsx";

import { StoreItemEntriesScreen } from "./screens/store/StoreItemEntriesScreen.jsx";
import AllItemEntries from "./screens/store/storeitementries/AllItemEntries.jsx";
import AccountEntriesScreen from "./screens/finance/AccountEntriesScreen.jsx";
import AllAccountEntries from "./screens/finance/accountenties/AllAccountEntries.jsx";
import CustomersScreen from "./screens/administration/CustomersScreen.jsx";
import CreateCustomer from "./screens/administration/customers/CreateCustomer.jsx";
import CustomerList from "./screens/administration/customers/CustomerList1.jsx";
import CashAccountEntriesScreen from "./screens/finance/CashAccountEntriesScreen.jsx";
import CashAccountScreen from "./screens/finance/CashAccountScreen.jsx";
import AllCashAccount from "./screens/finance/cashaccounts/AllCashAccount.jsx";
import CReateCashAccount from "./screens/finance/cashaccounts/CReateCashAccount.jsx";
import AllCashAccountEntries from "./screens/finance/cashaccountentries/AllCashAccountEntries.jsx";

import DriverScreen from "./screens/fleet/DriverScreen.jsx";
import RoutesScreen from "./screens/fleet/RoutesScreen.jsx";
import VehicleScreen from "./screens/fleet/VehicleScreen.jsx";
import RunHeadersScreen from "./screens/fleet/RunHeadersScreen.jsx";
import ManagementScreen from "./screens/fleet/ManagementScreen.jsx";
import DriversList from "./screens/fleet/drivers/DriversList.jsx";
import CreateDrivers from "./screens/fleet/drivers/CreateDrivers.jsx";
import RoutesList from "./screens/fleet/routes/RoutesList.jsx";
import CreateRoutes from "./screens/fleet/routes/CreateRoutes.jsx";
import CreateVehicle from "./screens/fleet/vehicles/CreateVehicle.jsx";
import VehicleList from "./screens/fleet/vehicles/VehicleList.jsx";
import RunsList from "./screens/fleet/runs/RunsList.jsx";
import AllPostedRuns from "./screens/fleet/runs/AllPostedRuns.jsx";
import CreateRun from "./screens/fleet/runs/CreateRun.jsx";
import MaintenanceList from "./screens/fleet/maintenance/MaintenanceList.jsx";
import CreateMaintenanceList from "./screens/fleet/maintenance/CreateMaintenanceList.jsx";
import AllRunsInTransit from "./screens/fleet/runs/AllRunsInTransit.jsx";
import AllPostedOrderHeaders from "./screens/sales/orders/AllPostedOrderHeaders.jsx";
import AllOrderHeadersInTransit from "./screens/sales/orders/AllOrderHeadersInTransit.jsx";
import AllReurnOrdersInTransit from "./screens/sales/returnorders/AllReurnOrdersInTransit.jsx";
import AllPostedReturnOrders from "./screens/sales/returnorders/AllPostedReturnOrders.jsx";

import EditDriver from "./screens/fleet/drivers/EditDriver.jsx";
import EditRoute from "./screens/fleet/routes/EditRoute.jsx";
import EditVehicle from "./screens/fleet/vehicles/EditVehicle.jsx";
import AssignDriverVehicle from "./screens/fleet/drivers/AssignDriverVehicle.jsx";
import EditDriverVehicleAssign from "./screens/fleet/drivers/EditDriverVehicleAssign.jsx";
import UpdateGL from "./screens/finance/gl/UpdateGL.jsx";
import AssignDriverRoute from "./screens/fleet/routes/AssignDriverRoute.jsx";
import EditDriverRouteAssign from "./screens/fleet/routes/EditDriverRouteAssign.jsx";
import UpdateAccounts from "./screens/finance/accounts/UpdateAccounts.jsx";
import UpdateStaff from "./screens/administration/staff/UpdateStaff.jsx";
import UpdateSupplier from "./screens/administration/suppliers/UpdateSupplier.jsx";
import UpdateStoreItems from "./screens/store/storeitems/UpdateStoreItems.jsx";
import UpdateItemsRegister from "./screens/store/itemregister/UpdateItemsRegister.jsx";
import GeneralCategory from "./screens/payroll/payrollheader/GeneralCategory.jsx";
import ProductionCategory from "./screens/payroll/payrollheader/ProductionCategory.jsx";
import SalesCategory from "./screens/payroll/payrollheader/SalesCategory.jsx";
import PackHouseCategory from "./screens/payroll/payrollheader/PackHouseCategory.jsx";
import EditRuns from "./screens/fleet/runs/EditRuns.jsx";
import EditMaintenance from "./screens/fleet/maintenance/EditMaintenance.jsx";
import PostedOrderPreview from "./screens/sales/orders/PostedOrderPreview.jsx";
import BulkSMSScreen from "./screens/administration/BulkSMSScreen.jsx";
import SendBulkSMS from "./screens/administration/bulksms/SendBulkSMS.jsx";
import SendToCustom from "./screens/administration/bulksms/SendToCustom.jsx";
import DeleteStaff from "./screens/administration/staff/DeleteStaff.jsx";
import ViewPostedProductiobHeader from "./screens/production/productionheaders/ViewPostedProductiobHeader.jsx";
import DeleteSalesPerson from "./screens/sales/salespeople/DeleteSalesPerson.jsx";
import DeletePackHousePerson from "./screens/production/packhousepeople/DeletePackHousePerson.jsx";
import UpdateCustomer from "./screens/administration/customers/UpdateCustomer.jsx";
import ProductionSetupScreen from "./screens/production/ProductionSetupScreen.jsx";
import ProductionSetupList from "./screens/production/productionsetup/ProductionSetupList.jsx";
import PackagingSetupList from "./screens/production/productionsetup/PackagingSetupList.jsx";
import CreatePackageSetup from "./screens/production/productionsetup/CreatePackageSetup.jsx";
import CreateProductSetup from "./screens/production/productionsetup/CreateProductSetup.jsx";
import PackhouseSetupScreen from "./screens/production/packhousesetupscreen.jsx";
import PacktypeSettingList from "./screens/production/packhousesetup/PacktypeSettingList.jsx";
import CreatePacktypeSetting from "./screens/production/packhousesetup/CreatePacktypeSetting.jsx";
import UpdatePackagingSetup from "./screens/production/productionsetup/UpdatePackagingSetup.jsx";
import ReturnOrderpreview from "./screens/sales/returnorders/ReturnOrderpreview.jsx";
import ReverseorderList from "./screens/sales/returnorders/ReverseorderList.jsx";
import ReverseOrderPreview from "./screens/sales/returnorders/ReverseOrderPreview.jsx";

import AllbankAccountEntries from "./screens/finance/bankaccountentries/AllbankAccountEntries.jsx";
import BankAccountEntiresScreen from "./screens/finance/BankAccountEntiresScreen.jsx";
import PayablesScreen from "./screens/finance/PayablesScreen.jsx";
import AllAccountPayables from "./screens/finance/payables/AllAccountPayables.jsx";
import ReceivableScreen from "./screens/finance/ReceivableScreen.jsx";
import AllAccountReceivable from "./screens/finance/receivables/AllAccountReceivable.jsx";
import TransferScreen from "./screens/store/TransferScreen.jsx";
import PayrollSetupScreen from "./screens/payroll/PayrollSetupScreen.jsx";
import AddStaffSetup from "./screens/payroll/payrollsetup/AddStaffSetup.jsx";
import RemoveStaffSetup from "./screens/payroll/payrollsetup/RemoveStaffSetup.jsx";
import UpdateStaffSetup from "./screens/payroll/payrollsetup/UpdateStaffSetup.jsx";
import ViewStaffSetup from "./screens/payroll/payrollsetup/ViewStaffSetup.jsx";
import StaffSetupList from "./screens/payroll/payrollsetup/StaffSetupList.jsx";

import RemoveDeduction from "./screens/payroll/otherdeductions/RemoveDeduction.jsx";

import UpdateDeduction from "./screens/payroll/otherdeductions/UpdateDeduction.jsx";

import UpdatePayrollCategory from "./screens/payroll/category/UpdatePayrollCategory.jsx";
import PayrollActions from "./screens/payroll/payrollheader/PayrollActions.jsx";
import RolesScreen from "./screens/administration/RolesScreen.jsx";
import CreateRole from "./screens/administration/roles/CreateRole.jsx";
import RoleList from "./screens/administration/roles/RoleList.jsx";
import UpdateRole from "./screens/administration/roles/UpdateRole.jsx";
import UpdateUserRoles from "./screens/administration/users/UpdateUserRoles.jsx";
import UpdateUserDetails from "./screens/administration/users/UpdateUserDetails.jsx";
import TransferOrderHeadersList from "./screens/store/transferorder.jsx/TransferOrderHeadersList.jsx";
import CreateTransaferOrderHeader from "./screens/store/transferorder.jsx/CreateTransferOrderHeader.jsx";
import DeductionsScren from "./screens/payroll/DeductionsScren.jsx";
import WagesScreen from "./screens/payroll/WagesScreen.jsx";
import WagesList from "./screens/payroll/wages/WagesList.jsx";
import DeductionsList from "./screens/payroll/deductions/DeductionsList.jsx";
import CreateDeduction from "./screens/payroll/deductions/CreateDeduction.jsx";
import CreateWages from "./screens/payroll/wages/CreateWages.jsx";

import Bank2CashScreen from "./screens/finance/Bank2CashScreen.jsx";
import Bank2CashList from "./screens/finance/bank2cash/Bank2CashList.jsx";
import CreateBank2Cash from "./screens/finance/bank2cash/CreateBank2Cash.jsx";
import CreateCash2Bank from "./screens/finance/cash2bank/CreateCash2Bank.jsx";
import Cash2BankList from "./screens/finance/cash2bank/Cash2BankList.jsx";
import Cash2BankScreen from "./screens/finance/Cash2BankScreen.jsx";
import CommissionScreen from "./screens/sales/CommissionScreen.jsx";
import SalesPeopleCommission from "./screens/sales/commission/SalesPeopleCommission.jsx";
import PaymentEntriesScreen from "./screens/payment/PaymentEntriesScreen.jsx";
import PaymentEntries from "./screens/payment/payments/PaymentEntries.jsx";
import TrialBalanceList from "./screens/finance/trialbalance/TrialBalanceList.jsx";
import ProfitAndLossList from "./screens/finance/profitandloss/ProfitAndLossList.jsx";
import BalanceSheetList from "./screens/finance/balancesheet/BalanceSheetList.jsx";
import BalanceSheetScreen from "./screens/finance/BalanceSheetScreen.jsx";
import CashFlowList from "./screens/finance/cashflowstatement/CashFlowList.jsx";
import CashFlowScreen from "./screens/finance/CashFlowScreen.jsx";
import CostOfProductionScreen from "./screens/finance/CostOfProductionScreen.jsx";
import CostOfProductionList from "./screens/finance/costofproduction/CostOfProductionList.jsx";
import IncomeStatementScreen from "./screens/finance/IncomeStatementScreen.jsx";
import IncomeStatementList from "./screens/finance/incomestatement/IncomeStatementList.jsx";
import UpdatePacktypeSetting from "./screens/production/packhousesetup/UpdatePacktypeSetting.jsx";
import DeletePackHouseSettings from "./screens/production/packhousesetup/DeletePackHouseSettings.jsx";
import PostDailyPackHouse from "./screens/production/dailypackhouse/lines/PostDailyPackHouse.jsx";

import StorePurchaseReportScreen from "./screens/purchase/StorePurchaseReportScreen.jsx";
import StoreRequisitionReportScreen from "./screens/purchase/StoreRequisitionReportScreen.jsx";
import SupplierReportScreen from "./screens/administration/SupplierReportScreen.jsx";
import InventoryEntryReportScreen from "./screens/store/InventoryEntryReportScreen.jsx";
import InventoryRegisterReportScreen from "./screens/store/InventoryRegisterReportScreen.jsx";
import StockBalancesReportScreen from "./screens/store/StockBalancesReportScreen.jsx";
import SupplierMaizeReports from "./screens/administration/SupplierMaizeReports.jsx";
import ProductionReportScreen from "./screens/production/ProductionReportScreen.jsx";
import PackhousePeopleReportScren from "./screens/production/PackhousePeopleReportScren.jsx";
import DailyPackHouseReportScreen from "./screens/production/DailyPackHouseReportScreen.jsx";
import UpdateBankAccounts from "./screens/finance/bankaccounts/UpdateBankAccounts.jsx";
import UpdateCashAccounts from "./screens/finance/cashaccounts/UpdateCashAccounts.jsx";
import CreateBankReceipt from "./screens/sales/orderreceipts/CreateBankReceipt.jsx";
import CreateCashReceipts from "./screens/sales/orderreceipts/CreateCashReceipts.jsx";
import BankSupplier from "./screens/payment/payments/purchases/BankSuppliers.jsx";
import CashSupplier from "./screens/payment/payments/purchases/CashSuppliers.jsx";
import AllSuppliersPayments from "./screens/payment/payments/purchases/AllSuppliersPayments.jsx";
import NewRequisition from "./screens/payment/payments/requisitions/NewRequisition.jsx";
import BankPv from "./screens/payment/payments/paymentvouchers/BankPV.jsx";
import CashPv from "./screens/payment/payments/paymentvouchers/CashPV.jsx";
import AllPV from "./screens/payment/payments/paymentvouchers/AllPV.jsx";
import PaymentReportScreen from "./screens/payment/PaymentReportScreen.jsx";
import SupplierPaymentReportScreen from "./screens/payment/SupplierPaymentReportScreen.jsx";

import SalesReportScreen from "./screens/sales/SalesReportScreen.jsx";
import SalesPeopleScreen from "./screens/sales/SalesPeopleScreen.jsx";
import CreateReturnOrder from "./screens/sales/returnorders/CreateReturnOrder.jsx";
import BankReceipts from "./screens/sales/orderreceipts/BankReceiptsList.jsx";
import CashReceiptList from "./screens/sales/orderreceipts/CashReceiptList.jsx";
import AddLines from "./screens/sales/returnorders/AddLines.jsx";
import PostReturnOrder from "./screens/sales/returnorders/PostReturnOrder.jsx";
import DetailedSPOrderReport from "./screens/sales/DetailedSPOrderReport.jsx";
import LoadingListRport from "./screens/sales/LoadingListRport.jsx";
import AllBankSupplierPayment from "./screens/payment/payments/purchases/AllBankSupplierPayment.jsx";
import AllCashSupplierPayment from "./screens/payment/payments/purchases/AllCashSupplierPayment.jsx";
import SalesDashboard from "./screens/sales/SalesDashboard.jsx";
import StoreDashboard from "./screens/store/StoreDashboard.jsx";
import PurchaseDashboard from "./screens/purchase/PurchaseDashboard.jsx";
import ProductionDashboard from "./screens/production/ProductionDashboard.jsx";
import FinanceDashboard from "./screens/finance/FinanceDashboard.jsx";
import AdminDashboard from "./screens/administration/AdminiDashboard.jsx";
import FleetDashboard from "./screens/fleet/FleetDashboard.jsx";
import PayrollDashboard from "./screens/payroll/PayrollDashboard.jsx";
import UpdateInstitution from "./screens/administration/insititutions/UpdateInstitution.jsx";
import CustomerReportScreen from "./screens/administration/CustomerReportScreen.jsx";
import InsitituionReportScreen from "./screens/administration/InsitutionReportScreen.jsx";
import AddRequisitionLines from "./screens/payment/payments/requisitions/AddRequisitionLines.jsx";
import ViewPostedRequisition from "./screens/payment/payments/requisitions/ViewPostedRequisition.jsx";
import AllRequisitionsInProgress from "./screens/payment/payments/requisitions/AllRequisitionsInProgress.jsx";
import AllPostedRequisitions from "./screens/payment/payments/requisitions/AllPostedRequisitions.jsx";
import RunningInventoryReport from "./screens/store/storeitems/RunningInventoryReport.jsx";
import RunningInventoryReportScreen from "./screens/store/RunningInventoryReportScreen.jsx";
import PostRequisition from "./screens/payment/payments/requisitions/PostRequisition.jsx";
import SalesExpenseScreen from "./screens/sales/SalesExpenseScreen.jsx";
import SalesExpenseList from "./screens/sales/salesexpense/SalesExpenseList.jsx";
import NewSalesExpense from "./screens/sales/salesexpense/NewSalesExpense.jsx";
import MakePayment from "./screens/payment/payments/paymentvouchers/MakePayment.jsx";
import AllPaidPV from "./screens/payment/payments/paymentvouchers/AllPaidPV.jsx";
import AdvanceManagementScreen from "./screens/payroll/AdvanceManagementScreen.jsx";
import BiWeeklyRegisterScreen from "./screens/payroll/BiWeeklyRegisterScreen.jsx";
import PackHouseWageScreen from "./screens/payroll/PackHouseWageScreen.jsx";
import SalesPeopleCommisionScreen from "./screens/payroll/SalesPeopleCommisionScreen.jsx";
import SalesPeopleCommissionSetup from "./screens/payroll/SalesPeopleCommissionSetup.jsx";
import { SalaryJournalScreen } from "./screens/payment/SalaryJournalScreen.jsx";
import AllSalaryJournals from "./screens/payment/payments/salaryjournal/AllSalaryJournals.jsx";
import AllPaidSalaryJournals from "./screens/payment/payments/salaryjournal/AllPaidSalaryJournals.jsx";
import PaySalary from "./screens/payment/payments/salaryjournal/PaySalary.jsx";
import BiWeekStaffList from "./screens/payroll/biweeklyregister/BiWeekStaffList.jsx";
import AdvanceStaffList from "./screens/payroll/advancemanagement/AdvanceStaffList.jsx";
import AdvanceEntries from "./screens/payroll/advancemanagement/AdvanceEntries.jsx";
import RationedDeductionsEntries from "./screens/payroll/advancemanagement/RationedDeductionsEntries.jsx";
import PackhouseStaffList from "./screens/payroll/packhousewagesmanagement/PackhouseStaffList.jsx";
import ProductslistSetup from "./screens/payroll/salespeoplecommissionsetup/ProductslistSetup.jsx";
import SalesStaffList from "./screens/payroll/salespeoplecommissionmgt/SalesStaffList.jsx";
import NewAdvance from "./screens/payroll/advancemanagement/NewAdvance.jsx";
import AutoStockTakeScreen from "./screens/store/autoStockTakeScreen.jsx";
import AutoStock from "./screens/store/autostocktake/AutoStock.jsx";
import AutoStockTakeLines from "./screens/store/autostocktake/AutoStockTakeLines.jsx";
import ViewPayrollHeader from "./screens/payroll/payrollheader/viewpayrollheader.jsx";
import ProductionCertificate from "./screens/production/productionheaders/ProductionCertificate.jsx";
import EditLimit from "./screens/sales/salespeople/EditLimit.jsx";
import EditBiweeklyRegister from "./screens/payroll/biweeklyregister/EditBiweeklyRegister.jsx";
import ViewOrderInvoice from "./screens/sales/orderinvoice/ViewOrderInvoice.jsx";
import DeliveryNote from "./screens/sales/orderdispatch/DeliveryNote.jsx";
import ItemTrackingReport from "./screens/store/ItemTrackingReport.jsx";
import CustomerStatement from "./screens/administration/customers/CustomerStatement.jsx";
import InstitutionStatement from "./screens/administration/insititutions/InstitutionStatement.jsx";
import SupplierStatement from "./screens/payment/payments/purchases/SupplierStatement.jsx";
import FixedRate from "./screens/payroll/salespeoplecommissionmgt/FixedRate.jsx";
import RemoveItem from "./screens/payroll/salespeoplecommissionsetup/RemoveItem.jsx";
import AddItem from "./screens/payroll/salespeoplecommissionsetup/AddItem.jsx";
import SalesBankReceiptsReport from "./screens/sales/SalesBankReceiptsReport.jsx";
import IctScreen from "./screens/ict/IctScreen.jsx";

import AllAllowedAbsence from "./screens/ict/biometric/AllAllowedAbsence.jsx";

import CancelAttance from "./screens/ict/biometric/CancelAttance.jsx";

import DailyAttendance from "./screens/ict/biometric/DailyAttendance.jsx";
import AttendanceReport from "./screens/ict/biometric/AttendanceReport.jsx";
import Validate from "./screens/ict/bankrecon/Validate.jsx";
import UploadBankStatement from "./screens/ict/bankrecon/UploadBankStatement.jsx";
import Reconcile from "./screens/ict/bankrecon/Reconcile.jsx";
import BankPeriod from "./screens/ict/bankrecon/BankPeriod.jsx";
import FuelExpenseScreen from "./screens/fleet/FuelExpenseScreen.jsx";
import MialageScreen from "./screens/fleet/MialageScreen.jsx";
import TripSheetScreen from "./screens/fleet/TripsheetScreen.jsx";
import VendorsScreen from "./screens/fleet/VendorsScreen.jsx";
import AllFuelExpenses from "./screens/fleet/fuelexpense.jsx/AllFuelExpenses.jsx";
import NexFuelExpense from "./screens/fleet/fuelexpense.jsx/NexFuelExpense.jsx";
import AllMialage from "./screens/fleet/mialage/AllMialage.jsx";
import NewMialage from "./screens/fleet/mialage/NewMialage.jsx";
import AllVendors from "./screens/fleet/vendors/AllVendors.jsx";
import NewVendor from "./screens/fleet/vendors/NewVendor.jsx";
import VehicleTripSummary from "./screens/fleet/tripsheet/VehicleTripSummary.jsx";
import VehicleTripDetails from "./screens/fleet/tripsheet/VehicleTripDetails.jsx";
import BiWeeklyBiometricScreen from "./screens/payroll/BiWeeklyBiometricScreen.jsx";
import BiWeeklyBioStaffList from "./screens/payroll/biweeklybiometric/BiWeeklyBioStaffList.jsx";
import UpdateAllowedAbsence from "./screens/ict/biometric/UpdateAllowedAbsence.jsx";
import UpdateCancelledAttandance from "./screens/ict/biometric/UpdateCancelledAttandance.jsx";
import PayrollSummaryReport from "./screens/payroll/PayrollSummaryReport.jsx";
import PayrollSpecificReport from "./screens/payroll/PayrollSpecificReport.jsx";
import StockIssueScreen from "./screens/store/StockIssueScreen.jsx";
import AllStoreIssues from "./screens/store/stockissue/AllStoreIssues.jsx";
import NewStoreIssue from "./screens/store/stockissue/NewStoreIssue.jsx";
import EditBiWeeklyBiometric from "./screens/payroll/biweeklybiometric/EditBiWeeklyBiometric.jsx";
import { PayVendorScreen } from "./screens/payment/PayVendorScreen.jsx";
import BankVendors from "./screens/payment/payments/payvendors/BankVendor.jsx";
import CashVendor from "./screens/payment/payments/payvendors/CashVendors.jsx";
import StockTakeLines from "./screens/store/stocktake/StockTakeLines.jsx";
import AllCashVendorPayments from "./screens/payment/payments/payvendors/AllCashVendorPayments.jsx";
import AllBankVendorPayments from "./screens/payment/payments/payvendors/AllBankVendorPayments.jsx";
import LastIn from "./screens/ict/biometric/LastIn.jsx";
import VehicleMaintenanceExpenseReport from "./screens/fleet/tripsheet/VehicleMaintenanceExpenseReport.jsx";
import paymentReportsVendors from "./screens/payment/paymentReportsVendors.jsx"
import { VendorReportScreen } from "./screens/payment/VendorReportScreen.jsx";
const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/securedhome" element={<SecuredHomeScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />

        {/* administration routes */}
        <Route path="administration" element={<AdministrationScreen />}>
          <Route index element={<AdminDashboard />} />
          <Route index element={<AdministrationDashboardScreen />} />
          <Route path="users" element={<UsersScreen />}>
            <Route index element={<UserList />} />
            <Route path="createuser" element={<CreateUser />} />
            <Route path="allusers" element={<UserList />} />
            <Route path="update/:id" element={<UpdateUserDetails />} />
            <Route path="roles/:id" element={<UpdateUserRoles />} />
          </Route>
          <Route path="institutions" element={<InstitutionsScreen />}>
            <Route index element={<Institutionlist />} />
            <Route path="createinstitution" element={<CreateInstition />} />
            <Route path="allinstitution" element={<Institutionlist />} />
            <Route path="update/:id" element={<UpdateInstitution />} />
            <Route path="statement/:id" element={<InstitutionStatement />} />
          </Route>
          <Route path="suppliers" element={<SuppliersScreen />}>
            <Route index element={<SupplierList />} />
            <Route path="createsupplier" element={<CreateSupplier />} />
            <Route path="update/:id" element={<UpdateSupplier />} />
            <Route path="allsuppliers" element={<SupplierList />} />
          </Route>
          <Route
            path="supplierreports"
            element={<SupplierReportScreen />}
          ></Route>
          <Route
            path="customerreports"
            element={<CustomerReportScreen />}
          ></Route>
          <Route
            path="institutionreports"
            element={<InsitituionReportScreen />}
          ></Route>
          <Route
            path="suppliersreport"
            element={<SupplierPaymentReportScreen />}
          ></Route>
          <Route
            path="suppliermaizereports"
            element={<SupplierMaizeReports />}
          ></Route>
          <Route path="staff" element={<StaffScreen />}>
            <Route index element={<StaffList />} />
            <Route path="createstaff" element={<CreateStaff />} />
            <Route path="update/:id" element={<UpdateStaff />} />
            <Route path="allstaff" element={<StaffList />} />
            <Route path="delete/:id" element={<DeleteStaff />} />
          </Route>
          <Route path="bulksms" element={<BulkSMSScreen />}>
            <Route path="bulkmessages" element={<SendBulkSMS />} />
            <Route path="bulkcustom" element={<SendToCustom />} />
          </Route>
          <Route path="customers" element={<CustomersScreen />}>
            <Route path="createcustomer" element={<CreateCustomer />} />
            <Route path="allcustomers" element={<CustomerList />} />
            <Route path="update/:id" element={<UpdateCustomer />} />
            <Route path="statement/:id" element={<CustomerStatement />} />
          </Route>
          <Route path="roles" element={<RolesScreen />}>
            <Route path="createrole" element={<CreateRole />} />
            <Route path="allroles" element={<RoleList />} />
            <Route path="update/:id" element={<UpdateRole />} />
          </Route>
        </Route>

        {/* payroll */}
        <Route path="payroll" element={<PayrollScreen />}>
          <Route index element={<PayrollDashboard />} />
          <Route path="category" element={<CategoryScreen />}>
            <Route path="categories" element={<CategoryList />} />
            <Route path="createcategory" element={<CreateCategory />} />
            <Route
              path="updatepayrollcategory/:id"
              element={<UpdatePayrollCategory />}
            />
          </Route>
          <Route path="payrollsetup" element={<PayrollSetupScreen />}>
            <Route path="addstaffsetup" element={<AddStaffSetup />} />
            <Route path="staffsetlist" element={<StaffSetupList />} />
            <Route path="removestaffsetup" element={<RemoveStaffSetup />} />
            <Route path="updatestaffsetup/:id" element={<UpdateStaffSetup />} />
            <Route path="viewstaffsetup/:id" element={<ViewStaffSetup />} />
          </Route>
          <Route path="deductions" element={<DeductionsScren />}>
            <Route path="deductionlist" element={<DeductionsList />} />
            <Route path="createduduction" element={<CreateDeduction />} />
            <Route path="removededuction" element={<RemoveDeduction />} />
            <Route path="updatededuction/:id" element={<UpdateDeduction />} />
          </Route>
          <Route path="wages" element={<WagesScreen />}>
            <Route path="wageslist" element={<WagesList />} />
            <Route path="createwage" element={<CreateWages />} />
            <Route path="removededuction" element={<RemoveDeduction />} />
            <Route path="updatededuction/:id" element={<UpdateDeduction />} />
          </Route>
          <Route path="payrollheader" element={<PayrollHeaderScreen />}>
            <Route path="allpayroll" element={<PayrollHeadersList />} />
            <Route path="packHousecategory" element={<PackHouseCategory />} />
            <Route path="salescategory" element={<SalesCategory />} />
            <Route path="productioncategory" element={<ProductionCategory />} />
            <Route path="generalcategory" element={<GeneralCategory />} />
            <Route path="actions/:id" element={<PayrollActions />} />
            <Route
              path="viewpayrollheader/:id"
              element={<ViewPayrollHeader />}
            />

            <Route path="createpayroll" element={<CreatePayrollHeaders />} />
          </Route>
          <Route path="advancemanagement" element={<AdvanceManagementScreen />}>
            <Route path="advanceentries" element={<AdvanceEntries />} />
            <Route path="advancestafflist" element={<AdvanceStaffList />} />
            <Route path="newadvance/:id" element={<NewAdvance />} />
            <Route
              path="rationdeductions"
              element={<RationedDeductionsEntries />}
            />
          </Route>
          <Route path="biweeklyregister" element={<BiWeeklyRegisterScreen />}>
            <Route path="biweeklystaffregister" element={<BiWeekStaffList />} />
            <Route
              path="editbiweeklyregister/:id"
              element={<EditBiweeklyRegister />}
            />
          </Route>
          <Route path="biweeklybiometric" element={<BiWeeklyBiometricScreen />}>
            <Route
              path="biweeklystaffbiometric"
              element={<BiWeeklyBioStaffList />}
            />
            <Route
              path="editbiweeklybiometric/:id"
              element={<EditBiWeeklyBiometric />}
            />
          </Route>
          <Route path="packhousewage" element={<PackHouseWageScreen />}>
            <Route path="staffsetlist" element={<PackhouseStaffList />} />
          </Route>
          <Route
            path="payrollsummaryreport"
            element={<PayrollSummaryReport />}
          ></Route>
          <Route
            path="payrollspecificreport"
            element={<PayrollSpecificReport />}
          ></Route>
          <Route
            path="salespeoplecommision"
            element={<SalesPeopleCommisionScreen />}
          >
            <Route path="staffsetlist" element={<SalesStaffList />} />
            <Route path="fixedrate/:id" element={<FixedRate />} />
          </Route>
          <Route
            path="salespeoplecommissionsetup"
            element={<SalesPeopleCommissionSetup />}
          >
            <Route path="productbalesetup" element={<ProductslistSetup />} />
            <Route path="additem" element={<AddItem />} />
            <Route path="removeitem" element={<RemoveItem />} />
          </Route>
        </Route>

        {/* payment */}
        <Route path="payment" element={<PaymentScreen />}>
          <Route index element={<ProductionDashboard />} />
          <Route path="purchases" element={<PurchasesScreen />}>
            <Route path="bankpurchasepayment" element={<BankSupplier />} />
            <Route path="cashpurchasepayment" element={<CashSupplier />} />
            <Route path="statement/:id" element={<SupplierStatement />} />
            <Route
              path="allpurchasepurchasepayemnt"
              element={<AllSuppliersPayments />}
            />
            <Route
              path="allbanksupplierpayment"
              element={<AllBankSupplierPayment />}
            />
            <Route
              path="allcashsupplierpayment"
              element={<AllCashSupplierPayment />}
            />
          </Route>
          <Route path="requsitions" element={<RequisitionsScreen />}>
            <Route
              path="createpaymentrequisition"
              element={<NewRequisition />}
            />
            <Route
              path="allpaymentrequisitions"
              element={<RequisitionList />}
            />
            <Route
              path="allpostedrequisitions"
              element={<Allpostedrequisitions />}
            />
            <Route
              path="addrequisitionlines/:id"
              element={<AddRequisitionLines />}
            />
            <Route path="postrequisition/:id" element={<PostRequisition />} />
            <Route
              path="viewrequisition/:id"
              element={<ViewPostedRequisition />}
            />
            <Route
              path="allrequisitioninprogress"
              element={<AllRequisitionsInProgress />}
            />
            <Route
              path="allpostedrequisition"
              element={<AllPostedRequisitions />}
            />
          </Route>
          <Route
            path="paymentreports"
            element={<PaymentReportScreen />}
          ></Route>
         
          <Route path="payvendors" element={<PayVendorScreen />}>
            <Route path="vendorbank" element={<BankVendors />} />
            <Route
              path="allcashvendorpayment"
              element={<AllCashVendorPayments />}
            />
            <Route
              path="allbankvendorpayment"
              element={<AllBankVendorPayments />}
            />
            <Route path="vendorcash" element={<CashVendor />} />
          </Route>
          <Route path="salaryjournal" element={<SalaryJournalScreen />}>
            <Route path="allsalaryjournals" element={<AllSalaryJournals />} />
            <Route
              path="allpaidsalaryjournals"
              element={<AllPaidSalaryJournals />}
            />
            <Route path="paysalary/:id" element={<PaySalary />} />
          </Route>
          <Route
            path="suppliersreport"
            element={<SupplierPaymentReportScreen />}
          ></Route>
         

          <Route path="paymentvoucher" element={<PaymentVoucherScreen />}>
            <Route path="bankpv" element={<BankPv />} />
            <Route path="cashpv" element={<CashPv />} />
            <Route path="allpv" element={<AllPV />} />
            <Route path="allpaidpv" element={<AllPaidPV />} />
            <Route path="makepayment/:id" element={<MakePayment />} />
          </Route>
          <Route path='vendorreports' element={<VendorReportScreen />}>

</Route>

          <Route 
          path="paymentreportsvendors"
          element={<paymentReportsVendors/>}>
            
          </Route>
         
        </Route>

        {/* production routes */}
        <Route path="production" element={<ProductionScreen />}>
          <Route index element={<ProductionDashboard />} />
          <Route index element={<ProductionDashboardScreen />} />
          {/* production header routes */}
          <Route path="productionheaders" element={<ProductionHeaderScreen />}>
            <Route
              path="createproductionheader"
              element={<CreateProductionHeader />}
            />
            <Route
              path="allproductionheaders"
              element={<ProductionHeaderList />}
            />
            <Route
              path="productioncertificate/:id"
              element={<ProductionCertificate />}
            />
            <Route
              path="allproductionheaderlistintransit"
              element={<AllProductionHeaderListInTransit />}
            />
            <Route
              path="allpostedtransiactionheaderlist"
              element={<AllPostedProductionHeaderList />}
            />
            <Route
              path="viewpostedproductionheade/:id"
              element={<ViewPostedProductiobHeader />}
            />
          </Route>
          <Route
            path="productionreport"
            element={<ProductionReportScreen />}
          ></Route>
          {/* daily packhouse routes */}
          <Route path="dailypackhouse" element={<DailyPackhouseScreen />}>
            <Route
              path="alldailypackhouse"
              element={<DailyPackHouseHeadersList />}
            />

            <Route
              path="alldailypackhouseintransit"
              element={<AllDailyPackhouseHeaderInTransit />}
            />
            <Route
              path="allposteddailypackhouse"
              element={<AllPostedDailyPackhouse />}
            />
            <Route
              path="createdailypackhouse"
              element={<CreateDailyPackhouseHeader />}
            />
            <Route
              path="postdailypackhouse/:id"
              element={<PostDailyPackHouse />}
            />
          </Route>
          <Route
            path="DailyPackHouseReportScreen"
            element={<DailyPackHouseReportScreen />}
          ></Route>
          {/* production set up */}
          <Route path="productionsetup" element={<ProductionSetupScreen />}>
            <Route path="productssetuplist" element={<ProductionSetupList />} />
            <Route path="packagesetuplist" element={<PackagingSetupList />} />
            <Route path="createpackagesetup" element={<CreatePackageSetup />} />
            <Route path="createproductsetup" element={<CreateProductSetup />} />
            <Route
              path="updatepackagingsetup/:id"
              element={<UpdatePackagingSetup />}
            />
          </Route>
          {/* packhouse routes */}
          <Route path="packhouse" element={<PackHouseScreen />}>
            <Route path="allpackhouse" element={<PackhouseList />} />
            <Route path="createpackhouse" element={<CreatePackHouse />} />
          </Route>
          {/* pack house entries */}
          <Route path="packhouseentries" element={<PackHouseEntriesScreen />}>
            <Route
              path="allpackhouseentries"
              element={<PackhouseEntriesList />}
            />
          </Route>

          {/* packhousesetupsecreen */}
          <Route path="packhousesetupscreen" element={<PackhouseSetupScreen />}>
            <Route path="packtypesettings" element={<PacktypeSettingList />} />
            <Route
              path="createpacktypesettings"
              element={<CreatePacktypeSetting />}
            />
            <Route
              path="updatepackhouse/:id"
              element={<UpdatePacktypeSetting />}
            />
            <Route
              path="deletepackhousesetting/:id"
              element={<DeletePackHouseSettings />}
            />
          </Route>

          {/* pack house people */}
          <Route path="packhousepeople" element={<PackHouseScreen />}>
            <Route index element={<PackhosePeopleList />} />
            <Route path="createpackhouse" element={<CreatePackhousePerson />} />
            <Route path="allpackhouse" element={<PackhosePeopleList />} />
            <Route
              path="deletepackhouseperson/:id"
              element={<DeletePackHousePerson />}
            />
          </Route>
          <Route
            path="packhousepeoplereport"
            element={<PackhousePeopleReportScren />}
          ></Route>
        </Route>
        {/* store routes */}
        <Route path="store" element={<StoreScreen />}>
          <Route index element={<StoreDashboard />} />
          <Route path="storeitemregister" element={<StoreItemRegister />}>
            <Route index element={<ItemListList />} />
            <Route path="registeritem" element={<CreateItemList />} />
            <Route path="update/:id" element={<UpdateItemsRegister />} />
            <Route path="allregistereditems" element={<ItemListList />} />
          </Route>
          {/* // transfer screen */}
          <Route path="storetransfer" element={<TransferScreen />}>
            <Route
              path="alltransferorders"
              element={<TransferOrderHeadersList />}
            />
            <Route
              path="createtransferorder"
              element={<CreateTransaferOrderHeader />}
            />
          </Route>
          <Route path="stocktake" element={<StockTakeScreen />}>
            <Route imdex element={<StocktakeList />} />
            <Route path="allstocktakes" element={<StocktakeList />} />
            <Route path="stocktakeline/:id" element={<StockTakeLines />} />
            <Route path="createstocktake" element={<CreateStockTake />} />
            <Route
              path="allstocktakeinprogress"
              element={<StockTakeInProgress />}
            />
            <Route path="allpostedstocktakes" element={<PostedStockTake />} />
          </Route>
          <Route path="stockissue" element={<StockIssueScreen />}>
            <Route path="allstoreissues" element={<AllStoreIssues />} />
            <Route path="newstoreissue" element={<NewStoreIssue />} />
          </Route>
          <Route path="autostocktake" element={<AutoStockTakeScreen />}>
            <Route path="autostock" element={<AutoStock />} />
            <Route
              path="autostocktakelist/:id"
              element={<AutoStockTakeLines />}
            />
          </Route>

          <Route path="itemadjustment" element={<ItemAdjustmentScreen />}>
            <Route index element={<StockAdjustmentlist />} />
            <Route
              path="createstockadjustment"
              element={<CreateStockAdjustment />}
            />
            <Route
              path="allstockadjustment"
              element={<StockAdjustmentlist />}
            />
            <Route index element={<StockAdjustmentlist />} />
            <Route
              path="allstockadjustmentinprogrss"
              element={<StockAdjustmentInProgress />}
            />
            <Route
              path="allpostedstockadjustment"
              element={<PostedStockAdjustment />}
            />
          </Route>
          <Route path="storeitems" element={<StoreItemsScreen />}>
            <Route index element={<StoreItemslist />} />
            <Route path="createstoreitem" element={<CreateStoreItemslist />} />
            <Route path="update/:id" element={<UpdateStoreItems />} />
            <Route path="allstoreitems" element={<StoreItemslist />} />
          </Route>
          <Route
            path="runninginventoryreportscreen"
            element={<RunningInventoryReportScreen />}
          >
            <Route
              path="runninginventoryreport"
              element={<RunningInventoryReport />}
            />
          </Route>
          <Route path="storeitemsentries" element={<StoreItemEntriesScreen />}>
            <Route path="allitementries" element={<AllItemEntries />} />
          </Route>
          <Route path="storeregister" element={<StoreRegisterScreen />}>
            <Route index element={<StoreRegisterList />} />
            <Route
              path="createstoreregister"
              element={<CreateStoreRegister />}
            />
            <Route path="allstoreregister" element={<StoreRegisterList />} />
          </Route>
          <Route
            path="stockbalances"
            element={<StockBalancesReportScreen />}
          ></Route>
          <Route
            path="inventoryregister"
            element={<InventoryRegisterReportScreen />}
          ></Route>
          <Route path="itemtracking" element={<ItemTrackingReport />}></Route>
          <Route
            path="inventoryentry"
            element={<InventoryEntryReportScreen />}
          ></Route>
        </Route>
        {/* purchase routes */}
        <Route path="purchase" element={<PurchaseScreen />}>
          <Route index element={<PurchaseDashboard />} />
          <Route path="suppliers" element={<SuppliersScreen />}>
            <Route index element={<SupplierList />} />
            <Route path="createsupplier" element={<CreateSupplier />} />
            <Route path="allsuppliers" element={<SupplierList />} />
            <Route path="update/:id" element={<UpdateSupplier />} />
          </Route>
          <Route
            path="supplierreports"
            element={<SupplierReportScreen />}
          ></Route>
          <Route
            path="suppliermaizereports"
            element={<SupplierMaizeReports />}
          ></Route>
          <Route
            path="storepurcharsereports"
            element={<StorePurchaseReportScreen />}
          ></Route>
          <Route
            path="storerequisitionreport"
            element={<StoreRequisitionReportScreen />}
          ></Route>
          <Route path="storepurchase" element={<StorePurchaseScreen />}>
            {/* <Route index element={<PurchaseList />} /> */}
            <Route path="createstorepurchase" element={<CreatePurchase />} />
            <Route
              path="allstorepurchasesintransit"
              element={<AllStorePurchasesInTransit />}
            />
            <Route path="allmaizepurchase" element={<AllMaizePurchase />} />
            <Route path="allstorepurchase" element={<PurchaseList />} />
            <Route
              path="allpostedstorepurchases"
              element={<AllPostedStorePurchases />}
            />
          </Route>
          <Route path="storerequisition" element={<StoreRequisitionScreen />}>
            <Route path="createrequisition" element={<CreateRequisition />} />
            <Route
              path="allinprogressrequisitions"
              element={<StockTakeInProgress />}
            />

            <Route path="allstorerequisitions" element={<RequisitionList />} />
          </Route>
          <Route path="requsitions" element={<RequisitionsScreen />}>
            <Route
              path="createpaymentrequisition"
              element={<NewRequisition />}
            />
            <Route
              path="allpaymentrequisitions"
              element={<RequisitionList />}
            />
            <Route
              path="allpostedrequisitions"
              element={<Allpostedrequisitions />}
            />
            <Route
              path="addrequisitionlines/:id"
              element={<AddRequisitionLines />}
            />
            <Route path="postrequisition/:id" element={<PostRequisition />} />
            <Route
              path="viewrequisition/:id"
              element={<ViewPostedRequisition />}
            />
            <Route
              path="allrequisitioninprogress"
              element={<AllRequisitionsInProgress />}
            />
            <Route
              path="allpostedrequisition"
              element={<AllPostedRequisitions />}
            />
          </Route>
        </Route>

        {/* sales routes */}
        <Route path="sales" element={<SalesScreen />}>
          <Route index element={<SalesDashboard />} />
          <Route path="orders" element={<OrdersScreen />}>
            <Route path="CreateOrder" element={<CreateOrder />} />
            <Route path="allorders" element={<Orderlist />} />

            <Route
              path="allordersintansit"
              element={<AllOrderHeadersInTransit />}
            />
            <Route path="postedallorders" element={<AllPostedOrderHeaders />} />
            <Route
              path="postedorderpreview/:id"
              element={<PostedOrderPreview />}
            />
          </Route>

          <Route path="salesexpense" element={<SalesExpenseScreen />}>
            <Route path="salesexpenselist" element={<SalesExpenseList />} />
            <Route path="newsalesexpense" element={<NewSalesExpense />} />
          </Route>
          <Route path="commission" element={<CommissionScreen />}>
            <Route path="salescommission" element={<SalesPeopleCommission />} />
          </Route>
          <Route path="returnorder" element={<ReturnOrdersScreen />}>
            <Route path="allreturnorders" element={<ReturnOrderlist />} />
            <Route path="createreturnorder" element={<CreateReturnOrder />} />
            <Route path="reverseorderlist" element={<ReverseorderList />} />
            <Route
              path="returnorderview/:id"
              element={<ReturnOrderpreview />}
            />
            <Route path="rerveseorder/:id" element={<ReverseOrderPreview />} />
            <Route path="AddLines/:id" element={<AddLines />} />
            <Route path="postreturnorder/:id" element={<PostReturnOrder />} />

            <Route
              path="allreturnordersintransit"
              element={<AllReurnOrdersInTransit />}
            />
            <Route
              path="allpostedreturnorders"
              element={<AllPostedReturnOrders />}
            />
          </Route>
          <Route path="orderdispatch" element={<OrdersDispatchScreen />}>
            <Route index element={<OrderDispatchList />} />
            <Route
              path="undispatchedorders"
              element={<CreateOrderDispatch />}
            />
            <Route path="dispatchedorders" element={<OrderDispatchList />} />
            <Route path="deliverynote/:id" element={<DeliveryNote />} />
          </Route>
          <Route path="salesreport" element={<SalesReportScreen />}></Route>
          <Route
            path="detailedsporderreport"
            element={<DetailedSPOrderReport />}
          ></Route>
          <Route
            path="salesbankreceiptreport"
            element={<SalesBankReceiptsReport />}
          ></Route>
          <Route
            path="salespeoplereport"
            element={<SalesReportScreen />}
          ></Route>
          <Route path="loadinglist" element={<LoadingListRport />}></Route>
          <Route path="orderinvoice" element={<OrderInvoiceScreen />}>
            <Route index element={<OrderInvoiceList />} />
            <Route path="createinvoice" element={<CreateOrderInvoce />} />
            <Route path="allorderinvoices" element={<OrderInvoiceList />} />
            <Route
              path="orderinvoicepreview/:id"
              element={<ViewOrderInvoice />}
            />
          </Route>

          <Route path="orderreceipts" element={<OrderReceiptScreen />}>
            <Route path="bankreceiptslist" element={<BankReceipts />} />
            <Route path="cashreceiptslist" element={<CashReceiptList />} />
            <Route path="bankreceipts" element={<CreateBankReceipt />} />
            <Route path="cashreceipts" element={<CreateCashReceipts />} />
          </Route>
          <Route path="salespeople" element={<SalesPeopleScreen />}>
            <Route path="createsalesperson" element={<CreateSalesPeople />} />
            <Route path="allsalespeople" element={<SalesPeoplelist />} />
            <Route path="edit/:id" element={<EditLimit />} />
            <Route
              path="deletesalesperson/:id"
              element={<DeleteSalesPerson />}
            />
          </Route>
        </Route>

        <Route path="fleet" element={<FleetScreen />}>
          <Route index element={<FleetDashboard />} />
          <Route path="drivers" element={<DriverScreen />}>
            <Route path="alldrivers" element={<DriversList />} />
            <Route path="createdriver" element={<CreateDrivers />} />
            <Route path="update/:id" element={<EditDriver />} />
            <Route path="assignments" element={<AssignDriverVehicle />} />
            <Route
              path="assignments/update/:id"
              element={<EditDriverVehicleAssign />}
            />
          </Route>
          <Route path="routes" element={<RoutesScreen />}>
            <Route path="allroutes" element={<RoutesList />} />
            <Route path="createroute" element={<CreateRoutes />} />
            <Route path="update/:id" element={<EditRoute />} />
            <Route path="assignments" element={<AssignDriverRoute />} />
            <Route
              path="assignments/update/:id"
              element={<EditDriverRouteAssign />}
            />
          </Route>
          <Route path="vehicles" element={<VehicleScreen />}>
            <Route path="allvehicles" element={<VehicleList />} />
            <Route path="createvehicle" element={<CreateVehicle />} />
            <Route path="update/:id" element={<EditVehicle />} />
          </Route>
          <Route path="maintanance" element={<ManagementScreen />}>
            <Route path="allmaintenance" element={<MaintenanceList />} />
            <Route
              path="CreateMaintenance"
              element={<CreateMaintenanceList />}
            />
            <Route path="update/:id" element={<EditMaintenance />} />
          </Route>
          <Route path="runs" element={<RunHeadersScreen />}>
            <Route path="allruns" element={<RunsList />} />
            <Route path="allrunsintransit" element={<AllRunsInTransit />} />
            <Route path="allpsotedruns" element={<AllPostedRuns />} />
            <Route path="update/:id" element={<EditRuns />} />
            <Route path="createrun" element={<CreateRun />} />
          </Route>
          <Route path="fuelexpense" element={<FuelExpenseScreen />}>
            <Route path="allfuelexpenses" element={<AllFuelExpenses />} />
            <Route path="newfuelexpense" element={<NexFuelExpense />} />
          </Route>
          <Route path="mileage" element={<MialageScreen />}>
            <Route path="takemialage" element={<NewMialage />} />
            <Route path="mialagehistory" element={<AllMialage />} />
          </Route>
          <Route path="tripsheet" element={<TripSheetScreen />}>
            <Route path="vehicletripsummary" element={<VehicleTripSummary />} />

            <Route path="vehicletripdetails" element={<VehicleTripDetails />} />
            <Route
              path="vehiclemaintenanceexpensereport"
              element={<VehicleMaintenanceExpenseReport />}
            />
          </Route>
          <Route path="vendors" element={<VendorsScreen />}>
            <Route path="allvendors" element={<AllVendors />} />
            <Route path="newvendor" element={<NewVendor />} />
          </Route>
        </Route>
        {/*ict*/}
        <Route path="ict" element={<IctScreen />}>
          <Route path="dailyattance" element={<DailyAttendance />}></Route>
          <Route path="attendancereport" element={<AttendanceReport />}></Route>
          <Route path="allowedabsence" element={<AllAllowedAbsence />}></Route>
          <Route path="lastin" element={<LastIn />}></Route>
          <Route
            path="updateallowedabsence/:id"
            element={<UpdateAllowedAbsence />}
          />
          <Route
            path="updatecancelldattendance/:id"
            element={<UpdateCancelledAttandance />}
          />
          <Route path="cancelledattendance" element={<CancelAttance />}></Route>
          <Route path="validate" element={<Validate />}></Route>
          <Route
            path="uploadbankstatement"
            element={<UploadBankStatement />}
          ></Route>
          <Route path="reconcile" element={<Reconcile />}></Route>
          <Route path="bankperiod" element={<BankPeriod />}></Route>
        </Route>

        {/* finance routes */}
        <Route path="finance" element={<FinanceScreen />}>
          <Route index element={<FinanceDashboard />} />
          <Route path="accounts" element={<AccountsScreen />}>
            <Route index element={<AccountsList />} />
            <Route path="allaccounts" element={<AccountsList />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route path="update/:id" element={<UpdateAccounts />} />
            <Route path="viewaccount" element={<ViewAccounts />} />
          </Route>

          <Route path="cash2bank" element={<Cash2BankScreen />}>
            <Route path="cash2bank" element={<Cash2BankList />} />
            <Route path="createcash2bankk" element={<CreateCash2Bank />} />
            {/* <Route path="update/:id" element={<UpdateCash2Bank />} /> */}
          </Route>
          <Route path="bank2cash" element={<Bank2CashScreen />}>
            <Route path="bank2cash" element={<Bank2CashList />} />
            <Route path="createbank2cash" element={<CreateBank2Cash />} />
          </Route>
          <Route path="allaccountentries" element={<AccountEntriesScreen />}>
            <Route path="allaccountentries" element={<AllAccountEntries />} />
          </Route>
          <Route path="gl" element={<GeneralledgerScreen />}>
            <Route index element={<GLList />} />
            <Route path="allgl" element={<GLList />} />
            <Route path="updategl/:id" element={<UpdateGL />} />
            <Route path="creategl" element={<CreateGL />} />
          </Route>
          <Route path="mpesapaybills" element={<MpesaPaybillsScreen />}>
            <Route index element={<MpesaPaybillList />} />
            <Route path="creatempesapaybill" element={<CreateMpesaPaybill />} />
            <Route path="allmpesapaybills" element={<MpesaPaybillList />} />
          </Route>
          <Route path="mpesatills" element={<MpesaTillsScreen />}>
            <Route index element={<MpesatillList />} />
            <Route path="creatempesatill" element={<CreatempesaList />} />
            <Route path="allmpesatill" element={<MpesatillList />} />
          </Route>
          <Route
            path="allcashaccountentries"
            element={<CashAccountEntriesScreen />}
          >
            <Route
              path="allcashaccountentries"
              element={<AllCashAccountEntries />}
            />
          </Route>
          <Route path="cashaccounts" element={<CashAccountScreen />}>
            <Route path="allcashaccounts" element={<AllCashAccount />} />
            <Route path="createCashAccount" element={<CReateCashAccount />} />
            <Route path="update/:id" element={<UpdateCashAccounts />} />
          </Route>
          <Route path="bankaccounts" element={<BankAccountsScreem />}>
            <Route index element={<BankAccountsList />} />
            <Route path="createbankaccount" element={<CreateBankAccount />} />
            <Route path="bankaccounts" element={<BankAccountsList />} />
            <Route path="update/:id" element={<UpdateBankAccounts />} />
            <Route
              path="updateBankAccount/:id"
              element={<UpdateBankAccounts />}
            />
          </Route>
          <Route
            path="bankaccountentries"
            element={<BankAccountEntiresScreen />}
          >
            <Route
              path="allbankaccountsentries"
              element={<AllbankAccountEntries />}
            />
          </Route>
          {/* // account Payable */}
          <Route path="payables" element={<PayablesScreen />}>
            <Route path="allaccountpayables" element={<AllAccountPayables />} />
          </Route>
          {/* // account receivable */}
          <Route path="receivabe" element={<ReceivableScreen />}>
            <Route
              path="allaccountreceivable"
              element={<AllAccountReceivable />}
            />
          </Route>
          <Route path="trialbalance" element={<TrialBalanceScreen />}>
            <Route path="alltb" element={<TrialBalanceList />} />
          </Route>
          <Route
            path="profitandlossstatement"
            element={<ProfitAndLossAccountScreen />}
          >
            <Route path="profitandloss" element={<ProfitAndLossList />} />
          </Route>
          <Route path="balancesheet" element={<BalanceSheetScreen />}>
            <Route path="balanceSheet" element={<BalanceSheetList />} />
          </Route>
          <Route path="cashflowanalysis" element={<CashFlowScreen />}>
            <Route path="cashflow" element={<CashFlowList />} />
          </Route>
          <Route path="costofproduction" element={<CostOfProductionScreen />}>
            <Route path="costofproduction" element={<CostOfProductionList />} />
          </Route>
          <Route path="incomestatement" element={<IncomeStatementScreen />}>
            <Route path="incomestatement" element={<IncomeStatementList />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
