
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const SerList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const offset = searchParams.get('offset') || 0;
    const limit = searchParams.get('limit') || 10;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(
            `http://localhost:3000/total/products?_limit=${limit}&_start=${offset}`
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result); // 디버깅을 위해 콘솔에 출력
                if (Array.isArray(result)) {
                    setProducts(result);
                } else {
                    console.error("Unexpected response format:", result);
                    setProducts([]); // 예상치 못한 형식일 경우 빈 배열로 설정
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setProducts([]); // 오류 발생 시 빈 배열로 설정
            });
    }, [offset, limit]);


    const movePage = (pageNumber) => {
        // 1
        searchParams.set('offset', (pageNumber - 1) * 10);
        setSearchParams(searchParams);
    };

    return (
        <section>
            <h1>This is Posts</h1>
            {products.map(({ id, title }) => (
                <article key={id}>
                    <p>
                        <div>id:{id}</div>
                        <div>title:{title}</div>
                    </p>
                </article>
            ))}
            <div>
                <button onClick={() => movePage(1)}>1</button>
                <button onClick={() => movePage(2)}>2</button>
                <button onClick={() => movePage(3)}>3</button>
            </div>
        </section>
    );
};

export default SerList;
