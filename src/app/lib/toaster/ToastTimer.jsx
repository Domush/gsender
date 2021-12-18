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

import React, { PureComponent } from 'react';
import styles from './toaster.styl';

class ToastTimer extends PureComponent {
  timer = null;

  constructor(props) {
    super(props);
    this.state = {
      createdAt: props.createdAt,
      duration: props.duration,
      width: 80
    };
  }

  tick = () => {
    const { createdAt, duration } = this.state;
    const time = Date.now();
    const timeActive = time - createdAt;
    const percentageProgress = ((timeActive / duration) * 100).toFixed(1);

    const width = 100 - percentageProgress;
    this.setState({
      width: width
    });
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 25);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { width } = this.state;
    return (
      <div className={styles.toastProgress}>
        <div className={styles.toastProgressBar} style={{ width: `${width}%` }} />
      </div>
    );
  }
}

export default ToastTimer;
