package com.interview.financeApi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Agreement {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Float balance;
    public Float interestRate;

    public Agreement() {}

    public Agreement(Long id, User user, Float balance, Float interestRate) {
        this.id = id;
        this.user = user;
        this.balance = balance;
        this.interestRate = interestRate;
    }

}
