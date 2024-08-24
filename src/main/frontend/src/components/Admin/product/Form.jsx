/* const loc = useNavigate();
function onSubmit(data) {
    axios.post("/product/insert", data)
        .then(response => {
            if (response.data != 0) {
                axios.post("/pevent/insert/" + response.data, [...(data.eiNum)])
                    .then(result => {
                        if (result.data == 1) {
                            alert("성공");
                            loc("/product/main");
                        } else {
                            alert("실패");
                        }
                    });
            } else {
                alert("실패");
            }
        })
    console.log(data)
}
 */