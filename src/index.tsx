/* eslint-disable global-require */
import {
  DToastContainer,
  DContextProvider,
} from '@dynamic-framework/ui-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './config/liquidConfig';
import './config/i18nConfig';

import App from './App';
import ModalChangeUserStatus from './components/modals/ModalChangeUserStatus';
import ModalNoRoles from './components/modals/ModalNoRoles';
import OffcanvasRoleDetail from './components/offcanvas/OffcanvasRoleDetail';
import OffcanvasUserDetail from './components/offcanvas/OffcanvasUserDetail';
import OffcanvasUserEdit from './components/offcanvas/OffcanvasUserEdit';
import OffcanvasValidateOtp from './components/offcanvas/OffcanvasValidateOtp';
import { AvailablePortal } from './config/widgetConfig';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

import '@dynamic-framework/ui-react/dist/css/dynamic-ui.css';
import './styles/base.scss';

const root = createRoot(document.getElementById('teamMembers') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <DContextProvider<AvailablePortal>
        portalName="portals"
        availablePortals={{
          modalChangeUserStatus: ModalChangeUserStatus,
          modalNoRoles: ModalNoRoles,
          offcanvasRoleDetail: OffcanvasRoleDetail,
          offcanvasUserDetail: OffcanvasUserDetail,
          offcanvasUserEdit: OffcanvasUserEdit,
          offcanvasValidateOtp: OffcanvasValidateOtp,
        }}
      >
        <App />
      </DContextProvider>
      <DToastContainer
        position="bottom-center"
      />
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
