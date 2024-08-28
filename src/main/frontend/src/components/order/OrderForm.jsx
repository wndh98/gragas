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

    useEffect(() => {
        setValue("userId", userId);
        setOrderStep(
            <>
                <OrderDeli
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    setOrderStep={setOrderStep}
                    handleSubmit={handleSubmit}
                    ocId={ocId}
                />
                <OrderCart
                    setOrderStep={setOrderStep}
                    handleSubmit={handleSubmit}
                    ocId={ocId}
                />
            </>
        );
    }, [])
    function onSubmit(data) {

    }
    const [orderStep, setOrderStep] = useState();
    return (

        <div className="mt-5 col-3 ">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("userId")} />
                {orderStep}
                {/* <OrderDeli register={register} errors={errors} setValue={setValue}></OrderDeli> */}

            </form>
        </div>
    );
}
export default OrderForm;