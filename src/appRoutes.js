import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/home";
import LoginAdmin from "./admin/general/loginAdmin";
import ProtectedRoute from "./admin/general/protectedRoute";
import CompanyUserList from "./pages/user/companies/companyUserList";
import UserAddCompanyForm from "./pages/user/companies/userAddCompanyForm";
import LoginUser from "./pages/loginUser";
import HomeAdmin from "./admin/general/homeAdmin";
import HeaderClient from "./components/general/headerClient";
import UsersAdminList from "./admin/users/usersAdminList";
import DevicesAdminList from "./admin/devices/devicesAdminList";
import CompaniesAdminList from "./admin/companies/companiesAdminList";
import SignAp from "./admin/general/signUp";
import AddCompanyForm from "./admin/companies/addCompanyForm";
import AddDeviceForm from "./admin/devices/addDeviceForm";
import EditDeviceForm from "./admin/devices/editDeviceForm";
import CompanieEditForm from "./admin/companies/CompanieEditForm";
import ImageCompany from "./admin/companies/ImageCompany";
import UsersAddAdmin from "./admin/users/usersAddAdmin";
import PasswordResetRequest from "./components/general/PasswordResetRequest";
import PasswordResetForm from "./components/general/PasswordResetForm";
import UserInfo from "./pages/user/UserInfo ";
import DevicesUserList from "./pages/user/devices/devicesUserLIst";
import UserAddDeviceForm from "./pages/user/devices/userAddDeviceForm";
import UserProfile from "./pages/userProfile";
import NotFoundPage from "./components/general/notFoundPage";
import AddUserForm from "./admin/users/addUserForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signUp" element={<SignAp />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/image/:imgURL" element={<ImageCompany />} />
        <Route  path="/password-reset-request"  element={<PasswordResetRequest />}/>
        <Route path="/password-reset/:token" element={<PasswordResetForm />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/*" element={ <NotFoundPage/>} />

        {/* Protected user routes */}

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-info"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-company"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <CompanyUserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <DevicesUserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-AddDeviceForm"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserAddDeviceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-AddDeviceForm"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserAddDeviceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-Add-company"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserAddCompanyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-AddDeviceForm"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UserAddDeviceForm />
            </ProtectedRoute>
          }
        />

        {/* // Protected admin routes */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/usersList"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UsersAdminList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/AddUser"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <AddUserForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/changeRole/:id/:role"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <UsersAddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-companies"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <CompaniesAdminList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-addCompany"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <AddCompanyForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-editCompany/:id"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <CompanieEditForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-devices"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <DevicesAdminList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-addDevice"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <AddDeviceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-editDevice/:id"
          element={
            <ProtectedRoute allowedRole={['admin', 'user']}>
              <EditDeviceForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
