package com.interview.financeApi.services;

import com.interview.financeApi.factories.AgreementFactory;
import com.interview.financeApi.factories.UserFactory;
import com.interview.financeApi.models.Agreement;
import com.interview.financeApi.models.User;
import com.interview.financeApi.repositories.AgreementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AgreementServiceTest {

    @Mock
    private AgreementRepository agreementRepository;

    private AgreementService agreementService;
    private final UserFactory userFactory = new UserFactory();
    private final AgreementFactory agreementFactory = new AgreementFactory(userFactory);

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        agreementService = new AgreementService(agreementRepository);
    }

    @Test
    public void testCheckFindAllReturnsAListOfAgreementsIfAnyExist() {
        User user = userFactory.createUser();
        Integer expectedAgreementCount = 2;
        List<Agreement> expectedFinanceAccounts = agreementFactory.createAgreements(expectedAgreementCount, user);
        when(agreementRepository.findByUser_Id(user.getId())).thenReturn(expectedFinanceAccounts);
        List<Agreement> foundFinanceAccounts = agreementService.findByUserId(user.getId());
        assertEquals(foundFinanceAccounts.size(), expectedAgreementCount);
        assertEquals(foundFinanceAccounts, expectedFinanceAccounts);
    }

    @Test
    public void testCheckFindAllReturnsEmptyListOfFinanceAccountsWhenNoneExistForUser() {
        Long nonExistingAccountId = 2L;
        when(agreementRepository.findByUser_Id(nonExistingAccountId)).thenReturn(new ArrayList<>());
        List<Agreement> foundFinanceAccounts = agreementService.findByUserId(nonExistingAccountId);
        assertEquals(foundFinanceAccounts.size(), 0);
    }
}
