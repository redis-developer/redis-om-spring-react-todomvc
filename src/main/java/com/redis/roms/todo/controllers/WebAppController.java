package com.redis.roms.todo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebAppController {
    @GetMapping
    public String index() {
        return "index";
    }
}
