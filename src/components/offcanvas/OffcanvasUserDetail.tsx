import {
  DButton,
  DChip,
  DOffcanvas,
  PortalProps,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AvailablePortal } from '../../config/widgetConfig';
import useGetCountry from '../../hooks/useGetCountry';
import useWidgetUtils from '../../hooks/useWidgetUtils';
import {
  USER_STATUS_COLOR,
  UserStatusColor,
} from '../../services';
import useRolesCallback from '../../services/hooks/useRolesCallback';
import useUserDetailEffect from '../../services/hooks/useUserDetailEffect';
import usePermissions from '../../utils/usePermission';
import UserDetailLoader from '../loaders/UserDetailLoader';
import UserDetailField from '../UserDetailField';

export default function OffcanvasUserDetail(
  {
    payload: { username },
  }: PortalProps<AvailablePortal['offcanvasUserDetail']>,
) {
  const { hasPermission } = usePermissions();
  const { t } = useTranslation();
  const { formatDate } = useWidgetUtils();
  const { openPortal, closePortal } = useDPortalContext();

  const { getRolesCallback, loading: rolesLoading } = useRolesCallback();
  const { loading: userDetailLoading, user } = useUserDetailEffect(username);
  const { getCountryById } = useGetCountry();

  const editUserHandler = useCallback(() => {
    getRolesCallback(() => {
      closePortal();
      openPortal('offcanvasUserEdit', { user });
    });
  }, [closePortal, getRolesCallback, openPortal, user]);

  const countryName = useMemo(() => {
    if (user && user.identification.country) {
      return getCountryById(user.identification.country);
    }
    return 'Invalid country code';
  }, [getCountryById, user]);

  if (userDetailLoading || !user) {
    return <UserDetailLoader />;
  }

  return (
    <DOffcanvas
      name="offcanvasUserDetail"
      openFrom="end"
    >
      <DOffcanvas.Header
        showCloseButton
        onClose={closePortal}
      >
        <div className="d-flex flex-column gap-1">
          <h2 className="h5 fw-bold">
            {`${user.names?.firstName} ${user.names?.primaryLastName}`}
          </h2>
        </div>
      </DOffcanvas.Header>
      <DOffcanvas.Body>
        <div className="d-flex flex-column gap-3">
          <hr className="w-100 m-0 border-dashed" />
          <h6>
            Username:
            {' '}
            {user.username}
          </h6>
          <hr className="w-100 m-0 border-dashed" />
          <div className="d-flex flex-column gap-3">
            <UserDetailField
              i18nKey="details.role"
              value={user.role.name}
            />
            <p className="d-flex align-items-center gap-2">
              <strong>{t('details.status')}</strong>
              <DChip
                text={user.status?.label}
                theme={USER_STATUS_COLOR[user.status?.status as UserStatusColor]}
              />
            </p>
          </div>
          <hr className="w-100 m-0 border-dashed" />
          <div className="d-flex flex-column gap-3">
            <h6 className="fw-bold">{t('details.idInformation')}</h6>
            <UserDetailField
              i18nKey="details.idCountry"
              value={countryName}
            />
            <UserDetailField
              i18nKey="details.idType"
              value={user.identification.type}
            />
            <UserDetailField
              i18nKey="details.idNumber"
              value={user.identification.number}
            />
          </div>
          <hr className="w-100 m-0 border-dashed" />
          <div className="d-flex flex-column gap-3">
            <h6 className="fw-bold">{t('details.contactInformation')}</h6>
            <UserDetailField
              i18nKey="details.email"
              value={user.email}
            />
            <UserDetailField
              i18nKey="details.mobile"
              value={`${user.phone?.country} ${user.phone?.number}`}
            />
          </div>
          <hr className="w-100 m-0 border-dashed" />
          <div className="d-flex flex-column gap-3">
            <h6 className="fw-bold">{t('details.activity')}</h6>
            <UserDetailField
              i18nKey="details.lastLogin"
              value={formatDate(user.lastSession, true)}
            />
            <UserDetailField
              i18nKey="details.creationDate"
              value={formatDate(user.creationDate, true)}
            />
          </div>
        </div>
      </DOffcanvas.Body>
      <DOffcanvas.Footer className="d-flex flex-column align-items-center gap-2">
        {(
          user.status?.state
            && ['LIVE', 'NEW'].includes(user.status.state)
            && hasPermission('updateMember')
        ) && (
          <DButton
            text={t('actions.edit')}
            onClick={editUserHandler}
            loading={rolesLoading}
            pill
          />
        )}
        <DButton
          text={t('actions.cancel')}
          variant="link"
          theme="secondary"
          onClick={closePortal}
          pill
        />
      </DOffcanvas.Footer>
    </DOffcanvas>
  );
}
