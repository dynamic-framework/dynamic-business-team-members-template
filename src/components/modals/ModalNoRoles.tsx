import {
  DButton,
  DModal,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function ModalNoRoles() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  return (
    <DModal
      name="modalNoRoles"
      className="d-block modal-initial-message"
      centered
    >
      <DModal.Body>
        <div className="d-flex flex-column gap-4 py-4 px-5">
          <h1 className="fw-bold fs-5">
            {t('modal.noRoles.title')}
          </h1>
          <p className="p-3 bg-gray-100 rounded-1">
            {t('modal.noRoles.message')}
          </p>
          <DButton
            className="d-block align-self-center"
            text={t('actions.createRole')}
            onClick={closePortal}
            pill
          />
        </div>
      </DModal.Body>
    </DModal>
  );
}
