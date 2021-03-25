import React from 'react';
import Preloader from "../components/common/prelodaer/Preloader";

export const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
      </React.Suspense>
    )
  }
}
