import usePermissionsEffect from '../services/hooks/usePermissionsEffect';

export default function Init() {
  usePermissionsEffect();

  return (
    <div className="d-flex justify-content-center align-items-center my-8">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
