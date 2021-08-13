import React, { useState } from 'react';
import classnames from 'classnames';
import store from 'app/store';
import PropTypes from 'prop-types';
import { Toaster, TOASTER_SUCCESS } from 'app/lib/toaster/ToasterLib';

import styles from './index.styl';
import ProfileItem from './ProfileItem';
import MainTable from './MainTable';
import ProfileShortcutModal from './ProfileShortcutModal';

const Profile = ({ currentProfile, onUpdateProfiles }) => {
    Profile.propTypes = { currentProfile: PropTypes.object, onUpdateProfiles: PropTypes.func };

    const { profileName, icon, shortcuts } = currentProfile;

    const [currentShortcut, setCurrentShortcut] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (currShortcut) => {
        const updatedShortcuts = shortcuts.map((shortcut) => (shortcut.id === currShortcut.id ? { ...shortcut, keys: '', keysName: '', isActive: false } : shortcut));

        const profiles = store.get('workspace.gamepad.profiles', []);

        const updatedProfiles =
            profiles.map(profile => (currentProfile.id === profile.id ? ({ ...profile, shortcuts: updatedShortcuts }) : currentProfile));

        onUpdateProfiles(updatedProfiles);

        Toaster.pop({
            msg: 'Removed Joystick Action Shortcut',
            type: TOASTER_SUCCESS,
            duration: 2000
        });
    };

    const handleShortcutToggle = (currShortcut) => {
        const updatedShortcuts = shortcuts.map((shortcut) => (shortcut.id === currShortcut.id ? currShortcut : shortcut));

        const profiles = store.get('workspace.gamepad.profiles', []);

        const updatedProfiles =
            profiles.map(profile => (currentProfile.id === profile.id ? ({ ...profile, shortcuts: updatedShortcuts }) : currentProfile));

        onUpdateProfiles(updatedProfiles);
    };

    return (
        <>
            <div style={{ overflowY: 'clip' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 11fr', alignItems: 'center', margin: '0 0 1rem' }}>
                    <i className={classnames(icon, styles.profileItemIcon)} /> <div style={{ fontSize: '1.5rem' }}>{profileName}</div>
                </div>
                <div style={{ overflowY: 'auto', height: '90%', backgroundColor: 'white' }}>
                    <MainTable
                        onEdit={(shortcut) => {
                            setShowModal(true);
                            setCurrentShortcut(shortcut);
                        }}
                        onDelete={handleDelete}
                        onShortcutToggle={handleShortcutToggle}
                        data={shortcuts}
                    />
                </div>
            </div>

            {showModal && (
                <ProfileShortcutModal
                    profile={currentProfile}
                    shortcut={currentShortcut}
                    onClose={() => setShowModal(false)}
                    onUpdateProfiles={onUpdateProfiles}
                />
            )}
        </>
    );
};

export { Profile, ProfileItem };