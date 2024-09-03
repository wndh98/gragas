package com.green.gragas.subscribe.controller;

import com.green.gragas.subscribe.dto.SubscribePayment;
import com.green.gragas.subscribe.service.SubscribePMService;
import org.apache.ibatis.type.Alias;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class SubscribePMController {
    @Autowired
    private SubscribePMService spms;


}
