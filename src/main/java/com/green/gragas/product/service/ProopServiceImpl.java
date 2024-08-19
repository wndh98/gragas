package com.green.gragas.product.service;

import com.green.gragas.product.mappers.ProopMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProopServiceImpl implements ProopService{
    @Autowired
    ProopMapper om;

}
