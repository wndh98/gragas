package com.green.gragas.user.mappers;

import com.green.gragas.user.dto.MemberPoint;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberPointMapper {
    void insertMemberPoint(MemberPoint memberPoint);
}
