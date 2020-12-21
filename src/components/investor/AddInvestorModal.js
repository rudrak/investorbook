import styles from './addInvestmentModal.module.css';

import React, { useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { useMutation, gql } from '@apollo/client';

import Button from '../common/Button';

const ADD_INVESTOR = gql`
    mutation AddInvestor( $name: String = "") {
        insert_investor_one(object: {name: $name}) {
            id
            name
        }
    }
`;

export default (props) => {
    const { onClose } = props;

    const [name, onChangeField] = useState('');
    const [addInvestor, { data, loading, error }] = useMutation(ADD_INVESTOR);

    function onChange(e) {
        const value = e.target.value;
        onChangeField(value);
    }

    function onAdd() {
        addInvestor({ variables: { name: name } });
    }

    console.log(name);
    return (
        <div className={styles.modalBg}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.heading}>Add Investor</div>
                    <div className={styles.subHeading}>Enter Details</div>
                    {loading ? <div className={styles.loading}>Loading...</div> : null}
                    {error ? <div className={styles.error}><BsExclamationTriangleFill className={styles.errorIcon}/>Error</div> : null}
                </div>
                <div className={styles.modalBody}>
                    <form className="pure-form">
                        <fieldset>
                            <input
                                type="text"
                                onChange={onChange}
                                name="name"
                                placeholder="Investor Name"
                                value={name}
                                className={styles.inputs}
                            />
                        </fieldset>
                    </form>
                </div>
                <div className={styles.modalFooter}>
                    <Button isBasic={true} onClick={onClose}>Cancel</Button>
                    <Button isPrimary={true} onClick={onAdd}>Add Investor</Button>
                </div>
            </div>
        </div>
    );
}
