import { useForm } from "react-hook-form";
import OrderDeli from "./OrderDeli";
import { getUser, getUserId } from "../../js/userInfo";
import { useEffect, useState } from "react";
import OrderCart from "./OrderCart";
import OrderPayment from "./OrderPayment";
import axios from "axios";

function OrderForm(props) {
    const ocId = props.ocId;
    const [user, setUser] = useState({});
    const [amount, setAmount] = useState({});
    const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm();
    let olId = ocId;
    useEffect(async () => {
        getUser(setUser);

        setValue("olId", olId)
        setValue("olPayment", "card")
    }, [])
    useEffect(() => {
        setValue("userId", user.userId);
    }, [user])

    function onSubmit(data) {
        axios.post("/preOrder/insert", data)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(e => { console.log(e) })
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
                />
                <OrderPayment
                    olId={olId}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    amount={amount}
                    setAmount={setAmount}
                ></OrderPayment>


            </form>
        </div>
    );
}
export default OrderForm;