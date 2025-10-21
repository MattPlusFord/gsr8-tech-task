package com.interview.financeApi.repositories;

import com.interview.financeApi.models.Agreement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.*;

import java.util.List;

@Repository
public interface AgreementRepository extends JpaRepository<Agreement, Long> {
    List<Agreement> findByUser_Id(Long userId);
}
