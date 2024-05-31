import {
  DButton,
  DCard,
  DCardBody,
  DPopover,
  useDPortalContext,
  useDToast,
} from '@dynamic-framework/ui-react';
import { User } from '@modyo-dynamic/modyo-service-business';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AvailablePortal } from '../../config/widgetConfig';
import usePermissions from '../../utils/usePermission';

type Props = {
  user: User;
};

export default function TableUsersActions({ user }: Props) {
  const { hasPermission } = usePermissions();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext<AvailablePortal>();
  const { toast } = useDToast();

  const sendInvitationHandler = useCallback(
    () => {
      toast(t('toast.invitation'), {
        autoClose: 3000,
        showClose: false,
        type: 'success',
      });
      setIsOpen(!isOpen);
    },
    [isOpen, t, toast],
  );

  return (
    <DPopover
      open={isOpen}
      setOpen={setIsOpen}
      renderComponent={() => (
        <DButton
          iconStart="three-dots-vertical"
          theme="secondary"
          className="mx-auto d-block cursor-pointer p-2"
          pill
          variant="link"
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    >
      <DCard className="table-actions">
        <DCardBody className="p-2 d-flex flex-column gap-1 text-start">
          <DButton
            theme="secondary"
            variant="link"
            iconStart="eye"
            text={t('actions.goDetail')}
            onClick={() => openPortal('offcanvasUserDetail', { username: user.username })}
          />
          {user.status?.state === 'NEW' && (
            <DButton
              theme="secondary"
              variant="link"
              iconStart="send"
              text={t('actions.send')}
              onClick={sendInvitationHandler}
            />
          )}
          {(
            user.status?.state
              && ['LIVE', 'DORMANT'].includes(user.status.state)
              && hasPermission('updateStatusMember')
          ) && (
            <DButton
              theme="secondary"
              variant="link"
              iconStart="pencil"
              text={t('actions.changeStatus')}
              onClick={() => openPortal('modalChangeUserStatus', { user })}
            />
          )}
        </DCardBody>
      </DCard>
    </DPopover>
  );
}
