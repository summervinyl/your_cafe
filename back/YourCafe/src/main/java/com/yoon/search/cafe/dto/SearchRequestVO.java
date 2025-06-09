package com.yoon.search.cafe.dto;

import lombok.Data;

@Data
public class SearchRequestVO {
	
	private double latitude; // 위도
	private double longitude; // 경도

//	private LocationData location;
//	
//	@Data
//	public class LocationData {
//		private double latitude;   // 위도
//		private double longitude;  // 경도
//	}

}