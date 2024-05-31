import {
  DButton,
  DCard,
  DInputSelect,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { UserRole } from '@modyo-dynamic/modyo-service-business';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AvailablePortal } from '../config/widgetConfig';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getRoles, getSelectedRole } from '../store/selectors';
import { setCreationStep, setSelectedRole } from '../store/slice';

export default function RoleAssignment() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const roleOptions = useAppSelector(getRoles)!;
  const selectedRole = useAppSelector(getSelectedRole);
  const [role, setRole] = useState(selectedRole || roleOptions[0]);
  const { openPortal } = useDPortalContext<AvailablePortal>();

  const nextClickHandler = useCallback(() => {
    dispatch(setSelectedRole(role));
    dispatch(setCreationStep('add'));
  }, [dispatch, role]);

  return (
    <div className="row">
      <div className="col-12 col-lg-8 offset-lg-2">
        <div className="d-flex flex-column gap-4">
          <DCard className="border-0">
            <DCard.Body className="p-5">
              <div className="d-flex flex-column gap-4">
                <h2 className="fw-bold h5">
                  {t('role.title')}
                </h2>
                <p>
                  {t('role.message')}
                </p>
                <DInputSelect<UserRole>
                  id="roleSelect"
                  label={t('role.label')}
                  labelExtractor={(item) => item.name}
                  valueExtractor={(item) => item.role}
                  options={roleOptions}
                  value={role.role}
                  onChange={(rol) => setRole(rol)}
                />
              </div>
              {role && (
                <DButton
                  className="ms-auto mt-1 p-1"
                  text={t('actions.viewPermissions')}
                  variant="link"
                  theme="secondary"
                  size="sm"
                  onClick={() => openPortal('offcanvasRoleDetail', { role: role.role })}
                  disabled
                />
              )}
            </DCard.Body>
          </DCard>
          <DButton
            className="mx-auto"
            text={t('actions.continue')}
            pill
            onClick={nextClickHandler}
          />
        </div>
      </div>
    </div>
  );
}
