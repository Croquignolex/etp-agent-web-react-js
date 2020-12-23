import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, {useState, useMemo} from 'react';

import {APP_NAME} from "../constants/generalConstants";
import {formatString} from "../functions/generalFunctions";
import {
    SIMS,
    USERS,
    ZONES,
    AGENTS,
    REQUESTS,
    OPERATORS,
    COMPANIES,
    COLLECTORS,
    RECOVERIES,
    OPERATIONS,
    LISTING_PAGE,
    USER_NEW_PAGE,
    ZONE_NEW_PAGE,
    ALL_SIMS_PAGE,
    ALL_USERS_PAGE,
    DASHBOARD_PAGE,
    AGENT_NEW_PAGE,
    ALL_ZONES_PAGE,
    ALL_AGENTS_PAGE,
    COMPANY_NEW_PAGE,
    COLLECTOR_FLEETS,
    OPERATOR_NEW_PAGE,
    COLLECTOR_NEW_PAGE,
    ALL_COMPANIES_PAGE,
    ALL_OPERATORS_PAGE,
    ALL_COLLECTORS_PAGE,
    RECOVERIES_CASH_PAGE,
    REQUESTS_FLEETS_PAGE,
    RECOVERIES_FLEET_PAGE,
    OPERATIONS_FLEETS_PAGE,
    OPERATIONS_AFFORDS_PAGE,
    REQUESTS_CLEARANCES_PAGE,
    OPERATIONS_TRANSFERS_PAGE,
    OPERATIONS_CLEARANCES_PAGE,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE
} from "../constants/pageNameConstants";
import {
    SIMS_PAGE_PATH,
    ZONES_PAGE_PATH,
    USERS_PAGE_PATH,
    AGENTS_PAGE_PATH,
    PROFILE_PAGE_PATH,
    LISTING_PAGE_PATH,
    ZONE_NEW_PAGE_PATH,
    USER_NEW_PAGE_PATH,
    SIM_EDIT_PAGE_PATH,
    AGENT_NEW_PAGE_PATH,
    COMPANIES_PAGE_PATH,
    DASHBOARD_PAGE_PATH,
    ZONE_EDIT_PAGE_PATH,
    USER_EDIT_PAGE_PATH,
    OPERATORS_PAGE_PATH,
    COLLECTORS_PAGE_PATH,
    AGENT_EDIT_PAGE_PATH,
    COMPANY_NEW_PAGE_PATH,
    COMPANY_EDIT_PAGE_PATH,
    OPERATOR_NEW_PAGE_PATH,
    OPERATOR_EDIT_PAGE_PATH,
    COLLECTOR_NEW_PAGE_PATH,
    COLLECTOR_EDIT_PAGE_PATH,
    REQUESTS_FLEETS_PAGE_PATH,
    RECOVERIES_CASH_PAGE_PATH,
    COLLECTOR_FLEETS_PAGE_PATH,
    OPERATIONS_FLEETS_PAGE_PATH,
    OPERATION_AFFORDS_PAGE_PATH,
    RECOVERIES_FLEETS_PAGE_PATH,
    REQUESTS_FLEET_NEW_PAGE_PATH,
    REQUESTS_FLEET_EDIT_PAGE_PATH,
    REQUESTS_CLEARANCES_PAGE_PATH,
    OPERATIONS_TRANSFERS_PAGE_PATH,
    OPERATIONS_CLEARANCES_PAGE_PATH,
    REQUESTS_CLEARANCE_NEW_PAGE_PATH,
    OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH
} from "../constants/pagePathConstants";

