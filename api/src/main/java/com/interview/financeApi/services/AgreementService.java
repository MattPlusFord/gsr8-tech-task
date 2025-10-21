package com.interview.financeApi.services;

import com.interview.financeApi.models.Agreement;
import com.interview.financeApi.repositories.AgreementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgreementService {
    private final AgreementRepository agreementRepository;

    @Autowired
    public AgreementService(AgreementRepository agreementRepository) {
        this.agreementRepository = agreementRepository;
    }

    public List<Agreement> findByUserId(Long userId) {
        return agreementRepository.findByUser_Id(userId);
    }
}
