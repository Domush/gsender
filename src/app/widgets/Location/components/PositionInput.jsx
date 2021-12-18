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

import cx from 'classnames';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class PositionInput extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number
  };

  static defaultProps = {
    defaultValue: '',
    min: -10000,
    max: 10000
  };

  state = {
    value: this.props.defaultValue
  };

  node = null;

  componentDidMount() {
    this.node.focus();
  }

  render() {
    const { onSave = noop, onCancel = noop, min, max, className, style } = this.props;
    const isNumber = this.state.value !== '';

    return (
      <div
        className={cx(className, 'input-group', 'input-group-xs')}
        style={{ ...style, width: '100%' }}
      >
        <input
          ref={(node) => {
            this.node = node;
          }}
          type="number"
          className="form-control"
          placeholder=""
          style={{ borderRight: 'none' }}
          value={this.state.value}
          onChange={(event) => {
            let value = event.target.value;

            if (value === '') {
              this.setState({ value: '' });
              return;
            }
            if (value >= min && value <= max) {
              this.setState({ value: value });
            }
          }}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              // ENTER
              onSave(this.state.value);
            }
            if (event.keyCode === 27) {
              // ESC
              onCancel();
            }
          }}
        />
        <div className="input-group-btn">
          <button
            type="button"
            className="btn btn-default"
            disabled={!isNumber}
            onClick={(event) => {
              onSave(this.state.value);
            }}
          >
            <i className="fa fa-fw fa-check" />
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={(event) => {
              onCancel();
            }}
          >
            <i className="fa fa-fw fa-close" />
          </button>
        </div>
      </div>
    );
  }
}

export default PositionInput;
