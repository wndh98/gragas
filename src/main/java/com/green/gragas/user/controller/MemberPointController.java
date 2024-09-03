package com.green.gragas.user.controller;

import com.green.gragas.user.service.MemberPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberPointController {
    @Autowired
    MemberPointService mps;
}
