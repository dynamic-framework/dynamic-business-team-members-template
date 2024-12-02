import { DModal } from '@dynamic-framework/ui-react';

export default function ModalChangeStatusLoader() {
  return (
    <DModal
      name="modalChangeUserStatus"
      centered
    >
      <DModal.Body className="placeholder-glow py-4 px-5">
        <span
          className="placeholder rounded-1 w-100 mb-1"
          style={{ height: '4lh' }}
        />
      </DModal.Body>
      <DModal.Footer className="placeholder-glow">
        <span
          className="placeholder rounded-pill col-6 mb-1"
          style={{ height: '2lh' }}
        />
        <span
          className="placeholder bg-primary-200 col-6 rounded-pill mb-1"
          style={{ height: '2lh' }}
        />
      </DModal.Footer>
    </DModal>
  );
}
