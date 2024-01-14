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
import OrderPostingScreen from "./screens/sales/OrderPostingScreen.jsx";
import OrdersScreen from "./screens/sales/OrdersScreen.jsx";
import OrderReceiptScreen from "./screens/sales/OrderReceiptScreen.jsx";
import OrdersDispatchScreen from "./screens/sales/OrdersDispatchScreen.jsx";
import SalesPeopleScreen from "./screens/sales/SalesPeopleScreen.jsx";
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
import UpdateAccount from "./screens/finance/accounts/UpdateAccount.jsx";
import ViewAccounts from "./screens/finance/accounts/ViewAccounts.jsx";
import PurchaseScreen from "./screens/purchase/PurchaseScreen.jsx";
import StorePurchaseScreen from "./screens/purchase/StorePurchaseScreen.jsx";
import StoreRequisitionScreen from "./screens/purchase/StoreRequisitionScreen.jsx";
import AccountsList from "./screens/finance/accounts/ACcountslist.jsx";
import GLList from "./screens/finance/gl/GLList.jsx";
import CreateGL from "./screens/finance/gl/CreateGL.jsx";
import StockTakeScreen from "./screens/store/StockTakeScreen.jsx";
import PayrollPreparationScreen from "./screens/administration/PayrollPreparationScreen.jsx";
import PayrollActualScreen from "./screens/administration/PayrollActualScreen.jsx";
import CreateInstition from "./screens/administration/insititutions/CreateInstition.jsx";
import Institutionlist from "./screens/administration/insititutions/Institutionlist.jsx";
import SupplierList from "./screens/administration/suppliers/SupplierList.jsx";
import CreateSupplier from "./screens/administration/suppliers/CreateSupplier.jsx";
import CreateStaff from "./screens/administration/staff/CreateStaff.jsx";
import StaffList from "./screens/administration/staff/StaffList.jsx";
import ActualList from "./screens/administration/payroll/actual/ActualList.jsx";
import CreateActual from "./screens/administration/payroll/actual/CreateActual.jsx";
import PreparationList from "./screens/administration/payroll/preparation/PreparationList.jsx";
import CreatePreparation from "./screens/administration/payroll/preparation/CreatePreparation.jsx";
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
import CreateReturnOrder from "./screens/sales/returnorders/CreateReturnOrder.jsx";
import OrderDispatchList from "./screens/sales/orderdispatch/OrderDispatchListHeader.jsx";
import CreateOrderDispatch from "./screens/sales/orderdispatch/CreateOrderDispatchHeader.jsx";
import OrderInvoiceList from "./screens/sales/orderinvoice/OrderInvoiceList.jsx";
import CreateOrderInvoce from "./screens/sales/orderinvoice/CreateOrderInvoce.jsx";
import CreateOrderPosting from "./screens/sales/orderposting/CreateOrderPosting.jsx";
import OrderPostingList from "./screens/sales/orderposting/OrderPostingList.jsx";
import OrderReceiptList from "./screens/sales/orderreceipt/OrderReceiptList.jsx";
import SalesPeoplelist from "./screens/sales/salespeople/SalesPeoplelist.jsx";
import CreateSalesPeople from "./screens/sales/salespeople/CreateSalesPeople.jsx";
import RequisitionList from "./screens/purchase/requisition/RequisitionList.jsx";
import CreatePurchase from "./screens/purchase/purchase/CreatePurchase.jsx";
import PurchaseList from "./screens/purchase/purchase/PurchaseList.jsx";
import StoreRegisterScreen from "./screens/store/storeRegisterScreen.jsx";
import StoreRegisterList from "./screens/store/storeregister/StoreRegisterList.jsx";
import CreateStoreRegister from "./screens/store/storeregister/CreateStoreRegister.jsx";
import AllPostedStorePurchases from "./screens/purchase/purchase/AllPostedStorePurchases.jsx";
import AllStorePurchasesInTransit from "./screens/purchase/purchase/AllStorePurchasesInTransit.jsx";
import CreateBankAccount from "./screens/finance/bankaccounts/CreateBankAccount.jsx";
import CreatePackhousePerson from "./screens/production/packhousepeople/CreatePackhousePerson.jsx";
import PackhosePeopleList from "./screens/production/packhousepeople/PackhosePeopleList.jsx";
import Allpostedrequisitions from "./screens/purchase/requisition/AllPostedRequisitions.jsx";
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
import { PackhouseEntriesList } from "./screens/production/packhouseentries/PackhouseEntriesList.jsx";

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
          <Route index element={<AdministrationDashboardScreen />} />
          <Route path="users" element={<UsersScreen />}>
            <Route index element={<UserList />} />
            <Route path="createuser" element={<CreateUser />} />
            <Route path="allusers" element={<UserList />} />
          </Route>
          <Route path="institutions" element={<InstitutionsScreen />}>
            <Route index element={<Institutionlist />} />
            <Route path="createinstitution" element={<CreateInstition />} />
            <Route path="allinstitution" element={<Institutionlist />} />
          </Route>
          <Route path="suppliers" element={<SuppliersScreen />}>
            <Route index element={<SupplierList />} />
            <Route path="createsupplier" element={<CreateSupplier />} />
            <Route path="allsuppliers" element={<SupplierList />} />
          </Route>
          <Route path="staff" element={<StaffScreen />}>
            <Route index element={<StaffList />} />
            <Route path="createstaff" element={<CreateStaff />} />
            <Route path="allstaff" element={<StaffList />} />
          </Route>
        </Route>
        {/* payroll */}
        <Route></Route>

        {/* production routes */}
        <Route path="production" element={<ProductionScreen />}>
          <Route index element={<ProductionDashboardScreen />} />
          {/* production header routes */}
          <Route path="productionheaders" element={<ProductionHeaderScreen />}>
            <Route index element={<ProductionHeaderList />} />
            <Route
              path="createproductionheader"
              element={<CreateProductionHeader />}
            />
            <Route
              path="allproductionheaders"
              element={<ProductionHeaderList />}
            />
            <Route
              path="allproductionheaderlistintransit"
              element={<AllProductionHeaderListInTransit />}
            />
            <Route
              path="allpostedtransiactionheaderlist"
              element={<AllPostedProductionHeaderList />}
            />
          </Route>
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

          {/* pack house people */}
          <Route path="packhousepeople" element={<PackHouseScreen />}>
            <Route index element={<PackhosePeopleList />} />
            <Route path="createpackhouse" element={<CreatePackhousePerson />} />
            <Route path="allpackhouse" element={<PackhosePeopleList />} />
          </Route>
        </Route>
        {/* store routes */}
        <Route path="store" element={<StoreScreen />}>
          {/* <Route index element={<StoreDashboard />}/> */}
          <Route path="storeitemregister" element={<StoreItemRegister />}>
            <Route index element={<ItemListList />} />
            <Route path="registeritem" element={<CreateItemList />} />
            <Route path="allregistereditems" element={<ItemListList />} />
          </Route>
          <Route path="stocktake" element={<StockTakeScreen />}>
            <Route imdex element={<StocktakeList />} />
            <Route path="allstocktakes" element={<StocktakeList />} />
            <Route path="createstocktake" element={<CreateStockTake />} />
            <Route
              path="allstocktakeinprogress"
              element={<StockTakeInProgress />}
            />
            <Route path="allpostedstocktakes" element={<PostedStockTake />} />
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
            <Route path="allstoreitems" element={<StoreItemslist />} />
          </Route>
          <Route path="storeregister" element={<StoreRegisterScreen />}>
            <Route index element={<StoreRegisterList />} />
            <Route
              path="createstoreregister"
              element={<CreateStoreRegister />}
            />
            <Route path="allstoreregister" element={<StoreRegisterList />} />
          </Route>
        </Route>
        {/* purchase routes */}
        <Route path="purchase" element={<PurchaseScreen />}>
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
            <Route index element={<RequisitionList />} />
            <Route path="createrequisition" element={<CreateRequisition />} />
            <Route
              path="allinprogressrequisitions"
              element={<StockTakeInProgress />}
            />

            <Route
              path="allpostedrequisitions"
              element={<Allpostedrequisitions />}
            />
            <Route path="allstorerequisitions" element={<RequisitionList />} />
          </Route>
        </Route>

        {/* sales routes */}
        <Route path="sales" element={<SalesScreen />}>
          {/* <Route index element={<SalesDashboard />}></Route> */}
          <Route path="orders" element={<OrdersScreen />}>
            <Route index element={<Orderlist />} />
            <Route path="CreateOrder" element={<CreateOrder />} />
            <Route path="allorders" element={<Orderlist />} />
          </Route>
          <Route path="returnorder" element={<ReturnOrdersScreen />}>
            <Route index element={<Orderlist />} />
            <Route path="allreturnorders" element={<ReturnOrderlist />} />
            <Route path="createreturnorder" element={<CreateReturnOrder />} />
            <Route path="allreturnorders" element={<ReturnOrderlist />} />
          </Route>
          <Route path="orderdispatch" element={<OrdersDispatchScreen />}>
            <Route index element={<OrderDispatchList />} />
            <Route
              path="undispatchedorders"
              element={<CreateOrderDispatch />}
            />
            <Route path="dispatchedorders" element={<OrderDispatchList />} />
          </Route>
          <Route path="orderinvoice" element={<OrderInvoiceScreen />}>
            <Route index element={<OrderInvoiceList />} />
            <Route path="createinvoice" element={<CreateOrderInvoce />} />
            <Route path="allorderinvoices" element={<OrderInvoiceList />} />
          </Route>
          <Route path="orderposting" element={<OrderPostingScreen />}>
            <Route index element={<OrderPostingList />} />
            <Route path="allunpostedorders" element={<CreateOrderPosting />} />
            <Route path="allpostedorders" element={<OrderPostingList />} />
          </Route>
          <Route path="orderreceipt" element={<OrderReceiptScreen />}>
            <Route index element={<OrderReceiptList />} />
            <Route path="Allreceipts" element={<OrderReceiptList />} />
          </Route>
          <Route path="salespeople" element={<SalesPeopleScreen />}>
            <Route index element={<OrderPostingList />} />
            <Route path="createsalesperson" element={<CreateSalesPeople />} />
            <Route path="allsalespeople" element={<SalesPeoplelist />} />
          </Route>
        </Route>

        {/* fleet routes */}
        <Route path="fleet" element={<FleetScreen />}>
          {/* <Route index element={<FleetDashboard />}/> */}
          {/* <Route path='fleetrequest' element={<FleetRequest/>}/>
          <Route path='fleetregister' element={<FleetRegister/>}/>
          <Route path='fleetmaintenance' element={<FleetMaintenance/>}/> */}
        </Route>
        {/* payroll */}
        <Route path="payroll" element={<PayrollScreen />}></Route>
        {/* payment */}
        <Route path="payment" element={<PaymentScreen />}></Route>
        {/* finance routes */}
        <Route path="finance" element={<FinanceScreen />}>
          <Route path="accounts" element={<AccountsScreen />}>
            <Route index element={<AccountsList />} />
            <Route path="allaccounts" element={<AccountsList />} />
            <Route path="createaccount" element={<CreateAccount />} />
            <Route path="updateaccount" element={<UpdateAccount />} />
            <Route path="viewaccount" element={<ViewAccounts />} />
          </Route>
          <Route path="gl" element={<GeneralledgerScreen />}>
            <Route index element={<GLList />} />
            <Route path="allgl" element={<GLList />} />
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
          <Route path="bankaccounts" element={<BankAccountsScreem />}>
            <Route index element={<BankAccountsList />} />
            <Route path="createbankaccount" element={<CreateBankAccount />} />
            <Route path="bankaccounts" element={<BankAccountsList />} />
          </Route>
          <Route path="trialbalance" element={<TrialBalanceScreen />}></Route>
          <Route
            path="profitandlossstatement"
            element={<ProfitAndLossAccountScreen />}
          ></Route>
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