// Component
function SideBarComponent({user, pathname}) {
    // Local states
    const [toggle, setToggle] = useState({show: false, key: 0});

    // Data
    const {name, avatar} = user;

    const authorisedMenu = useMemo(() => {
        return [
            buildDashboardMenu(),
            buildRequestsMenu(),
            buildAuthorisedOperationsMenu(),
            buildAuthorisedRecoveriesMenu(),
            buildAuthorisedCompaniesMenu(),
            buildAuthorisedUsersMenu(),
            buildAuthorisedAgentsMenu(),
            buildAuthorisedCollectorsMenu(),
            buildAuthorisedZonesMenu(),
            buildAuthorisedSimsMenu(),
            buildAuthorisedOperatorsMenu(),
            buildAuthorisedListingMenu(),
        ];
    }, []);

    // Render
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* App logo */}
            <span className="brand-link">
                <img alt="logo..."
                     className="brand-image img-circle elevation-3 bg-white"
                     src={require('../assets/images/logo.png')}
                />
                <strong className="brand-text">{APP_NAME}</strong>
            </span>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={avatar} className="img-circle elevation-2" alt="avatar..."/>
                    </div>
                    <div className="info">
                        <Link className="text-white" to={PROFILE_PAGE_PATH}>{formatString(name, 17)}</Link>
                    </div>
                </div>
                {/* Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {authorisedMenu.map((prop, key) => {
                            if (prop.sub.length === 0) {
                                return (
                                    <li className="nav-item" key={key}>
                                        <Link to={prop.path}
                                              className={`${prop.path === pathname && 'custom-active'} nav-link`}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>{prop.name}</p>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className={`nav-item has-treeview ${(drawer(toggle, key, prop.sub, pathname)) && 'menu-open'}`}
                                        key={key}>
                                        <a className="nav-link" href='http://'
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setToggle({show: (toggle.key !== key) ? true : !toggle.show, key})
                                           }}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>
                                                {prop.name}
                                                <i className="fas fa-angle-left right"/>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            {
                                                prop.sub.map((subProp, subKey) => {
                                                    if(subProp.name !== INVISIBLE_MENU_ITEM) {
                                                        return (
                                                            <li className="nav-item" key={subKey}>
                                                                <Link to={subProp.path}
                                                                      className={`${subProp.path === pathname && 'custom-active'} nav-link ml-3`}
                                                                >
                                                                    <i className="far fa-circle nav-icon"/>
                                                                    <p style={{fontSize: 14}}>{subProp.name}</p>
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

const INVISIBLE_MENU_ITEM = 'INVISIBLE_MENU_ITEM';

// Build dashboard menu
function buildDashboardMenu() {
    return {
        name: DASHBOARD_PAGE,
        path: DASHBOARD_PAGE_PATH,
        icon: 'fa fa-tachometer-alt',
        sub: []
    };
}

// Build requests menu
function buildRequestsMenu() {
    return {
        name: REQUESTS,
        icon: 'fa fa-paste',
        sub: [
            {name: REQUESTS_FLEETS_PAGE, path: REQUESTS_FLEETS_PAGE_PATH},
            {name: REQUESTS_CLEARANCES_PAGE, path: REQUESTS_CLEARANCES_PAGE_PATH},

            {name: INVISIBLE_MENU_ITEM, path: REQUESTS_FLEET_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: REQUESTS_CLEARANCE_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`},
            {name: INVISIBLE_MENU_ITEM, path: `${REQUESTS_FLEET_EDIT_PAGE_PATH}/:id`},
        ]
    };
}

// Build operations menu
function buildAuthorisedOperationsMenu() {
    return {
        name: OPERATIONS,
        icon: 'fa fa-exchange',
        sub: [
            {name: OPERATIONS_TRANSFERS_PAGE, path: OPERATIONS_TRANSFERS_PAGE_PATH},
            {name: OPERATIONS_ANONYMOUS_FLEETS_PAGE, path: OPERATIONS_ANONYMOUS_FLEETS_PAGE_PATH},
            {name: OPERATIONS_FLEETS_PAGE, path: OPERATIONS_FLEETS_PAGE_PATH},
            {name: OPERATIONS_CLEARANCES_PAGE, path: OPERATIONS_CLEARANCES_PAGE_PATH},
            {name: OPERATIONS_AFFORDS_PAGE, path: OPERATION_AFFORDS_PAGE_PATH}
        ]
    }
}

// Build recoveries menu
function buildAuthorisedRecoveriesMenu() {
    return {
        name: RECOVERIES,
        icon: 'fa fa-share',
        sub: [
            {name: RECOVERIES_CASH_PAGE, path: RECOVERIES_CASH_PAGE_PATH},
            {name: RECOVERIES_FLEET_PAGE, path: RECOVERIES_FLEETS_PAGE_PATH},
        ]
    }
}

// Build agents menu
function buildAuthorisedAgentsMenu() {
    return {
        name: AGENTS,
        icon: 'fa fa-user-cog',
        sub: [
            {name: ALL_AGENTS_PAGE, path: AGENTS_PAGE_PATH},
            {name: AGENT_NEW_PAGE, path: AGENT_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${AGENT_EDIT_PAGE_PATH}/:id`}
        ]
    };
}

// Build collectors menu
function buildAuthorisedCollectorsMenu() {
    return {
        name: COLLECTORS,
        icon: 'fa fa-user-clock',
        sub: [
            {name: ALL_COLLECTORS_PAGE, path: COLLECTORS_PAGE_PATH},
            {name: COLLECTOR_NEW_PAGE, path: COLLECTOR_NEW_PAGE_PATH},
            {name: COLLECTOR_FLEETS, path: COLLECTOR_FLEETS_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${COLLECTOR_EDIT_PAGE_PATH}/:id`},
        ]
    };
}

// Build sims menu
function buildAuthorisedSimsMenu() {
    return {
        name: SIMS,
        icon: 'fa fa-sim-card',
        sub: [
            {name: ALL_SIMS_PAGE, path: SIMS_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${SIM_EDIT_PAGE_PATH}/:id`}
        ]
    };
}

// Build operators menu
function buildAuthorisedOperatorsMenu() {
    return {
        name: OPERATORS,
        icon: 'fa fa-globe',
        sub: [
            {name: ALL_OPERATORS_PAGE, path: OPERATORS_PAGE_PATH},
            {name: OPERATOR_NEW_PAGE, path: OPERATOR_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${OPERATOR_EDIT_PAGE_PATH}/:id`}
        ]
    };
}

// Build listing menu
function buildAuthorisedListingMenu() {
    return {
        name: LISTING_PAGE,
        path: LISTING_PAGE_PATH,
        icon: 'fa fa-list',
        sub: []
    };
}

// Build zones menu
function buildAuthorisedZonesMenu() {
    return {
        name: ZONES,
        icon: 'fa fa-map',
        sub: [
            {name: ALL_ZONES_PAGE, path: ZONES_PAGE_PATH},
            {name: ZONE_NEW_PAGE, path: ZONE_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${ZONE_EDIT_PAGE_PATH}/:id`},
        ]
    };
}

// Build companies menu
function buildAuthorisedCompaniesMenu() {
    return {
        name: COMPANIES,
        icon: 'fa fa-university',
        sub: [
            {name: ALL_COMPANIES_PAGE, path: COMPANIES_PAGE_PATH},
            {name: COMPANY_NEW_PAGE, path: COMPANY_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${COMPANY_EDIT_PAGE_PATH}/:id`},
        ]
    };
}

// Build users menu
function buildAuthorisedUsersMenu() {
    return {
        name: USERS,
        icon: 'fa fa-users',
        sub: [
            {name: ALL_USERS_PAGE, path: USERS_PAGE_PATH},
            {name: USER_NEW_PAGE, path: USER_NEW_PAGE_PATH},
            {name: INVISIBLE_MENU_ITEM, path: `${USER_EDIT_PAGE_PATH}/:id`},
        ]
    };
}

// Side bar drawer open
function drawer(toggle, key, sub, activePage) {
    let flag = false;
    // Event fired by page loaded
    sub.forEach(item => {
        if(item.path === activePage) flag = true;
    });
    // Event fired by mouse click
    const toggleStatus = (toggle.show && toggle.key === key);
    return (toggleStatus || flag);
}

// Prop types to ensure destroyed props data type
SideBarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
};

// Connect component to Redux
export default React.memo(SideBarComponent);
