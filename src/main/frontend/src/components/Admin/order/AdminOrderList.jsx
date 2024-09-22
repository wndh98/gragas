import { useEffect, useState } from "react";

function AdminOrderList() {
    const [orderList, setOrderList] = useState();

    useEffect(
        ()=>{
            
        },[]
    );
    return (
        <main className="container">
            <div className="mt-5 text-center">
                <table className="table mt-5 table-bordered">
                    <thead>
                        <tr className="table-secondary text-center">
                            <th>주문번호</th>
                            <th>결제금액</th>
                            <th>개수</th>
                            <th>배송비</th>
                            <th>배송지</th>
                            <th>배송 메모</th>
                            <th>주문날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList == null ?
                            <tr>
                                <td colSpan={7}>주문내역이 없습니다.</td>
                            </tr>
                            :
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </main>
    )
}
export default AdminOrderList;