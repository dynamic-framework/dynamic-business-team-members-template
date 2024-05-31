/* eslint-disable max-len */
import {
  DButton,
  DCard,
  DInput,
  DInputSelect,
  DInputSwitch,
} from '@dynamic-framework/ui-react';
import { useFormik } from 'formik';
import { t } from 'i18next';
import {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import * as yup from 'yup';

import useWidgetUtils from '../hooks/useWidgetUtils';
import {
  UserCountry,
  UserRequest,
  UserIdentificationType,
  ApiCountryPhone,
} from '../services';
import useIdentificationsCallback from '../services/hooks/useIdentificationsCallback';
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';
import {
  getCountries,
  getCountriesPhone,
  getRequestUser,
  getSelectedRole,
} from '../store/selectors';
import {
  setCreationStep,
  setIdentifications,
  setRequestUser,
} from '../store/slice';

const newUserSchema = yup.object().shape({
  username: yup.string().matches(
    /^[a-z0-9]{4,}(?:_[a-z0-9]*)*$/,
    t('userForm.validationUsername'),
  ).required(t('userForm.completeField')),
  email: yup.string().required(t('userForm.completeField')),
  names: yup.object({
    firstName: yup.string().required(t('userForm.completeField')),
    primaryLastName: yup.string().required(t('userForm.completeField')),
    secondaryLastName: yup.string().optional(),
  }).required(),
  identification: yup.object({
    type: yup.string().required(t('userForm.selectValidOption')),
    number: yup.string().required(t('userForm.completeField')),
    country: yup.string().required(t('userForm.selectValidOption')),
  }).required(),
  phone: yup.object({
    number: yup.string().required(t('userForm.completeField')),
    country: yup.string().required(),
  }).required(),
});

export default function TeamMemberInformation() {
  const { unicodeToEmoji } = useWidgetUtils();
  const dispatch = useAppDispatch();
  const role = useAppSelector(getSelectedRole)!;
  const countries = useAppSelector(getCountries);
  const requestUser = useAppSelector(getRequestUser);
  const countriesPhone = useAppSelector(getCountriesPhone);

  const {
    loading,
    getIdentificationsCallback,
    identifications,
  } = useIdentificationsCallback();

  const onSubmitHandler = useCallback(
    (values: UserRequest) => {
      const requestNewUser = {
        username: values.username,
        email: values.email,
        identification: {
          type: values.identification.type ?? identifications[0].type,
          country: values.identification.country,
          number: values.identification.number,
        },
        names: {
          firstName: values.names.firstName,
          primaryLastName: values.names.primaryLastName,
          secondaryLastName: values.names.secondaryLastName,
        },
        phone: {
          country: values.phone.country,
          number: values.phone.number,
        },
        role: role.role,
      } as UserRequest;

      dispatch(setRequestUser(requestNewUser));
      dispatch(setCreationStep('overview'));
    },
    [dispatch, identifications, role.role],
  );

  const {
    errors,
    handleSubmit,
    values,
    setFieldValue,
    touched,
  } = useFormik(
    {
      enableReinitialize: true,
      initialValues: requestUser,
      validationSchema: newUserSchema,
      onSubmit: (formValues) => onSubmitHandler(formValues),
    },
  );

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

  useEffect(() => {
    if (requestUser.phone.country) {
      const find = countriesPhone.find(
        ({ country_code }) => country_code === requestUser.phone.country,
      );

      if (find) {
        setFieldValue('phone.country', find.country_code);
      }
    }
    setFieldValue('phone.country', countriesPhone[0].country_code);
  }, [countriesPhone, requestUser.phone.country, setFieldValue]);

  return (
    <div className="row">
      <div className="col-12 col-lg-8 offset-lg-2">
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-4">
            <DCard className="border-0">
              <DCard.Body className="p-5">
                <div className="d-flex flex-column gap-4">
                  <h2 className="fw-bold h5">
                    {t('userForm.titleCreate')}
                  </h2>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <DInput
                        id="name"
                        label={t('userForm.name')}
                        placeholder={t('userForm.placeholder')}
                        name="name"
                        value={values.names.firstName}
                        onChange={(value) => setFieldValue('names.firstName', value)}
                        invalid={touched.names?.firstName && !!errors.names?.firstName}
                        hint={touched.names?.firstName ? errors.names?.firstName : undefined}
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
                        invalid={(touched.names?.primaryLastName && !!errors.names?.primaryLastName)}
                        hint={touched.names?.primaryLastName ? errors.names?.primaryLastName : undefined}
                      />
                    </div>
                  </div>
                  <hr className="w-100 m-0" />
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <DInput
                        id="username"
                        label={t('userForm.username')}
                        placeholder={t('userForm.usernamePlaceholder')}
                        name="username"
                        value={values.username}
                        onChange={(value) => setFieldValue('username', value)}
                        invalid={touched.username && !!errors.username}
                        hint={touched.username ? errors.username : 'Username must be in lower case'}
                      />
                    </div>
                  </div>
                  <hr className="w-100 m-0" />
                  <div className="row row-gap-4">
                    <div className="col-12 col-lg-6">
                      <DInputSelect<UserCountry>
                        id="idCountry"
                        label={t('userForm.idCountry')}
                        labelExtractor={(item) => item.name}
                        valueExtractor={(item) => item.country}
                        options={countries}
                        value={values.identification.country}
                        hint={touched.identification?.country ? errors.identification?.country : undefined}
                        onChange={(country) => {
                          setFieldValue('identification.type', '');
                          setFieldValue('identification.country', country?.country);
                          dispatch(setIdentifications());
                          if (country.country) {
                            getIdentificationsCallback(country.country);
                          }
                        }}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <DInputSelect<UserIdentificationType>
                        loading={loading}
                        disabled={identifications.length === 1}
                        id="typeId"
                        label={t('userForm.idType')}
                        labelExtractor={(item) => item.description}
                        valueExtractor={(item) => item.type}
                        hint={touched.identification?.type ? errors.identification?.type : undefined}
                        options={identifications}
                        value={values.identification.type}
                        onChange={(identification) => setFieldValue('identification.type', identification.type)}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <DInput
                        id="idNumber"
                        label={t('userForm.idNumber')}
                        placeholder={t('userForm.placeholder')}
                        name="identificationNumber"
                        value={values.identification.number}
                        onChange={(value) => setFieldValue('identification.number', value)}
                        invalid={(touched.identification?.number && !!errors.identification?.number)}
                        hint={touched.identification?.number ? errors.identification?.number : undefined}
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
                        invalid={(touched.email && !!errors.email)}
                        hint={touched.email ? errors.email : undefined}
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="d-flex flex-column flex-lg-row gap-1">
                        <div className="d-block">
                          <DInputSelect<ApiCountryPhone>
                            id="mobileCountryCode"
                            label={t('Phone number')}
                            labelExtractor={(item) => `${item.country_name} ${unicodeToEmoji(item.country_flag)}`}
                            valueExtractor={(item) => item.country_code}
                            options={countriesPhone}
                            value={values.phone.country}
                            onChange={(c) => {
                              setFieldValue('phone.country', c.country_code);
                            }}
                            className="p-0"
                          />
                        </div>
                        <div className="flex-grow-1 pt-1 pt-lg-6">
                          <DInput
                            id="mobileCountryNumber"
                            placeholder={t('userForm.placeholder')}
                            type="number"
                            inputMode="tel"
                            name="phoneNumber"
                            inputStart={(
                              <span style={{
                                minWidth: '4ch',
                              }}
                              >
                                {selectedCountryPhone}
                              </span>
                            )}
                            value={values.phone.number}
                            onChange={(value) => setFieldValue('phone.number', value)}
                            invalid={touched.phone?.number && !!errors.phone?.number}
                            hint={touched.phone?.number ? errors.phone?.number : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DInputSwitch
                    id="assignToken"
                    label={t('actions.assignToken')}
                    disabled
                  />
                </div>
              </DCard.Body>
            </DCard>
            <div className="d-flex flex-column gap-3">
              <DButton
                className="mx-auto"
                text={t('actions.continue')}
                type="submit"
                pill
              />
              <DButton
                className="mx-auto"
                text={t('actions.cancel')}
                pill
                variant="link"
                theme="secondary"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
