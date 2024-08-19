import React from "react";
import Main from "./Main";



const pictures = [
    {
        id: 1,
        img: 'https://d38cxpfv0ljg7q.cloudfront.net/admin_contents/origin/WVnH-1721969714247-medal.png',

    },
    {
        id: 2,
        img: 'https://www.sooldamhwa.com/images/common/icon_AI.png',
    },

];

function MainList(props) {

    return (
        <div>
            {pictures.map((picture) => {
                return (
                    <Main img={picture.img} />

                );
            })}

        </div>
    );
}
export default MainList;
