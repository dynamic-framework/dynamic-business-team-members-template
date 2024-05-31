import { DButton, DCard, useDPortalContext } from '@dynamic-framework/ui-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { AvailablePortal } from '../config/widgetConfig';
import useGetCountry from '../hooks/useGetCountry';
import useGetCountryPhone from '../hooks/useGetCountryPhone';
import useIdentificationsEffect from '../services/hooks/useIdentificationsEffect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getRequestUser, getSelectedRole } from '../store/selectors';
import { setCreationStep } from '../store/slice';

import UserDetailField from './UserDetailField';

export default function Overview() {
  const dispatch = useAppDispatch();
  const requestUser = useAppSelector(getRequestUser);
  const selectedRole = useAppSelector(getSelectedRole)!;
  const { t } = useTranslation();
  const { getCountryById } = useGetCountry();
  const { getCountryPhoneByCode } = useGetCountryPhone();
  const { openPortal } = useDPortalContext<AvailablePortal>();
  const {
    loading,
    identifications,
  } = useIdentificationsEffect(requestUser.identification.country!);

  const nextClickHandler = useCallback(() => {
    openPortal('offcanvasValidateOtp', undefined);
  }, [openPortal]);

  const nameToDisplay = useMemo(
    () => `
    ${requestUser.names.firstName} 
    ${requestUser.names.primaryLastName} 
    ${requestUser.names.secondaryLastName}
    `,
    [requestUser],
  );

  const identificationToDisplay = useMemo(
    () => {
      const find = identifications?.find(({ type }) => type === requestUser.identification.type);
      if (find) {
        return find.description;
      }

      return requestUser.identification.type;
    },
    [identifications, requestUser.identification.type],
  );

  const phoneToDisplay = useMemo(
    () => `
    ${requestUser.phone.country}
    (${getCountryPhoneByCode(requestUser.phone.country)})
    ${requestUser.phone.number}
    `,
    [getCountryPhoneByCode, requestUser.phone.country, requestUser.phone.number],
  );

  return (
    <div className="row">
      <div className="col-12 col-lg-8 offset-lg-2">
        <div className="d-flex flex-column gap-4">
          <DCard className="border-0">
            <DCard.Body className="p-5">
              <div className="d-flex flex-column gap-4">
                <h2 className="fw-bold h5">
                  {t('overview.title')}
                </h2>
                <div className="d-flex align-items-center gap-3">
                  <UserDetailField
                    className="flex-grow-1"
                    i18nKey="details.role"
                    value={selectedRole.name}
                  />
                  <DButton
                    iconStart="pencil"
                    theme="secondary"
                    variant="link"
                    size="sm"
                    pill
                    onClick={() => dispatch(setCreationStep('role'))}
                  />
                </div>
                <hr className="w-100 m-0" />
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                      style={{ width: 100, height: 100, borderWidth: '1rem' }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-start gap-3">
                    <div className="d-flex flex-column gap-3 flex-grow-1">
                      <UserDetailField
                        i18nKey="details.name"
                        value={nameToDisplay}
                      />
                      <UserDetailField
                        i18nKey="details.idCountry"
                        value={getCountryById(requestUser.identification.country!)}
                      />
                      <UserDetailField
                        i18nKey="details.idType"
                        value={identificationToDisplay}
                      />
                      <UserDetailField
                        i18nKey="details.idNumber"
                        value={requestUser.identification.number}
                      />
                      <UserDetailField
                        i18nKey="details.email"
                        value={requestUser.email}
                      />
                      <UserDetailField
                        i18nKey="details.mobile"
                        value={phoneToDisplay}
                      />
                    </div>
                    <DButton
                      iconStart="pencil"
                      theme="secondary"
                      variant="link"
                      size="sm"
                      pill
                      onClick={() => dispatch(setCreationStep('add'))}
                    />
                  </div>
                )}
              </div>
            </DCard.Body>
          </DCard>
          <DButton
            className="mx-auto"
            text={t('actions.confirm')}
            pill
            onClick={nextClickHandler}
          />
          <DButton
            className="mx-auto"
            text={t('actions.cancel')}
            variant="link"
            theme="secondary"
            pill
            onClick={() => { }}
          />
        </div>
      </div>
    </div>
  );
}
