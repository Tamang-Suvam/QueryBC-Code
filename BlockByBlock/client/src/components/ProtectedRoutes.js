import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// // receives component and any other props represented by ...rest
// export default function ProtectedRoutes({ component: Component, ...rest }) {
//   const cookies = new Cookies();
//   // get cookie from browser if logged in
//   const token = cookies.get("TOKEN");

//   return (
//     // <Routes>
//     <Route
//       {...rest}
//       render={(props) => {
//         // return token?<Component {...props} />: <Navigate to="/"/>

//         // returns route if there is a valid token set in the cookie
//         if (token) {
//           return <Component {...props} />;
//         } else {
//           // returns the user to the landing page if there is no valid token set
//           return (
//             <Navigate
//               to={{
//                 pathname: "/",
//                 state: {
//                   // sets the location a user was about to access before being redirected to login
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//     // </Routes>
//   );
// }

// receives component and any other props represented by ...rest
export default function ProtectedRoutes({Component}) {
    const cookies = new Cookies();
    // get cookie from browser if logged in
    const token = cookies.get("TOKEN");
  
    return (
      // <Routes>
      <Route
        // {...rest}
        // render={(props) => {
          // return token?<Component {...props} />: <Navigate to="/"/>
          render = { () => {
          // returns route if there is a valid token set in the cookie
          if (token) {
            return <Component/>;
          } else {
            // returns the user to the landing page if there is no valid token set
            return (
              <Navigate
                to={{
                  pathname: "/",
                //   state: {
                //     // sets the location a user was about to access before being redirected to login
                //     from: props.location,
                //   },
                }}
              />
            );
          }
        }}
      />
    );
  }
