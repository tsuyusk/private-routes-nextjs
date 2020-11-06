import React from 'react';
import withAuthRedirect from './withAuthRedirect';

export default function PrivateRoute(WrappedComponent: React.ComponentType, location = '/') {
  return withAuthRedirect({
    WrappedComponent,
    location,
    expectedAuth: true
  });
}