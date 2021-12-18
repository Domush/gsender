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
import PropTypes from 'prop-types';
// import Space from 'app/components/Space';
import MaskInputTen from './Input10';
import NumberInputs from './NumberInputs';
import SwitchInput from './SwitchInputs';
import BitShiftInput from './BitShiftInput';

class InputController extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    currentSettings: PropTypes.object,
    getUsersNewSettings: PropTypes.func,
    switchSettings: PropTypes.object,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    grabNewNumberInputSettings: PropTypes.func,
    grabNewSwitchInputSettings: PropTypes.func,
    grabNew$2InputSettings: PropTypes.func,
    grabNew$3InputSettings: PropTypes.func,
    grabNew$10InputSettings: PropTypes.func,
    handleShiftedValues: PropTypes.func,
    units: PropTypes.string,
    disableSettingsButton: PropTypes.func
  };

  render() {
    let currentSettings = this.props.currentSettings;
    let title = this.props.title;
    let min = this.props.min;
    let max = this.props.max;
    let step = this.props.step;
    if (this.props.type === 'number') {
      return (
        <NumberInputs
          name={title}
          title={title}
          min={min}
          max={max}
          step={step}
          currentSettings={currentSettings}
          getUsersNewSettings={this.props.getUsersNewSettings}
          grabNewNumberInputSettings={this.props.grabNewNumberInputSettings}
          units={this.props.units}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    } else if (this.props.type === 'switch') {
      return (
        <SwitchInput
          name={title}
          switchSettings={this.props.switchSettings}
          currentSettings={currentSettings}
          title={title}
          getUsersNewSettings={this.props.getUsersNewSettings}
          grabNewSwitchInputSettings={this.props.grabNewSwitchInputSettings}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    } else if (this.props.type === 'mask2') {
      return (
        <BitShiftInput
          name={title}
          switchSettings={this.props.switchSettings}
          currentSettings={currentSettings}
          title={title}
          getUsersNewSettings={this.props.getUsersNewSettings}
          handleShiftedValues={this.props.handleShiftedValues}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    } else if (this.props.type === 'mask3') {
      return (
        <BitShiftInput
          name={title}
          switchSettings={this.props.switchSettings}
          currentSettings={currentSettings}
          title={title}
          getUsersNewSettings={this.props.getUsersNewSettings}
          handleShiftedValues={this.props.handleShiftedValues}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    } else if (this.props.type === 'mask10') {
      return (
        <MaskInputTen
          name={title}
          switchSettings={this.props.switchSettings}
          currentSettings={currentSettings}
          title={title}
          getUsersNewSettings={this.props.getUsersNewSettings}
          grabNew$10InputSettings={this.props.grabNew$10InputSettings}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    } else if (this.props.type === 'mask23') {
      return (
        <BitShiftInput
          name={title}
          switchSettings={this.props.switchSettings}
          currentSettings={currentSettings}
          title={title}
          getUsersNewSettings={this.props.getUsersNewSettings}
          handleShiftedValues={this.props.handleShiftedValues}
          disableSettingsButton={this.props.disableSettingsButton}
        />
      );
    }
    return <div> Error Loading inputs</div>;
  }
}

export default InputController;
