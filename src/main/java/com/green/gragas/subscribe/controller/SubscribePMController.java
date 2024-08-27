package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.service.SubscribePMService;
import org.apache.ibatis.type.Alias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;

@Controller
public class SubscribePMController {
    @Autowired
    private SubscribePMService spms;

    @PostMapping("/subscribe/virtualAccountCreat")
    public String createVirtualAccount() throws IOException, InterruptedException {
        return spms.createVirtualAccount();
    }
}
