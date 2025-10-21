package com.interview.financeApi.controllers;

import com.interview.financeApi.models.Agreement;
import com.interview.financeApi.services.AgreementService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.interview.financeApi.utils.AppConstants.X_USER_ID;

@RestController
@AllArgsConstructor
public class AgreementController {
    private final AgreementService agreementService;

    @GetMapping("/users/agreements")
    public ResponseEntity<List<Agreement>> loadAccount(@RequestHeader(name = X_USER_ID) Long userId) {
        List<Agreement> financeAccount = agreementService.findByUserId(userId);
        return ResponseEntity.ok().body(financeAccount);
    }
}
