const Modal = ({ title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isDisabled = false }) => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{title}</h2>
          <p>{message}</p>
          <div className="modal-actions">
            <button className="cancel-btn order-submit-btn" onClick={onCancel} disabled={isDisabled}>{cancelText}</button>
            <button className="confirm-btn order-submit-btn" onClick={onConfirm} disabled={isDisabled}>
                {isDisabled ? "Processing..." : confirmText}  
            </button>
          </div>
        </div>
      </div>
    );
  };
export default Modal;