import React from 'react';
import PropTypes from "prop-types";

import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function RecoveriesFleetsCardsComponent({returns}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {returns.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`}>
                                    <h3 className="card-title">{fleetTypeBadgeColor(item.status).text}</h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Flotte retournée</b>
                                            <span className="float-right">{formatNumber(item.amount)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce agent</b>
                                            <span className="float-right">{item.sim_outgoing.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce de flottage</b>
                                            <span className="float-right">{item.sim_incoming.number}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {returns.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de recouvrements d'espèces
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
RecoveriesFleetsCardsComponent.propTypes = {
    returns: PropTypes.array.isRequired
};

export default React.memo(RecoveriesFleetsCardsComponent);
