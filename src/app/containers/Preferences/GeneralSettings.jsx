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

/*
 *     This file is part of gSender.
 *
 *     gSender is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     gSender is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with gSender.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import classNames from 'classnames';
import ToggleSwitch from 'app/components/ToggleSwitch';
import { RadioGroup, RadioButton } from 'app/components/Radio';
import i18n from 'app/lib/i18n';
import styles from './index.styl';
import {
    IMPERIAL_UNITS,
    METRIC_UNITS,
} from '../../constants';
import JogSpeeds from './General/JogSpeeds';
import MachineProfileOptions from './MachineProfiles/Options';
import Fieldset from './FieldSet';
import Baudrates from './General/Baudrates';
import Input from './Input';

const GeneralSettings = ({ active, state, actions }) => {
    const { units, reverseWidgets, autoReconnect, safeRetractHeight } = state;
    let baudRateDisabled = true;
    if (state.controller.type === '') {
        baudRateDisabled = false;
    }

    return (
        <div className={classNames(
            styles.hidden,
            styles['settings-wrapper'],
            { [styles.visible]: active }
        )}
        >
            <h3 className={styles.settingsTitle}>
                General
            </h3>
            <div className={styles.toolMain}>
                <div className={styles.generalArea}>
                    <div className={styles.halfContainer}>
                        <Fieldset legend="Connection">
                            <div className={baudRateDisabled ? styles.disabled : styles.addMargin}>
                                <Baudrates baudrate={state.baudrate} onChange={(option) => actions.general.setBaudrate(option)} />
                                <br />
                            </div>
                            <div className={styles.reconnect}>
                                <ToggleSwitch
                                    label="Re-connect automatically"
                                    checked={autoReconnect}
                                    onChange={() => actions.general.setAutoReconnect()}
                                    size="small"
                                />
                            </div>
                        </Fieldset>
                        <Fieldset legend="Workspace">
                            <div className={styles.addMargin}>
                                <RadioGroup
                                    name="units"
                                    value={units}
                                    depth={2}
                                    onChange={(value, event) => actions.general.setUnits(value)}
                                    size="small"
                                >
                                    <div>
                                        <RadioButton className={styles.prefferedradio} label={i18n._('Inches (G20)')} value={IMPERIAL_UNITS} />
                                        <RadioButton className={styles.prefferedradio} label={i18n._('Millimeters (G21)')} value={METRIC_UNITS} />
                                    </div>
                                </RadioGroup>
                                <small className={styles['item-info']}>Units to be displayed throughout the interface</small>
                            </div>
                            <div className={styles.addMargin}>
                                <ToggleSwitch
                                    label="Reverse workspace layout"
                                    checked={reverseWidgets}
                                    onChange={() => actions.general.setReverseWidgets()}
                                    size="small"
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <ToggleSwitch
                                    label="Warn if file contains invalid G-Code"
                                    checked={state.showWarning}
                                    onChange={() => actions.general.setShowWarning(!state.showWarning)}
                                    size="small"
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <ToggleSwitch
                                    label="Warn if invalid line detected during job"
                                    checked={state.showLineWarnings}
                                    onChange={() => actions.general.setShowLineWarnings(!state.showLineWarnings)}
                                    size="small"
                                />
                            </div>
                        </Fieldset>
                        <Fieldset legend="Jog Speed Presets">
                            <JogSpeeds />
                        </Fieldset>
                    </div>
                    <div style={{ width: '48%' }}>
                        <Fieldset legend="Machine Profile" className={styles['mb-0']}>
                            <MachineProfileOptions state={state} />
                        </Fieldset>
                        <Fieldset legend="Movement">
                            <Input
                                label="Safe Height"
                                units={units}
                                value={safeRetractHeight}
                                onChange={(e) => actions.general.setSafeRetractHeight(e)}
                                additionalProps={{ name: 'safeRetractHeight', type: 'number' }}
                            />
                        </Fieldset>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default GeneralSettings;