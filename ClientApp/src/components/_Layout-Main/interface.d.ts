import * as React from 'react'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export = ILayoutMain;
export as namespace ILayoutMain;

declare namespace ILayoutMain {
    export interface Menu {
        icon?: string;
        label: string;
        to?: string;
        active?: boolean;
        children?: Array<Menu>
    }
}