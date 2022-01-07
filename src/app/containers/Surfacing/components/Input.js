import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ControlledNumberInput from 'app/components/ControlledNumberInput';

import styles from './input.styl';

const Input = ({ value, label, units, onChange, additionalProps, className, style, disabled }) => {
    return (
        <div className={classNames(styles.input, 'form-group', className)} style={style}>
            {label && <label htmlFor="">{`${label}`}</label>}
            <div className="input-group">
                <ControlledNumberInput
                    {...additionalProps}
                    value={value}
                    externalOnChange={onChange}
                    onFocus={(e) => e.target.select()}
                    onClick={(e) => e.target.select()}
                    type="number"
                    className={classNames('form-control', styles.text)}
                />
                {units && <span className="input-group-addon">{units}</span>}
            </div>
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    units: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    additionalProps: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
};

Input.defaultProps = {
    additionalProps: { type: 'text' },
};

export default Input;
