import {
  DButton,
  DInput,
  DInputPin,
  DOffcanvas,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import useValidateOtp from '../../services/hooks/useValidateOtp';

export default function OffcanvasValidateOtp() {
  const { loading, callback } = useValidateOtp();
  const [code, setCode] = useState('');
  const characters = 6;
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  const sendOtp = useCallback(() => {
    if (code.length === characters) {
      callback(code, closePortal);
    }
  }, [callback, closePortal, code]);

  return (
    <DOffcanvas
      name="offcanvasValidateOtp"
      openFrom="end"
      staticBackdrop
    >
      <DOffcanvas.Header
        showCloseButton
        onClose={closePortal}
      >
        <h5 className="fw-bold mb-2">
          {t('offcanvas.otp.title')}
        </h5>
        <p>
          {t('offcanvas.otp.message')}
        </p>
      </DOffcanvas.Header>
      <DOffcanvas.Body>
        <div className="d-flex flex-column gap-4">
          <DInput
            id="comment"
            label={t('offcanvas.otp.commentLabel')}
            placeholder={t('offcanvas.otp.commentPlaceholder')}
          />
          <div className="d-flex flex-column gap-2">
            <DInputPin
              id="otp"
              label={t('offcanvas.otp.otpLabel')}
              characters={characters}
              onChange={(pin) => setCode(pin)}
              valid={code.length === characters}
            />
            <small className="text-gray-500 px-2">
              <Trans
                i18nKey="offcanvas.otp.otpHint"
                components={{
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
                  a: <a className="text-secondary" href="#" />,
                }}
              />
            </small>
          </div>
        </div>
      </DOffcanvas.Body>
      <DOffcanvas.Footer>
        <div className="d-flex flex-column align-items-center gap-3 w-100">
          <DButton
            text={t('actions.confirm')}
            onClick={sendOtp}
            loading={loading}
            pill
          />
          <DButton
            text={t('actions.cancel')}
            onClick={closePortal}
            variant="link"
            theme="secondary"
            pill
          />
        </div>
      </DOffcanvas.Footer>
    </DOffcanvas>
  );
}
