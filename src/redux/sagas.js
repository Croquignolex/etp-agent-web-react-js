import { all } from 'redux-saga/effects';

import user from './user/saga';
import sims from './sims/saga';
import fleets from './fleets/saga';
import returns from './returns/saga';
import refuels from './refuels/saga';
import settings from './settings/saga';
import supplies from './supplies/saga';
import operators from './operators/saga';
import clearances from './clearances/saga';
import collectors from './collectors/saga';
import recoveries from './recoveries/saga';
import notifications from './notifications/saga';

// Combine all saga middleware
export default function* sagas() {
    yield all([
        user(),
        sims(),
        fleets(),
        returns(),
        refuels(),
        supplies(),
        settings(),
        operators(),
        clearances(),
        recoveries(),
        collectors(),
        notifications(),
    ]);
}
