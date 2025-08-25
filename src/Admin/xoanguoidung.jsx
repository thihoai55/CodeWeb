import React, { useState } from 'react';
import './Admin.css';

const XoaNguoiDung = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  userToDelete 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-confirmation-modal">
        <div className="modal-header">
          <h3>Xác nhận</h3>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="modal-content">
          <p>Bạn có chắc chắn muốn xóa không ?</p>
        </div>
        <div className="modal-actions">
          <button 
            className="btn-confirm-yes" 
            onClick={onConfirm}
          >
            Có
          </button>
          <button 
            className="btn-confirm-no" 
            onClick={onClose}
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default XoaNguoiDung;
