// src/pages/cv/components/EditableField.jsx
import React, { useState, useRef, useEffect } from 'react';

const EditableField = ({ 
  value, 
  onSave, 
  placeholder, 
  className = '', 
  multiline = false, 
  style = {},
  type = 'text'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`border-2 border-blue-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm resize-y ${className}`}
          placeholder={placeholder}
          rows={4}
          style={style}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`border-2 border-blue-400 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm ${className}`}
        placeholder={placeholder}
        style={style}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-50 hover:ring-1 hover:ring-blue-300 transition-all rounded-lg px-2 py-1 -mx-2 -my-1 ${!value ? 'text-gray-400 italic' : ''} ${className}`}
      style={style}
    >
      {value || placeholder || 'Nhấn để nhập'}
    </div>
  );
};

export default EditableField;