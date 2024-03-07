import React, {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

interface Props extends PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute:React.FC<Props> = ({children, isAllowed}) => {

  if(!isAllowed) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;