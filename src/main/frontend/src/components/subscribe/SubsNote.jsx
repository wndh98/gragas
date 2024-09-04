import './subs.css'
function SubsNote(props) {
    const siSubject = props.siSubject;
    return (
        <div className="subsNote">
            <div className="otherTitle">
                정기 결제 및 배송 안내
            </div>
            <ul className='text-secondary'>
                <li>{siSubject}는 정해진 배송일에 배송됩니다. <br />
                    * 택배사 일정 및 지역에 따라 1~2일의 지연이 발생할 수 있습니다.</li>
                <li>정기 구독 상품은 새벽도착이 불가합니다.</li>
                <li>공휴일 등으로 인해 배송일이 변경될 수 있습니다.</li>
                <li>매월 결제 / 배송일은 홈페이지, 카카오톡 채널 하단의 메뉴, 담화박스 내 큐레이션 카드를 통해 확인하실 수 있습니다.</li>
                <li>구독 신청 시에는 실결제가 진행되지 않으며 구독 결제일에 결제가 진행됩니다.</li>
                <li>정기 결제 성공 이후, 배송지 변경 및 결제 취소 요청은 결제일 당일 오후 12시 이전까지 카카오톡 채널[그라가스]를 통해 문의해주세요.</li>
            </ul>
        </div>
    );
}

export default SubsNote;