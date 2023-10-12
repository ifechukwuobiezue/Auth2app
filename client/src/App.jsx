import "./app.css";
import { BrowserRouter, Link } from "react-router-dom";
import { useEffect, useState } from "react";

//Navbar Component
const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link to="https://semaphoreci.com/" target="blank">
          <img src="logo.png" height="25" width="150" alt="semaphore logo" />
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src={user.photos[0].value} alt="" className="avatar" />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <>Login</>
      )}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        {user ? (
          <center>
            <p>
              <b>Name: </b>
              {user.displayName}
            </p>
            <p>
              <b>UserName: </b>
              {user.username}
            </p>
            <p>
              <b>User Email:</b> {user.emails[0].value}
            </p>
            <img
              src={user.photos[0].value}
              alt=""
              width="100px"
              height="100px"
            />
          </center>
        ) : (
          <>
            <div className="login">
              <img
                width="500"
                src="login.png"
                alt=""
                onClick={() => {
                  window.open("http://localhost:5000/auth/github", "_self");
                }}
              />
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
