export default function LogoutConfirmDialog({ onConfirm, onCancel }) {
  return (
    <dialog id="logout_modal" className="modal modal-open">
      <div className="modal-box text-center">
        <h3 className="text-lg font-bold">Are you sure?</h3>
        <p className="py-2">You will be logged out from your account.</p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="btn btn-error btn-sm" onClick={onConfirm}>
            Yes, Logout
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
