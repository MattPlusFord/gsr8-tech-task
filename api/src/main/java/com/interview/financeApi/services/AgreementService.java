package com.interview.financeApi.services;

import com.interview.financeApi.models.Agreement;
import com.interview.financeApi.models.AgreementSummary;
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
        validateId(userId);
        return agreementRepository.findByUser_Id(userId);
    }

    public AgreementSummary getAgreementSummary(Long userId) {
        List<Agreement> agreements = agreementRepository.findByUser_Id(userId);
        float totalBalance = 0f;
        float totalInterestRate = 0f;
        for (Agreement agreement : agreements) {
            totalBalance += agreement.getBalance();
            totalInterestRate += agreement.getInterestRate();
        }
        float averageInterestRate = agreements.isEmpty() ? 0f : totalInterestRate / agreements.size();
        return new AgreementSummary(agreements.size(), totalBalance, averageInterestRate);
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid ID provided");
        }
    }
}
