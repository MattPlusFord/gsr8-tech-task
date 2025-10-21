package com.interview.financeApi.factories;

import com.interview.financeApi.models.Agreement;
import com.interview.financeApi.models.User;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class AgreementFactory {

    @Autowired
    private final UserFactory userFactory;

    private final Random randomGenerator = new Random();

    public Agreement createAgreement() {
        return new Agreement(1L, userFactory.createUser(), generateBalance(), generateInterestRate());
    }

    public Agreement createAgreement(@Nullable Long id, @Nullable User user, @Nullable Float balance, @Nullable Float interestRate) {
        return new Agreement(id, user, balance, interestRate);
    }

    public List<Agreement> createAgreements(Integer numberOfAgreements, @Nullable User user) {
        List<Agreement> agreements = new ArrayList<>();
        if (user != null) {
            user = userFactory.createUser();
        }
        Long nextId = 1L;
        for (int i = 0; i < numberOfAgreements; i++) {
            agreements.add(createAgreement(nextId, user, null, null));
            nextId++;
        }
        return agreements;
    }

    private float generateInterestRate() {
        int interestRateLowerLimit = 2;
        int interestRateUpperLimit = 7;
        return randomGenerator.nextInt(interestRateUpperLimit - interestRateLowerLimit) + interestRateLowerLimit;
    }

    private float generateBalance() {
        int balanceLowerLimit = 5000;
        int balanceUpperLimit = 60000;
        return randomGenerator.nextInt(balanceUpperLimit - balanceLowerLimit) + balanceLowerLimit;
    }
}
