import {
  DButton,
  DInput,
  DInputSelect,
  DOffcanvas,
  PortalProps,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import {
  ApiCountryPhone,
  UserRole,
  UserUpdate,
} from '@modyo-dynamic/modyo-service-business';
import { useFormik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { AvailablePortal } from '../../config/widgetConfig';
import useWidgetUtils from '../../hooks/useWidgetUtils';
import useUserUpdateCallback from '../../services/hooks/useUserUpdateCallback';
import { useAppSelector } from '../../store/hooks';
import { getCountriesPhone, getRoles } from '../../store/selectors';
import usePermissions from '../../utils/usePermission';

const editUserSchema = yup.object().shape({
  email: yup.string().required(),
  names: yup.object({
    firstName: yup.string().required(),
    primaryLastName: yup.string().required(),
    secondaryLastName: yup.string().optional(),
  }).required(),
  phone: yup.object({
    number: yup.number().required(),
    // country: yup.string().required(),
  }).required(),
});

export default function OffcanvasUserEdit(
  {
    payload: { user },
  }: PortalProps<AvailablePortal['offcanvasUserEdit']>,
) {
  const { closePortal } = useDPortalContext();
  const { hasPermission } = usePermissions();
  const { t } = useTranslation();
  const roles = useAppSelector(getRoles)!;
  const [newRole, setNewRole] = useState(user.role ?? roles[0]);
  const { loading, updateUserCallback } = useUserUpdateCallback();
  const countriesPhone = useAppSelector(getCountriesPhone);
  const { unicodeToEmoji } = useWidgetUtils();

  const updateUserHandler = useCallback((values: UserUpdate) => {
    const updateUser = {
      email: values.email,
      names: values.names,
      phone: {
        country: values.phone.country,
        number: values.phone.number,
      },
    } as UserUpdate;
    updateUserCallback(user, updateUser, newRole);
  }, [newRole, updateUserCallback, user]);

  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: (user as UserUpdate),
    validationSchema: editUserSchema,
    onSubmit: updateUserHandler,
  });

  const selectedCountryPhone = useMemo(
    () => {
      const find = countriesPhone.find(({ country_code }) => country_code === values.phone.country);
      if (find) {
        return find.dialing_code;
      }

      return countriesPhone[0].dialing_code;
    },
    [countriesPhone, values.phone.country],
  );

  return (
    <DOffcanvas
      name="offcanvasUserEdit"
      openFrom="end"
    >
      <DOffcanvas.Header
        showCloseButton
        onClose={closePortal}
      >
        <div className="d-flex flex-column gap-1">
          <h2 className="h5 fw-bold">
            {t('userForm.titleEdit')}
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
          {(
            user.status
              && user.status.state !== 'NEW'
              && hasPermission('updateRoleMember')
          ) && (
            <>
              <DInputSelect<UserRole>
                id="roleSelect"
                label={t('userForm.role')}
                labelExtractor={(item) => item.name}
                valueExtractor={(item) => item.role}
                options={roles}
                value={newRole.role}
                onChange={(rol) => setNewRole(rol)}
              />
              <hr className="w-100 m-0" />
            </>
          )}
          <form id="editForm" onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-4">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <DInput
                      id="name"
                      label={t('userForm.name')}
                      placeholder={t('userForm.placeholder')}
                      name="name"
                      value={values.names.firstName}
                      onChange={(value) => setFieldValue('names.firstName', value)}
                      invalid={(
                            !!errors.names?.firstName
                            && touched.names?.firstName
                          )}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <DInput
                      id="lastName"
                      label={t('userForm.primaryLastName')}
                      placeholder={t('userForm.placeholder')}
                      name="primaryLastName"
                      value={values.names.primaryLastName}
                      onChange={(value) => setFieldValue('names.primaryLastName', value)}
                      invalid={(
                            !!errors.names?.primaryLastName
                            && touched.names?.primaryLastName
                          )}
                    />
                  </div>
                </div>
                <hr className="w-100 m-0" />
                <div className="row row-gap-4">
                  <div className="col-12 col-lg-6">
                    <DInput
                      id="email"
                      label={t('userForm.email')}
                      placeholder={t('userForm.placeholder')}
                      type="email"
                      inputMode="email"
                      name="email"
                      value={values.email}
                      onChange={(value) => setFieldValue('email', value)}
                      invalid={(
                            !!errors.email
                            && touched.email
                          )}
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="d-flex gap-1">
                      <div className="d-block">
                        <DInputSelect<ApiCountryPhone>
                          id="mobileCountryCode"
                          label={t('Phone number')}
                          labelExtractor={(item) => `${unicodeToEmoji(item.country_flag)} ${item.country_name}`}
                          valueExtractor={(item) => item.country_code}
                          options={countriesPhone}
                          value={values.phone.country}
                          onChange={(c) => {
                            setFieldValue('phone.country', c.country_code);
                          }}
                          className="p-0"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <DInput
                          id="mobileCountryNumber"
                          label={`(${selectedCountryPhone})`}
                          placeholder={t('userForm.placeholder')}
                          type="number"
                          inputMode="tel"
                          name="phoneNumber"
                          value={values.phone.number}
                          onChange={(value) => setFieldValue('phone.number', value)}
                          invalid={touched.phone?.number && !!errors.phone?.number}
                          hint={touched.phone?.number ? errors.phone?.number : undefined}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </DOffcanvas.Body>
      <DOffcanvas.Footer className="d-flex flex-column align-items-center gap-2">
        <DButton
          text={t('actions.save')}
          type="submit"
          form="editForm"
          loading={loading}
          pill
        />
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
