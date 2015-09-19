'use strict';

import React, { PropTypes } from 'react/addons';
import Icon from './Icon';

const Modal = React.createClass({

    propTypes: {
        hideModal: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.element
        ]).isRequired
    },

    render() {
        const { hideModal, children } = this.props;

        return (
            <div className="modal-overlay" onClick={ hideModal }>
                <div className="modal-inner" onClick={ (e) => e.stopPropagation() }>
                    <a href="#" onClick={ hideModal } className="modal-close">
                        <Icon svg={ require('../../svg/close.svg') } />
                        <span className="sr-only">Hide Modal</span>
                    </a>
                    { children }
                </div>
            </div>
        );
    }
});

export default Modal;
