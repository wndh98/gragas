package com.green.gragas.user.service;

import com.green.gragas.user.dto.MemberPoint;
import com.green.gragas.user.mappers.MemberPointMapper;
import com.green.gragas.user.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberPointServiceImpl implements MemberPointService{
    @Autowired
    MemberPointMapper mpm;
    @Autowired
    UserMapper um;
    @Override
    public void usePoint(MemberPoint memberPoint) {
        um.updatePoint(memberPoint);
        mpm.insertMemberPoint(memberPoint);
    }
}
