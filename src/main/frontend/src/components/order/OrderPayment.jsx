import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import { getUser } from "../../js/userInfo";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

function OrderPayment(props) {
    const olId = props.olId;
    const handleSubmit = props.handleSubmit;
    const onSubmit = props.onSubmit;
    const amount = props.amount;
    const setAmount = props.setAmount;
    const deliveryPrice = props.deliveryPrice;
    const setTotalPrice = props.setTotalPrice;
    const setProductPrice = props.setProductPrice;
    const [widgets, setWidgets] = useState(null);

    const [user, setUser] = useState({});
    const [productName, setProductName] = useState({});

    useEffect(() => {
        getUser(setUser);
    }, []);
    useEffect(() => {
        async function fetchPaymentWidgets() {
            const tossPayments = await loadTossPayments(clientKey);
            const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
            const getPrice = await axios.get(`/orderCart/totalPrice?ocId=${olId}`);
            const getProduct = await axios.get(`/orderCart/getProductName?ocId=${olId}`);
            setAmount({ currency: "KRW", value: getPrice.data + deliveryPrice });
            setProductPrice(getPrice.data);
            setTotalPrice(getPrice.data + deliveryPrice);
            setProductName(getProduct.data + "");
            setWidgets(widgets);
        }
        fetchPaymentWidgets();
    }, [clientKey]);
    useEffect(() => {
        if (widgets == null) {
            return;
        }
        widgets.setAmount(amount);
    }, [amount])
    useEffect(() => {
        async function renderPaymentWidgets() {
            if (widgets == null) {
                return;
            }
            /**
             * 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
             * renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
             * @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
             */
            await widgets.setAmount(amount);

            await Promise.all([
                /**
                 * 결제창을 렌더링합니다.
                 * @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
                 */
                widgets.renderPaymentMethods({
                    selector: "#payment-method",
                    // 렌더링하고 싶은 결제 UI의 variantKey
                    // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
                    // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
                    variantKey: "DEFAULT",
                }),
                /**
                 * 약관을 렌더링합니다.
                 * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
                 */
                widgets.renderAgreement({
                    selector: "#agreement",
                    variantKey: "AGREEMENT",
                }),
            ]);
        }

        renderPaymentWidgets();
    }, [widgets]);
    return (
        <div className="wrapper w-100">
            <div className="max-w-540 w-100">
                <div id="payment-method" className="w-100" />
                <div id="agreement" className="w-100" />
                <div className="btn-wrapper w-100">
                    <div className="p-5">
                        <button type="button" className="btn btn-success w-100"
                            onClick={async () => {
                                // handleSubmit을 통해 onSubmit을 호출하고, 폼이 유효한 경우에만 결제 요청을 실행합니다.
                                handleSubmit(async (data) => {
                                    try {
                                        // 먼저 onSubmit 핸들러의 작업을 실행합니다.
                                        const isSuccess = await onSubmit(data);
                                        if (isSuccess != 1) { alert("다시시도하여주세요."); return; }
                                        // onSubmit 이후에 결제 요청을 보냅니다.
                                        await widgets?.requestPayment({
                                            orderId: olId,
                                            orderName: productName,
                                            customerName: user.userName,
                                            customerEmail: user.userId,
                                            successUrl: window.location.origin + "/order/success" + window.location.search,
                                            failUrl: window.location.origin + "/order/fail" + window.location.search,
                                        });
                                    } catch (error) {
                                        console.log(error);
                                        alert("실패하였습니다.다시 시도해주세요.");
                                        // TODO: 에러 처리
                                    }
                                })();
                            }}
                        >
                            주문
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderPayment;