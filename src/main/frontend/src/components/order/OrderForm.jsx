import { useForm } from "react-hook-form";
import OrderDeli from "./OrderDeli";
import { getUserId } from "../../js/userInfo";
import { useEffect, useState } from "react";
import OrderCart from "./OrderCart";

function OrderForm(props) {
    const ocId = props.ocId;
    let olId = ocId;
    if (ocId != "" && ocId != null) {
        olId = crypto.randomUUID();
    }
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const userId = getUserId();


    function onSubmit(data) {

    }
    return (

        <div className="mt-5 col-5 border p-4 rounded">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("userId")} />
                <OrderDeli
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    ocId={ocId}
                />
                <OrderCart
                    ocId={ocId}
                />

                <div className="p-5">
                    <input type="submit" className="btn btn-success w-100" value="주문" />
                </div>

            </form>
        </div>
    );
}
export default OrderForm;