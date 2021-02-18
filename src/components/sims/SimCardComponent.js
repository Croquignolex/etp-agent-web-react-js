import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function SimCardComponent({sim}) {
    // Render
    return (
        <div>
            <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                    <b>Créer le</b>
                    <span className="float-right">{dateToString(sim.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{sim.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Numéro</b>
                    <span className="float-right">{sim.number}</span>
                </li>
                <li className="list-group-item">
                    <b>Solde flotte</b>
                    <span className="float-right text-success text-bold">{formatNumber(sim.balance)}</span>
                </li>
                <li className="list-group-item">
                    <b>Opérateur</b>
                    <span className="float-right">{sim.operator.name}</span>
                </li>
            </ul>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimCardComponent);
