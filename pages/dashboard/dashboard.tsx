import * as React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faUsers,
  faFilter,
  faChalkboardUser,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
  return (
    <>
      <h3>Dashboard</h3>
      <div className="divider" />
      <div className="flex items-center justify-center align-center">
        <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2">
          <div className="card card-compact border-2">
            <Link href="/recruit">
              <div className="card-body cursor-pointer flex items-center justify-center">
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
                <p className="card-title font-light">Recruit</p>
              </div>
            </Link>
          </div>
          <div className="card card-compact border-2">
            <Link href="/my-teams">
              <div className="card-body cursor-pointer flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} size="2x" />
                <p className="card-title font-light">My Teams</p>
              </div>
            </Link>
          </div>
          <div className="card card-compact border-2">
            <Link href="">
              <div className="card-body cursor-pointer flex items-center justify-center">
                <FontAwesomeIcon icon={faFilter} size="2x" />
                <p className="card-title font-light">Recruitment Funnel</p>
              </div>
            </Link>
          </div>
          <div className="card card-compact border-2">
            <Link href="">
              <div className="card-body cursor-pointer flex items-center justify-center">
                <FontAwesomeIcon icon={faChalkboardUser} size="2x" />
                <p className="card-title font-light">Training</p>
              </div>
            </Link>
          </div>
          <div className="card card-compact border-2">
            <Link href="">
              <div className="card-body cursor-pointer flex items-center justify-center">
                <FontAwesomeIcon icon={faCoins} size="2x" />
                <p className="card-title font-light">Sales</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
