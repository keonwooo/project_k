package com.kwfw.base.web.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class viewController {

    @GetMapping("/")
    public String mainView() {
        return "main/main";
        
    }
}