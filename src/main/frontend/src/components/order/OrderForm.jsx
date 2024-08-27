import { useForm } from "react-hook-form";
import OrderDeli from "./OrderDeli";
import { getUserId } from "../../js/userInfo";
import { useEffect, useState } from "react";

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
        setOrderStep(<OrderDeli register={register} errors={errors} setValue={setValue} setOrderStep={setOrderStep} handleSubmit={handleSubmit} ocId={ocId}></OrderDeli>);
    }, [])
    function onSubmit() {

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