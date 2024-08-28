import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { getCookie } from '../../js/cookieJs';

import OrderForm from "./OrderForm";
import { getUserId } from "../../js/userInfo";
function OrderFormLayout() {
    const pathParam = useParams();
    const ocId = pathParam.ocId;

    return (
        <main className="container d-flex justify-content-center">
            <OrderForm ocId={ocId}></OrderForm>
        </main>
    );
}

export default OrderFormLayout;