import 'subs.css';
import { useForm } from "react-hook-form";

function SubsOrder(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)></form>
        </div>
    );
}

export default SubsOrder;