package com.yoon.search.cafe.controller;

import java.net.URI;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.yoon.search.cafe.KakaoUtil;
import com.yoon.search.cafe.dto.SearchRequestVO;

import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class SearchController {
	
	@Value("${naver.client-id}")
	private String NAVER_API_ID;

	@Value("${naver.secret}")
	private String NAVER_API_SECRET;
	
	@Value("${kakao.secret}")
	private String kakao_secret;

	private String cafe = "카페";
	
	// http://localhost:8099/api/server/naver/검색어입력
	@PostMapping("/search/cafe")
	@ResponseBody
	public String searchCafe(@RequestBody SearchRequestVO request) {
		
		System.err.println(request.getLatitude());
		System.err.println(request.getLongitude());
		String addrName =  KakaoUtil.getAddressFromCoords(kakao_secret, Double.toString(request.getLongitude()), Double.toString(request.getLatitude()));
		
		System.err.println("현재 주소" + addrName);

	    URI uri = UriComponentsBuilder
	            .fromUriString("https://openapi.naver.com/")
	            .path("v1/search/local.json")
	            .queryParam("query", addrName + cafe) // query=검색어&display=10&start=1&sort=random

	            .queryParam("display", 5)         // 화면에 출력되는 검색 결과 수
	            .queryParam("start", 1)           // 검색 시작 위치
	            .queryParam("sort", "random")	  // 검색 결과 정렬 방법
	            .encode(StandardCharsets.UTF_8)
	            .build()
	            .toUri();

	    RestTemplate restTemplate = new RestTemplate();
	    RequestEntity<Void> req = RequestEntity
	            .get(uri)
	            .header("X-Naver-Client-Id", NAVER_API_ID)
	            .header("X-Naver-Client-Secret", NAVER_API_SECRET)
	            .build();

	    ResponseEntity<String> result = restTemplate.exchange(req, String.class);
	    
	    System.err.println("카페 리스트" + result.getBody());
	    
	    return result.getBody();
	}

}
