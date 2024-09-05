import './subs.css';
import '../../js/addressInsert';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { getCookie } from '../../js/cookieJs';
import execDaumPostcode from '../../js/addressInsert';
import LoginForm from '../user/login/LoginForm';
function SubsOrder() {
    const navigate = useNavigate();

    function LoginForm() {
        navigate('/mypage/userAddr/input');
    }
    return (
        <div>
            <div className="soBox">
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <button className='otherButton btn btn-outline-secondary mt-4' onClick={() => LoginForm()}>배송지 추가하기</button>
                </div>
            </div>
        </div>
    );
}

export default SubsOrder;