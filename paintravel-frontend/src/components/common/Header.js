import React, { useState, useEffect } from "react";
import "../../styles/common/header.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../_actions/user_actions";
import { logoutUser } from "../../_actions/user_actions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogined, setIsLogined] = useState();

  useEffect(() => {
    dispatch(auth()).then((response) => {
      if (!response.payload.isAuth) {
        //로그인 안된 경우
        setIsLogined(false);
      } else {
        setIsLogined(true);
      }
    });
  }, []);

  const onClickHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.logoutSucess) {
        navigate("/Login");
      } else {
        alert("로그인아웃 실패..!");
      }
    });
  };
  return (
    <header className="header">
      <div className="headerWrapper">
        <div className="skipNav">
          <Link to="/">본문바로가기</Link>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={require("../../img/common/logo.png")} alt="logo" />
          </Link>
        </div>
        <div className="headerRight">
          <Link to="/mypage" className="headLink">
            My page
          </Link>
          {isLogined ? (
            <span className="headLink" onClick={onClickHandler}>
              Logout
            </span>
          ) : (
            <Link to="/Login" className="headLink">
              sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
