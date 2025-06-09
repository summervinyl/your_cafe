package com.yoon.search.cafe;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.yoon.search.cafe.**.mapper")
public class YourCafeApplication {

	public static void main(String[] args) {
		SpringApplication.run(YourCafeApplication.class, args);
	}

}
