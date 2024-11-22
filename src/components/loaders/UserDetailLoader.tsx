import { DOffcanvas } from '@dynamic-framework/ui-react';

export default function UserDetailLoader() {
  return (
    <DOffcanvas
      name="userDetailLoading"
      openFrom="end"
    >
      <DOffcanvas.Body className="p-4">
        <div className="placeholder-glow d-flex flex-column">
          <span
            className="placeholder w-100 mb-1"
            style={{ height: '2lh' }}
          />
          <span
            className="placeholder w-100 mb-1"
            style={{ height: '4lh' }}
          />
          <span
            className="placeholder w-100 mb-1"
            style={{ height: '4lh' }}
          />
          <span
            className="placeholder w-100 mb-1"
            style={{ height: '4lh' }}
          />
        </div>
      </DOffcanvas.Body>
    </DOffcanvas>
  );
}
