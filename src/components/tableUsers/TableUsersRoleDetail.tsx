import { DButton, useDPortalContext } from '@dynamic-framework/ui-react';

import { AvailablePortal } from '../../config/widgetConfig';

type Props = {
  name: string;
  role: string;
};

export default function TableUsersRoleDetail({
  name,
  role,
}: Props) {
  const { openPortal } = useDPortalContext<AvailablePortal>();
  return (
    <DButton
      className="p-0"
      text={name}
      variant="link"
      theme="secondary"
      size="sm"
      pill
      onClick={() => openPortal('offcanvasRoleDetail', { role })}
      disabled
    />
  );
}
