import { useRouter } from 'next/router';
import Spinner from 'react-spinner';

import { useAuth } from '../hooks/auth';

export default function withAuthRedirect({
  WrappedComponent,
  expectedAuth,
  location
}) {
  const WithAuthRedirectWrapper = props => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuth();
    if (isLoading) {
      return <Spinner  />;
    }
    if (process.browser && expectedAuth !== isAuthenticated) {
      router.push(location);
      return <></>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuthRedirectWrapper;
}