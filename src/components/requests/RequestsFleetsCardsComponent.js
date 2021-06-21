import PropTypes from "prop-types";
import React, {useState} from 'react';

import OperatorComponent from "../OperatorComponent";
import {DONE, PENDING} from "../../constants/typeConstants";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";

// Component
function RequestsFleetsCardsComponent({fleets}) {
    // Local states
    const [simDetailsModal, setSimDetailsModal] = useState({show: false, header: "DETAIL DU COMPTE", id: ''});

    // Hide sim details modal form
    const handleSimDetailsModalHide = () => {
        setSimDetailsModal({...simDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {fleets.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item.operator} />
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Flotte démandée</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        {(item.status === DONE) && (
                                            <li className="list-group-item">
                                                <b>Flotte servie</b>
                                                <span className="float-right text-danger text-bold">
                                                    {formatNumber(parseInt(item.amount) - parseInt(item.remaining))}
                                                </span>
                                            </li>
                                        )}
                                        <li className="list-group-item">
                                            <b>Compte à flotter</b>
                                            <span className="float-right">
                                                {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setSimDetailsModal({...simDetailsModal, show: true, id: item.sim.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Demandeur</b>
                                            <span className="float-right">{item.claimant.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {item.status === DONE && <b className="text-success text-bold">Flottée</b>}
                                            {item.status === PENDING && <b className="text-danger text-bold">En attente de flottage</b>}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {fleets.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de flotte
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={simDetailsModal} handleClose={handleSimDetailsModalHide}>
                <SimDetailsContainer id={simDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsFleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired
};

export default React.memo(RequestsFleetsCardsComponent);
