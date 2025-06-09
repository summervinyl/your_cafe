package com.yoon.search.cafe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RestController {

	@RequestMapping(value = "/test/hello")
	@ResponseBody
	public String helloRuckus(Model model) {
		return "ㅠㅠ 제발..";
	}
	
}