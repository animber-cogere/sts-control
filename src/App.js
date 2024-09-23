import React, {useEffect} from 'react'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from "./aws-exports";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GroupDetails, UserProfile, Layout, OrdersPage, UserManagement,
  UsersPanel, GroupsPanel, DevicesPanel, DeviceDetails, UserGroupPanel, UserDevicePanel  } from "./ui-components";
import "./App.css";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout signOut={ signOut } user={ user } />}>
          <Route index element={<Navigate to="user-management" />} />          
          <Route path="user-management" element={<UserManagement/>} >
            <Route index element={<Navigate to="users" />} />
            <Route path="users" element={<UsersPanel/>} />
            <Route path="groups" element={<GroupsPanel/>} />
            <Route path="devices" element={<DevicesPanel/>} />
          </Route>
          <Route path="user-management/user-details/:userName" element={<UserProfile />} >
            <Route path="groups" element={<UserGroupPanel />} />
            <Route path="devices" element={<UserDevicePanel />} />
          </Route>
          <Route path="user-management/group-details/:groupName" element={<GroupDetails />} />
          <Route path="user-management/device-details/:devId" element={<DeviceDetails />} />
          <Route path="order-tickets" element={<OrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//export default App;
export default withAuthenticator(App);