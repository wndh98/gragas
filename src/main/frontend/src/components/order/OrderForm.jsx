import { useForm } from "react-hook-form";
import OrderDeli from "./OrderDeli";
import { getUser, getUserId } from "../../js/userInfo";
import { useEffect, useState } from "react";
import OrderCart from "./OrderCart";
import OrderPayment from "./OrderPayment";
import axios from "axios";

function OrderForm(props) {
    const ocId = props.ocId;
    const deliveryPrice = 1000;
    const [user, setUser] = useState({});
    const [amount, setAmount] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCnt, setTotalCnt] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const { register, watch, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    let olId = ocId;
    useEffect(async () => {
        getUser(setUser);

        setValue("olId", olId)
        setValue("olPayment", "card")
    }, [])
    useEffect(() => {
        setValue("userId", user.userId);
    }, [user])

    async function onSubmit(data) {
        data.olPrice = productPrice;
        data.olCnt = totalCnt;
        data.olDeli = deliveryPrice;
        data.olPoint = data.usePoint;
        data.olUseCoupon = data.useCoupon ? "Y" : "N";
        data.olPay = amount.value;
        try {
            const response = await axios.post("/preOrder/insert", data);
            return response.data;
        } catch (err) {
            console.log(err); return false;
        }
    }

    return (

        <div className="mt-5 col-5 border p-4 rounded">
            <form onSubmit={handleSubmit(onSubmit)} id="frm">
                <input type="hidden" {...register("userId")} />
                <input type="hidden" {...register("olId")} />
                <input type="hidden" {...register("olPayment")} />

                <OrderDeli
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    ocId={ocId}
                />
                <OrderCart
                    ocId={ocId}
                    register={register}
                    user={user}
                    watch={watch}
                    setValue={setValue}
                    amount={amount}
                    setAmount={setAmount}
                    deliveryPrice={deliveryPrice}
                    totalPrice={totalPrice}
                    getValues={getValues}
                    setTotalCnt={setTotalCnt}
                    productPrice={productPrice}
                />
                <OrderPayment
                    olId={olId}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    amount={amount}
                    setAmount={setAmount}
                    deliveryPrice={deliveryPrice}
                    setTotalPrice={setTotalPrice}
                    setProductPrice={setProductPrice}
                ></OrderPayment>


            </form>
        </div>
    );
}
export default OrderForm;