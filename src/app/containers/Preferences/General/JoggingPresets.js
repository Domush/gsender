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

import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import store from 'app/store';
import Tooltip from 'app/components/TooltipCustom/ToolTip';
import { Toaster, TOASTER_SUCCESS } from 'app/lib/toaster/ToasterLib';
import Fieldset from '../components/Fieldset';
import Input from '../components/Input';
import styles from '../index.styl';
import { convertToImperial, convertToMetric } from '../calculate';

export default class JoggingPresets extends Component {
  state = {
    units: store.get('workspace.units'),
    jogSpeeds: this.getJogSpeeds(),
    selectedPreset: 'precise'
  };

  showToast = _.throttle(
    () => {
      Toaster.pop({
        msg: 'Settings Updated',
        type: TOASTER_SUCCESS,
        duration: 3000
      });
    },
    5000,
    { trailing: false }
  );

  getJogSpeeds() {
    const jog = store.get('widgets.axes.jog', {});
    const { rapid, normal, precise } = jog;

    return { rapid, normal, precise };
  }

  handleJogClick = (selected) => {
    this.setState({
      selectedPreset: selected
    });
  };

  updateState = () => {
    console.log('WE HERE IN THE UPDATE FUNCTION');
    const units = store.get('workspace.units');

    const jogSpeeds = this.getJogSpeeds();
    console.log('in state update');
    console.log(jogSpeeds);
    this.setState({
      units,
      jogSpeeds: { ...jogSpeeds }
    });
  };

  handleXYChange = (e) => {
    let value = Number(e.target.value);
    const { units, selectedPreset, jogSpeeds } = this.state;

    const currentPreset = jogSpeeds[selectedPreset];

    if (!value) {
      return;
    }

    if (units === 'mm') {
      if (value > 1000) {
        value = 1000;
      }
    }

    if (units === 'in') {
      if (value > 40) {
        value = 40;
      }
    }

    if (value <= 0) {
      value = 1;
    }

    const metricValue = units === 'mm' ? value : convertToMetric(value);
    const imperialValue = units === 'in' ? value : convertToImperial(value);

    currentPreset.mm.xyStep = metricValue;
    currentPreset.in.xyStep = imperialValue;

    const prev = store.get('widgets.axes');

    const updated = {
      ...prev,
      jog: {
        ...prev.jog,
        [selectedPreset]: {
          ...currentPreset
        }
      }
    };

    store.replace('widgets.axes', updated);
    this.updateState();
    this.showToast();
  };

  handleZChange = (e) => {
    let value = Number(e.target.value);
    const { units, selectedPreset, jogSpeeds } = this.state;

    const currentPreset = jogSpeeds[selectedPreset];

    if (units === 'mm') {
      if (value > 100) {
        value = 100;
      }
    }

    if (units === 'in') {
      if (value > 4) {
        value = 4;
      }
    }

    if (value <= 0) {
      value = 1;
    }

    const metricValue = units === 'mm' ? value : convertToMetric(value);
    const imperialValue = units === 'in' ? value : convertToImperial(value);

    currentPreset.mm.zStep = metricValue;
    currentPreset.in.zStep = imperialValue;

    const prev = store.get('widgets.axes');

    const updated = {
      ...prev,
      jog: {
        ...prev.jog,
        [selectedPreset]: {
          ...currentPreset
        }
      }
    };

    store.replace('widgets.axes', updated);
    this.updateState();
    this.showToast();
  };

  handleSpeedChange = (e) => {
    let value = Number(e.target.value);
    const { units, selectedPreset, jogSpeeds } = this.state;
    const currentPreset = jogSpeeds[selectedPreset];

    if (units === 'mm') {
      if (value >= 50000.1) {
        return;
      }
    }

    if (units === 'in') {
      if (value >= 2000.1) {
        return;
      }
    }

    if (value <= 0) {
      return;
    }

    const metricValue = units === 'mm' ? value : convertToMetric(value);
    const imperialValue = units === 'in' ? value : convertToImperial(value);

    currentPreset.mm.feedrate = metricValue;
    currentPreset.in.feedrate = imperialValue;

    const prev = store.get('widgets.axes');

    const updated = {
      ...prev,
      jog: {
        ...prev.jog,
        [selectedPreset]: {
          ...currentPreset
        }
      }
    };

    store.replace('widgets.axes', updated);
    this.updateState();
    this.showToast();
  };

  render() {
    const { units, jogSpeeds, selectedPreset } = this.state;

    const preset = jogSpeeds[selectedPreset];

    const xyValue = preset[units]?.xyStep;
    const zValue = preset[units]?.zStep;
    const speedValue = preset[units]?.feedrate;

    return (
      <Fieldset legend="Jogging Presets">
        <div className={classnames(styles.jogSpeedWrapper, styles.flexRow)}>
          <button
            type="button"
            onClick={() => this.handleJogClick('precise')}
            className={
              styles[selectedPreset === 'precise' ? 'jog-speed-active' : 'jog-speed-inactive']
            }
          >
            Precise
          </button>
          <button
            type="button"
            onClick={() => this.handleJogClick('normal')}
            className={
              styles[selectedPreset === 'normal' ? 'jog-speed-active' : 'jog-speed-inactive']
            }
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => this.handleJogClick('rapid')}
            className={
              styles[selectedPreset === 'rapid' ? 'jog-speed-active' : 'jog-speed-inactive']
            }
          >
            Rapid
          </button>
        </div>
        <div className={styles['jog-spead-wrapper']}>
          <Tooltip
            content="Set amount of movement for XY Jog Speed Preset Buttons"
            location="default"
          >
            <Input
              label="XY Move"
              units={units}
              onChange={this.handleXYChange}
              additionalProps={{ type: 'number', id: 'xyStep' }}
              value={xyValue}
            />
          </Tooltip>
          <Tooltip
            content="Set amount of movement for Z Jog Speed Preset Buttons"
            location="default"
          >
            <Input
              label="Z Move"
              units={units}
              onChange={this.handleZChange}
              additionalProps={{ type: 'number', id: 'zStep' }}
              value={zValue}
            />
          </Tooltip>
          <Tooltip content="Set the speed for the Jog Speed Preset Buttons" location="default">
            <Input
              label="Speed"
              units={`${units}/min`}
              onChange={this.handleSpeedChange}
              additionalProps={{ type: 'number', id: 'feedrate' }}
              value={speedValue}
            />
          </Tooltip>
        </div>
      </Fieldset>
    );
  }
}
