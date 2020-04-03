/**
 * Copyright (c) [2020] SUSE Linux
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE.txt file for details.
 */

/**
 * This module takes care of displaying notifications to the user.
 *
 * @see notifications
 */
import cogoToast from 'cogo-toast';

import { SEVERITY_INFO, SEVERITY_WARN, SEVERITY_ERROR } from './notifications';

const severityHandlers = {
  [SEVERITY_INFO]: cogoToast.info,
  [SEVERITY_WARN]: cogoToast.warn,
  [SEVERITY_ERROR]: cogoToast.error
};

/**
 * Shows a notification
 *
 * @param {object} - notification to display
 */
const notify = (notification) => {
  const { severity, text } = notification;
  const notifyFn = severityHandlers[severity];
  notifyFn(text);
};

export default {
  notify
};
