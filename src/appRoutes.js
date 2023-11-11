import React from 'react'
import {BrowserRouter,Routes,Route,Router } from "react-router-dom";
import Home from './pages/home';
import LoginAdmin from './admin/general/loginAdmin';
import ProtectedRoute from './admin/general/protectedRoute'
import CompanyUserList from './pages/user/companies/companyUserList'
import UserAddCompanyForm from './pages/user/companies/userAddCompanyForm'
import LoginUser from './pages/loginUser'
import HomeAdmin from './admin/general/homeAdmin';
import HeaderClient from './components/general/headerClient'
import UsersAdminList from './admin/users/usersAdminList';
import DevicesAdminList from './admin/devices/devicesAdminList';
import CompaniesAdminList from "./admin/companies/companiesAdminList"
import SignAp from './admin/general/signUp';
import AddCompanyForm from './admin/companies/addCompanyForm';
import AddDeviceForm from './admin/devices/addDeviceForm';
import EditDeviceForm from './admin/devices/editDeviceForm';
import CompanieEditForm from './admin/companies/CompanieEditForm';
import ImageCompany from './admin/companies/ImageCompany';
import UsersAddAdmin from './admin/users/usersAddAdmin';
import PasswordResetRequest from './components/general/PasswordResetRequest';
import PasswordResetForm from './components/general/PasswordResetForm';
import UserInfo from './pages/user/UserInfo ';
import DevicesUserList from './pages/user/devices/devicesUserLIst';
import UserAddDeviceForm from './pages/user/devices/userAddDeviceForm';
import UserProfile from './pages/userProfile';

export default function AppRoutes() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path ="/" element ={< Home/>}/>
       <Route path="/login" element={<LoginUser/>} />
       <Route path="/signUp" element={<SignAp/>} />
       <Route path="/user-info" element={<UserInfo/>} />
       <Route path="/image/:imgURL" element={<ImageCompany/>} />

       <Route path="/password-reset-request" element={<PasswordResetRequest />} />
        <Route path="/password-reset/:token" element={<PasswordResetForm />} />

        {/* Protected user routes */}
        
        {/* <Route path="/login" element={<ProtectedRoute allowedRole="user">
              <LoginUser /> </ProtectedRoute>
          }
        /> */}
        <Route path="/user-profile" element={<ProtectedRoute allowedRole="user">
              <UserProfile /> </ProtectedRoute>
          }
        />
         <Route path="/user-info" element={<ProtectedRoute allowedRole="user">
              <UserInfo /> </ProtectedRoute>
          }
        />
           <Route path="/user-company" element={<ProtectedRoute allowedRole="user">
              <CompanyUserList /> </ProtectedRoute>
          }
        />
            <Route path="/user-company" element={<ProtectedRoute allowedRole="user">
              <CompanyUserList /> </ProtectedRoute>
          }
        />
            <Route path="/devices" element={<ProtectedRoute allowedRole="user">
              <DevicesUserList /> </ProtectedRoute>
          }
        />
            <Route path="/user-AddDeviceForm" element={<ProtectedRoute allowedRole="user">
              <UserAddDeviceForm /> </ProtectedRoute>
          }
        />
                <Route path="/user-AddDeviceForm" element={<ProtectedRoute allowedRole="user">
              <UserAddDeviceForm /> </ProtectedRoute>
          }
        />
                <Route path="/user-Add-company" element={<ProtectedRoute allowedRole="user">
              <UserAddCompanyForm /> </ProtectedRoute>
          }
        />
                <Route path="/user-AddDeviceForm" element={<ProtectedRoute allowedRole="user">
              <UserAddDeviceForm /> </ProtectedRoute>
          }
        />

          {/* // Protected admin routes */}
          <Route
              path="/admin/home" element={ <ProtectedRoute allowedRole="admin">
                 <HomeAdmin /></ProtectedRoute>
              }
            />
            <Route
              path="/users/usersList" element={ <ProtectedRoute allowedRole="admin">
                 <UsersAdminList /></ProtectedRoute>
              }
            />
              <Route
              path="/changeRole/:id/:role" element={ <ProtectedRoute allowedRole="admin">
                 <UsersAddAdmin /></ProtectedRoute>
              }
            />
             <Route
              path="/admin-companies" element={ <ProtectedRoute allowedRole="admin">
                 <CompaniesAdminList /></ProtectedRoute>
              }
            />
                         <Route
              path="/admin-addCompany" element={ <ProtectedRoute allowedRole="admin">
                 <AddCompanyForm /></ProtectedRoute>
              }
            />
            <Route
              path="/admin-editCompany/:id" element={ <ProtectedRoute allowedRole="admin">
                 <CompanieEditForm /></ProtectedRoute>
              }
            />
                        <Route
              path="/admin-devices" element={ <ProtectedRoute allowedRole="admin">
                 <DevicesAdminList/></ProtectedRoute>
              }
            />
                                    <Route
              path="/admin-addDevice" element={ <ProtectedRoute allowedRole="admin">
                 <AddDeviceForm/></ProtectedRoute>
              }
            />
                                    <Route
              path="/admin-editDevice/:id" element={ <ProtectedRoute allowedRole="admin">
                 <EditDeviceForm/></ProtectedRoute>
              }
            />



        {/* <Route path="/admin/login" element={<LoginAdmin/>} /> */}
        {/* <Route path = "/changeRole/:id/:role" element = {<UsersAddAdmin/>}> </Route> */}
       
        {/* <Route path="/*" element={<h2>Page 404, not found</h2>} /> */}
      </Routes>
 
      {/* <Routes>
      <Route path="/admin/:dir/*" element={<AuthAdminComp/>} />

      </Routes> */}

    </BrowserRouter>
  )
}


        {/* <Route path ="/admin/devices" element ={<DevicesAdminList/>}></Route>
        <Route path ="/admin/devices/:id" element ={<EditDeviceForm/>}></Route>
        <Route path='/admin/companies' element ={<CompaniesAdminList/>}></Route>
        <Route path='/admin/companies/:id' element ={<CompanieEditForm/>}></Route>
        <Route path='admin/addCompany' element={<AddCompanyForm/>}></Route>
        <Route path='admin/addDevice' element={<AddDeviceForm/>}></Route>
        <Route path="/image/:imgURL" element={<ImageCompany />} /> */}

