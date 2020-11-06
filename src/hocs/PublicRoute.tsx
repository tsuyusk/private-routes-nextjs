import React from 'react';
import withAuthRedirect from './withAuthRedirect';

export default function PublicRoute(WrappedComponent: React.ComponentType, location = '/me') {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: false
  });
}