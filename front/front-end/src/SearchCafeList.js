import { useEffect, useState } from "react";
import axios from "axios";
import MapApi from "./MapApi";

export default function SearchCafeList() {

    const [cafeList, setCafeList] = useState([]); // 카페 리스트 상태
    const [coords, setCoords] = useState({ lat: 0, lng: 0 }); // 초기값: 서울 좌표 lat: 37.5665, lng: 126.9780
    const [loading, setLoading] = useState(true); // 로딩 상태

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const success = (position) => {
        const latitude = position.coords.latitude;     // 위도
        const longitude = position.coords.longitude;   // 경도

        setCoords({ lat: latitude, lng: longitude }); // 현재 위치 저장
        console.log("현재 위치: ", latitude, longitude);

        // 현재 위치를 기반으로 카페 리스트 요청
        const data = { latitude, longitude };
        axios
            .post("/search/cafe", data)
            .then((res) => {
                setCafeList(res.data.items); // 서버에서 반환된 카페 리스트 저장
            })
            .catch((err) => console.error(err))
            .finally(() =>
                setLoading(false)
            );
    };

    const error = (err) => {
        console.warn("ERROR(" + err.code + "): " + err.message);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(success, error, options); // 현재 위치 가져오기
    }, []);

    console.log(cafeList + ' 카페');
    console.log(cafeList.length + ' 카페 개수');

    // 위치 미허용 시, 예외 처리.
    if (coords.lat == 0) {
        return (
            <div className="errorMsg">
                <h1>해당 페이지를 이용할 수 없습니다.</h1>
                <p>01. <span className="decoSpan">시스템 설정</span>에서 <span className="decoSpan">위치 허용</span>하기</p>
                <p>02. <span className="decoSpan">웹 브라우저</span>에서 <span className="decoSpan">위치 허용</span>하기</p>
            </div>
        )
    } else {
        return (
            <>
                <div>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>카페 명</th>
                                    <th>위치</th>
                                    <th>사이트</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cafeList.map((ele, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.roadAddress}</td>
                                        <td>
                                            <a href={ele.link} target="_blank" rel="noopener noreferrer">
                                                {ele.link}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <MapApi centerCoords={coords} cafeList={cafeList} />

                <div className="btnDiv">
                    <button className="locationUpdateBtn" onClick={() => {
                        setLoading(true);
                        navigator.geolocation.getCurrentPosition(success, error, options);
                    }}>현재 위치로 업데이트</button>
                </div>
            </>
        );
    }

}