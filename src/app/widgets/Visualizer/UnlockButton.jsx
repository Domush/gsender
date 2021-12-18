/*
 * Copyright (C) 2021 Sienci Labs Inc.
 *
 * This file is part of gSender.
 *
 * gSender is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, under version 3 of the License.
 *
 * gSender is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gSender.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact for information regarding this program and its license
 * can be sent through gSender@sienci.com or mailed to the main office
 * of Sienci Labs Inc. in Waterloo, Ontario, Canada.
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import controller from 'app/lib/controller';
import { GRBL_ACTIVE_STATE_ALARM } from 'app/constants';
import styles from './UnlockButton.styl';

const UnlockButton = ({ activeState, alarmCode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => {
    setIsHovering(true);
  };
  const onMouseOut = () => {
    setIsHovering(false);
  };
  const handleUnlock = () => {
    if (activeState === GRBL_ACTIVE_STATE_ALARM && alarmCode === 'Homing') {
      controller.command('unlock');
    } else {
      controller.command('cyclestart');
    }
  };

  return (
    <button
      onClick={handleUnlock}
      className={styles.unlockButton}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseOut}
    >
      <div className={styles.unlockIndicator}>
        <i className="fas fa-caret-right" />
      </div>
      <i className={isHovering ? 'fas fa-lock-open' : 'fas fa-unlock fa-flip-horizontal'} />
      {isHovering && <div className={styles.unlockText}>Unlock Machine</div>}
    </button>
  );
};

export default connect((store) => {
  const activeState = get(store, 'controller.state.status.activeState');
  const alarmCode = get(store, 'controller.state.status.alarmCode');
  return {
    activeState,
    alarmCode
  };
})(UnlockButton);
