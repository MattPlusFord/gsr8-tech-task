package com.interview.financeApi.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AgreementSummary {
    private int totalAgreements;
    private Float totalBalance;
    private Float averageInterestRate;
}
