import {
  DAlert,
  DButton,
  DDatePicker,
  DInputSelect,
  DModal,
  PortalProps,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { ApiUserStatus } from '@modyo-dynamic/modyo-service-business';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { AvailablePortal, FORMAT_DATE } from '../../config/widgetConfig';
import useStatusEffect from '../../services/hooks/useStatusEffect';
import useUserStatusCallback from '../../services/hooks/useUserStatusCallback';

export default function ModalChangeUserStatus(
  {
    payload: { user },
  }: PortalProps<AvailablePortal['modalChangeUserStatus']>,
) {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();

  const handleChange = (value: [Date | null, Date | null]) => {
    const [newStartDate, newEndDate] = value as Array<Date>;
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const [newStatus, setNewStatus] = useState<ApiUserStatus>();

  const { changeStatus, loading } = useUserStatusCallback();
  const {
    loading: loadingStatus,
    statusList,
  } = useStatusEffect(user.status?.status as string);

  const changeStatusHandler = useCallback(() => {
    if (newStatus) {
      changeStatus(user, newStatus);
    }
  }, [changeStatus, user, newStatus]);

  useEffect(() => {
    if (statusList && statusList.length >= 1) {
      setNewStatus(statusList[0]);
    }
  }, [statusList]);

  if (loadingStatus) {
    return (
      <DModal
        name="modalChangeUserStatus"
        className="d-block"
        centered
      >
        <DModal.Body className="py-4 px-5">
          {t('actions.loading')}
        </DModal.Body>
      </DModal>
    );
  }

  return (
    <DModal
      name="modalChangeUserStatus"
      className="d-block"
      centered
    >
      <DModal.Header
        showCloseButton
        onClose={closePortal}
      >
        <h2 className="fw-bold fs-5">
          {t('modal.changeUserStatus.title')}
        </h2>
      </DModal.Header>
      <DModal.Body>
        <div className="d-flex flex-column gap-4 py-4 px-5">
          <DInputSelect<ApiUserStatus>
            id="newStatusSelect"
            label={t('modal.changeUserStatus.label')}
            labelExtractor={(item) => item.action as string}
            valueExtractor={(item) => item.status}
            options={statusList}
            value={newStatus?.status}
            onChange={(e) => setNewStatus(e)}
          />
          <div>
            <DAlert
              type="warning"
              soft
            >
              {newStatus?.description}
            </DAlert>
          </div>
          {newStatus?.temporary && (
            <DDatePicker<never, true>
              minDate={new Date()}
              dateFormat={FORMAT_DATE}
              onChange={handleChange}
              selectsRange
              {...startDate && {
                selected: new Date(startDate),
                startDate: new Date(startDate),
              }}
              {...endDate && {
                endDate: new Date(endDate),
              }}
            />
          )}
        </div>
      </DModal.Body>
      <DModal.Footer>
        <div className="d-flex gap-3">
          <DButton
            className="d-block w-100"
            text={t('actions.cancel')}
            onClick={closePortal}
            variant="outline"
            theme="secondary"
            pill
          />
          <DButton
            className="d-block w-100"
            text={t('actions.confirmChanges')}
            onClick={changeStatusHandler}
            loading={loading}
            pill
          />
        </div>
      </DModal.Footer>
    </DModal>
  );
}
