import React from 'react';
import cx from 'classnames';
import Image from 'app/components/Image';
import { TOUCHPLATE_TYPE_STANDARD, TOUCHPLATE_TYPE_AUTOZERO } from 'app/lib/constants';
import styles from './index.styl';
import XProbe from './assets/Block-X.gif';
import YProbe from './assets/Block-Y.gif';
import XYProbe from './assets/Block-XY.gif';
import XYZProbe from './assets/Block-XYZ.gif';
import ZProbe from './assets/Block-Z.gif';
import AutoZProbe from './assets/AutoZero-Z.gif';
import AutoXYZProbe from './assets/AutoZero-Rem.gif';


const ProbeImage = ({ probeCommand, touchplateType = TOUCHPLATE_TYPE_STANDARD, visible = true }) => {
    const getProbeImage = () => {
        const { id } = probeCommand;
        if (touchplateType === TOUCHPLATE_TYPE_AUTOZERO) {
            if (id === 'Z Touch') {
                return AutoZProbe;
            }
            return AutoXYZProbe;
        }
        if (id === 'X Touch') {
            return XProbe;
        } else if (id === 'Y Touch') {
            return YProbe;
        } else if (id === 'XY Touch') {
            return XYProbe;
        } else if (id === 'Z Touch') {
            return ZProbe;
        }
        return XYZProbe;
    };
    const imgSrc = getProbeImage();

    return (
        <div className={styles.imgWrap}>
            <Image src={imgSrc} className={cx({ [styles.imgHidden]: !visible })} />
        </div>
    );
};

export default ProbeImage;
