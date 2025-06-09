import React, { useEffect, useState } from "react";

const MapApi = ({ centerCoords, cafeList }) => {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]); // 마커 상태 관리

    // 카카오 지도 초기화
    useEffect(() => {
        // 스크립트가 이미 로드된 경우 중복 로드 방지
        if (!document.querySelector("script[src='https://dapi.kakao.com/v2/maps/sdk.js?appkey=ce9443511aff825882b4b057395999cc&autoload=false']")) {
            const script = document.createElement("script");
            script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ce9443511aff825882b4b057395999cc&autoload=false"; // API 키 입력
            script.async = true;

            script.onload = () => {
                // API 로드 완료 후 지도 초기화
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(centerCoords.lat, centerCoords.lng),
                        level: 4, // 줌 레벨
                    };

                    const kakaoMap = new window.kakao.maps.Map(container, options);
                    setMap(kakaoMap); // 지도 객체 저장
                });
            };

            document.head.appendChild(script); // 스크립트 추가
        }
    }, []);

    // cafeList 변경 시 지도에 마커 추가
    useEffect(() => {
        if (map && cafeList) {
            // 기존 마커 제거
            markers.forEach((marker) => marker.setMap(null));

            // 내 위치로 지도 이동
            const moveLatLng = new window.kakao.maps.LatLng(centerCoords.lat, centerCoords.lng);

            map.setCenter(moveLatLng);

            // 내 위치 마커 추가
            const redMarkerImage = new window.kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 빨간색 마커 이미지 URL
                new window.kakao.maps.Size(24, 35), // 이미지 크기
                { offset: new window.kakao.maps.Point(12, 35) } // 이미지 중심 좌표
            );
            const markerPosition = new window.kakao.maps.LatLng(centerCoords.lat, centerCoords.lng);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: redMarkerImage,
            });
            marker.setMap(map);

            // 마커 바운더리 저장할 객체 생성
            const bounds = new window.kakao.maps.LatLngBounds();

            // 새로운 마커 추가
            const newMarkers = cafeList.map((cafe) => {
                let latitude = cafe.mapy.slice(0, 2) + "." + cafe.mapy.slice(2)
                let longtitude = cafe.mapx.slice(0, 3) + "." + cafe.mapx.slice(3)

                const markerPosition = new window.kakao.maps.LatLng(parseFloat(latitude), parseFloat(longtitude));
                bounds.extend(markerPosition);

                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map); // 지도에 마커 추가

                return marker;
            });

            setMarkers(newMarkers); // 마커 상태 저장

            map.setBounds(bounds); // 마커가 지도 안에 들어가도록 지도 뷰 변경
        }
    }, [map, cafeList]);

    return <div id="map" style={{ width: "100%", height: "400px" }} />; // 지도 컨테이너
};

export default MapApi;
