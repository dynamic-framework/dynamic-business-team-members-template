import { DButton, DOffcanvas } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function UserDetailLoader() {
  const { t } = useTranslation();
  return (
    <DOffcanvas
      name="userDetail"
      openFrom="end"
    >
      <DOffcanvas.Body className="p-4">
        <h5 className="fw-bold">
          {t('actions.loading')}
        </h5>
        <div className="text-center">
          <DButton
            theme="secondary"
            variant="link"
            loading
            size="lg"
          />
        </div>
      </DOffcanvas.Body>
    </DOffcanvas>
  );
}
