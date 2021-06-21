import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAddClearance} from "../../redux/clearances/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAddClearanceRequestReset} from "../../redux/requests/clearances/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function RequestsClearancesAddClearanceComponent({request, sims, allSimsRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims))
    }, [sims]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAddClearanceRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _amount = requiredChecker(amount);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAmount(_amount);
        setIncomingSim(_incomingSim);
        const validationOK = (_amount.isValid && _incomingSim.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddClearance({
                amount: _amount.data,
                sim: _incomingSim.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allSimsRequests) && <ErrorAlertComponent message={allSimsRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimAgent'
                                         label='Compte à déstocker'
                                         title='Choisir un compte'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Montant demandé'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsClearancesAddClearanceComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsClearancesAddClearanceComponent);
