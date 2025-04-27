import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const SpoilerAlert: React.FC = () =>
  (
    <div
      className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 rounded-md"
    >
      <div className="flex items-center">
        <FaExclamationTriangle className="text-yellow-500 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-yellow-700 dark:text-yellow-400">Spoiler Warning!</h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            This review may contain spoilers that could affect your experience.
          </p>
        </div>
      </div>
    </div>
  );

export default SpoilerAlert;
