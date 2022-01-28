import React, {useState} from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import {CANCEL, DONE, PENDING, PROCESSING} from "../../constants/typeConstants";

// Component
function RequestsClearancesCardsComponent({clearances, handleCancelModalShow}) {
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
                {clearances.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                <div className="card-body">
                                    <OperatorComponent operator={item.operator} />
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant demandé</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à accepter</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(item.remaining)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte à déstocker</b>
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
                                            {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                            {item.status === DONE && <b className="text-success text-bold">Pris en charge totalement</b>}
                                            {item.status === PROCESSING && <b className="text-primary text-bold">Pris en charge partiellement</b>}
                                            {item.status === PENDING && <b className="text-danger text-bold">En attente de prise en charge</b>}
                                        </li>
                                    </ul>
                                    {(item.status === PENDING) && (
                                        <div className="mt-3 text-right">
                                            {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                <button type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleCancelModalShow(item)}
                                                >
                                                    <i className="fa fa-times" /> Annuler
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {clearances.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de déstrockages
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
RequestsClearancesCardsComponent.propTypes = {
    clearances: PropTypes.array.isRequired,
    handleCancelModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsClearancesCardsComponent);
