import styles from './addInvestmentModal.module.css';

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

import Button from '../common/Button';

const ADD_INVESTMENT = gql`
    mutation MyMutation($company_id: Int = 10, $investor_id: Int = 10, $amount: numeric = 0) {
      insert_investment_one(object: {company_id: $company_id, investor_id: $investor_id, amount: $amount}) {
        company_id
        id
        investor_id
        amount
      }
    }
`;

export default (props) => {
    const { onClose, investorId } = props;

    const [addInvestment, { data, loading, error }] = useMutation(ADD_INVESTMENT);
    const [investment, changeInvestment] = useState({
        investorId
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    function onChange(e) {
        const value = e.target.value;
        const name = e.target.name

        console.log(`evemt called on ${name}`);

        changeInvestment(investment => {
            investment[name] = value;
            return investment;
        });
    }

    function onAdd() {
        addInvestment({ variables: { company_id: investment.companyId, investor_id: investorId } });
    }


    return (
        <div className={styles.modalBg}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.heading}>Add Investment</div>
                    <div className={styles.subHeading}>Please enter details of investment</div>
                </div>
                <div className={styles.modalBody}>
                    <form className="pure-form">
                        <fieldset>
                            <input
                                type="text"
                                onChange={onChange}
                                name="companyId"
                                placeholder="Select Company"
                                value={investment.companyId}
                                className={styles.inputs}
                            />
                            <input
                                type="text"
                                onChange={onChange}
                                name="amount"
                                value={investment.amount}
                                placeholder="Investment Amount"
                                className={styles.inputs}
                            />
                        </fieldset>
                    </form>
                </div>
                <div className={styles.modalFooter}>
                    <Button isBasic={true} onClick={onClose}>Cancel</Button>
                    <Button isPrimary={true} onClick={onAdd}>Add Investment</Button>
                </div>
            </div>
        </div>
    );
}
