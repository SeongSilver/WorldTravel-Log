import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentModal from "./ContentModal";
import "../../styles/post/contentList.scss";
import { useDispatch } from "react-redux";
import { auth } from "../../_actions/user_actions";

function ContentList({ selectedCountry }) {
  const [contentModal, setContentModal] = useState(false);
  const [contentModalStatus, setContentModalStatus] = useState(false);
  const [cityName, setCityName] = useState("서울인건가");
  const [isLogined, setIsLogined] = useState();

  const dispatch = useDispatch();

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

  const openContentModal = (event) => {
    setContentModal(true);
    setContentModalStatus(true);
    //해당 게시물의 디테일 정보를 가져올 get 연동 할 것들
    //axios.get(어쩌고 저쩌고)
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="contentContainer">
      <h1>다이어리 리스트</h1>
      <div className="contentHeader">
        <h2 className="selectedCountry">{selectedCountry}</h2>
        <div className="postButton">
          {isLogined ? (
            <Link
              to="/postwrite"
              state={{ selectedCountry: selectedCountry }}
              className="postButton"
            >
              <span>다이어리 추가</span>+
            </Link>
          ) : (
            <Link
              to="/login"
              state={{ selectedCountry: selectedCountry }}
              className="postButton"
            >
              <span>다이어리 추가</span>+
            </Link>
          )}
        </div>
      </div>
      <ul className="contentBody">
        <li className="contentCard">
          <span className="cardTag">
            서울에서 얼마나 길어지는지 태에ddd에에그
          </span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">광화문</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">여수</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">속초</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">제주도</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">부산</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
        <li className="contentCard">
          <span className="cardTag">서울</span>
          <div>
            <img
              className="contentImage"
              src={require("../../img/login/loginBg.jpg")}
            />
          </div>
          <p className="cardDate">2022-01-01 ~ 2022-12-31</p>
          <Link to="#" onClick={openContentModal}>
            일기 자세히 보기
          </Link>
        </li>
      </ul>
      {contentModal && (
        <ContentModal
          className="contentModal"
          setContentModal={setContentModal}
          setContentModalStatus={setContentModalStatus}
          contentModalStatus={contentModalStatus}
          cityName={cityName}
        />
      )}
    </div>
  );
}

export default ContentList;
