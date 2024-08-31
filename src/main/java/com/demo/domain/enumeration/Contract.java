package com.demo.domain.enumeration;

/**
 * This is a contract\ncontract am enum
 */
public enum Contract {
    CDI("Permanent contract"),
    CDD("Fixed-term contract"),
    FREELANCE("Freelance");

    private final String value;

    Contract(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
