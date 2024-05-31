import {
  DButton,
  DOffcanvas,
  DOffcanvasFooter,
  PortalProps,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { Trans, useTranslation } from 'react-i18next';

import { AvailablePortal } from '../../config/widgetConfig';

export default function OffcanvasRoleDetail(
  {
    payload: { role },
  }: PortalProps<AvailablePortal['offcanvasRoleDetail']>,
) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  return (
    <DOffcanvas
      name="offcanvasRoleDetail"
      openFrom="end"
    >
      <DOffcanvas.Header
        showCloseButton
        onClose={closePortal}
      >
        <div className="d-flex flex-column gap-1">
          <h2 className="h5">
            <Trans
              i18nKey="offcanvas.roleDetail.title"
              values={{ role }}
              components={{
                bold: <strong className="fw-bold" />,
              }}
            />
          </h2>
        </div>
      </DOffcanvas.Header>
      <DOffcanvas.Body>
        TODO: Get info about this role
      </DOffcanvas.Body>
      <DOffcanvasFooter>
        <div className="d-flex flex-column align-items-center gap-2">
          <DButton
            text={t('actions.cancel')}
            variant="link"
            theme="secondary"
            onClick={closePortal}
            pill
          />
        </div>
      </DOffcanvasFooter>
    </DOffcanvas>
  );
}
