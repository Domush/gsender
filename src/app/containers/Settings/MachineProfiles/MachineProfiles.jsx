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

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CreateRecord from './CreateRecord';
import UpdateRecord from './UpdateRecord';
import TableRecords from './TableRecords';
import { MODAL_CREATE_RECORD, MODAL_UPDATE_RECORD } from './constants';

class MachineProfiles extends PureComponent {
  static propTypes = {
    initialState: PropTypes.object,
    state: PropTypes.object,
    stateChanged: PropTypes.bool,
    actions: PropTypes.object
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchRecords();
  }

  render() {
    const { state, actions } = this.props;

    return (
      <div style={{ margin: -15 }}>
        {state.modal.name === MODAL_CREATE_RECORD && (
          <CreateRecord state={state} actions={actions} />
        )}
        {state.modal.name === MODAL_UPDATE_RECORD && (
          <UpdateRecord state={state} actions={actions} />
        )}
        <TableRecords state={state} actions={actions} />
      </div>
    );
  }
}

export default MachineProfiles;
