import React, { useState } from 'react';
import axios from 'axios';
import './AccessibilityChecker.css';

const AccessibilityChecker = () => {
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#d13131');
  const [showBgPicker, setShowBgPicker] = useState(true);
  const [showTextPicker, setShowTextPicker] = useState(true);
  const [contrastData, setContrastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckContrast = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://rajat567-accessibilitychecker.hf.space/check-contrast',
        {
          background: bgColor,
          text: textColor,
        }
      );
      setContrastData(response.data);
    } catch (error) {
      console.error('Error checking contrast:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="accessibility-checker">
      <h2 className="title">Accessibility Contrast Checker</h2>

      <div className="color-inputs">
        {/* Background Color */}
        <div className="backtext">
          <p>Background Color</p>
          <div className="input-wrapper">
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              maxLength={7}
              className="color-text-input"
            />
            {showBgPicker && (
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="color-picker"
              />
            )}
          </div>
        </div>

        {/* Text Color */}
        <div className="backtext">
          <p>Text Color</p>
          <div className="input-wrapper">
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              maxLength={7}
              className="color-text-input"
            />
            {showTextPicker && (
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="color-picker"
              />
            )}
          </div>
        </div>
      </div>

      {/* Check Contrast Button */}
      <button
        onClick={handleCheckContrast}
        className="check-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span style={{ marginLeft: '8px' }}>Checking...</span>
          </>
        ) : (
          'Check Contrast'
        )}
      </button>

      {/* Results */}
      {contrastData && (
        <div className="results">
          <p className="contrast-ratio">
            Contrast Ratio: <b>{contrastData.contrast_ratio}:1</b>
          </p>
          <p>
            AA (Normal Text): {contrastData.AA_pass ? '✅ Pass' : '❌ Fail'} |
            AAA (Normal Text): {contrastData.AAA_pass ? '✅ Pass' : '❌ Fail'}
          </p>
          <div
            className="sample-text"
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
          >
            Sample Text
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityChecker;
