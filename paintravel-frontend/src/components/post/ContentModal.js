import React from "react";
import "../../styles/post/contentModal.scss";
import { Link } from "react-router-dom";
import { AiFillCloseCircle, AiOutlineMinus } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";
import Loading from "../common/Loading";
import axios from "axios";
import Slider from "react-slick";
import "../../styles/post/modalSlickCarousel/slick-theme.css";
import "../../styles/post/modalSlickCarousel/slick.css";

function ContentModal({ modalData, setOpenPostModal }) {
  const closeModal = () => {
    setOpenPostModal(false);
  };

  const postDeleteHandler = () => {
    const deletePostInfo = {
      currentId: modalData.writer,
      post_id: modalData._id,
    };
    // const reloadVisitedData = {
    //   currentId: JSON.parse(sessionStorage.getItem("LOGINEDID")).value,
    // };
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      axios
        .post("api/post/getPostDelete", deletePostInfo)
        .then((response) => {
          console.log("게시물 삭제 성공");
          console.log(response);
          location.reload();
        })
        .catch((error) => {
          console.log("게시물 삭제 실패");
          console.log(error);
        });
    } else {
      alert("삭제를 취소합니다");
    }
  };

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {!modalData ? (
        <Loading />
      ) : (
        <div className="modalContainer" id="modalContainer">
          <div className="modalDiv">
            <div className="modalHeader">
              <h1>{modalData.title}</h1>
              <hr />
              <div className="modalHeaderBottom">
                <h2>{modalData.location}</h2>
                <div className="modalDate">
                  <span>
                    {new Date(modalData.fromDate).toLocaleDateString()}
                  </span>
                  <span>&emsp;~&emsp;</span>
                  <span>{new Date(modalData.toDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="modalBody">
              <Slider {...slickSettings}>
                {modalData.file.map((image, index) => (
                  <div key={index}>
                    <figure>
                      <img src={`/upload/${image}`} alt="이미지" />
                    </figure>
                    <img src={`/upload/${image}`} alt="이미지 배경" />
                  </div>
                ))}
              </Slider>
              <pre>{modalData.content}</pre>
            </div>
            <div className="modalFooter">
              <Link
                to="/postEdit"
                className="postEditBtn"
                state={{
                  selectedCountry: modalData.country,
                  nationCode: modalData.nationCode,
                  _id: modalData._id,
                  writer: modalData.writer,
                }}>
                수정하기&nbsp;
                <BiEdit />
              </Link>
              <a
                href="#"
                className="deleteBtn"
                onClick={postDeleteHandler}
                style={{ zIndex: "999", cursor: "pointer" }}>
                삭제하기&nbsp;
                <BiTrash />
              </a>
            </div>
            <a href="#" onClick={closeModal} className="modalCloseBtn">
              <AiFillCloseCircle />
              <span>닫기</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentModal;
