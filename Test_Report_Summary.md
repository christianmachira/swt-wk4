# 🧪 Testing Report for E-Commerce Filter System

**Project:** E-Commerce Filter System  
**Date:** 2025-6-16  
**Group Members:** Stephen Muhoho, Christian Machira, Salma Adam

---

## 1. Expected Behaviors

1. Products should appear or disappear based on the selected price range.
2. Products should appear or disappear based on the selected brand.
3. Only products with storage matching the selected value should be displayed.

---

## 2. Test Strategy

### Black-Box Testing Techniques

| Technique                | Scope                        | Example/Test Case Description                 |
|--------------------------|------------------------------|----------------------------------------------|
| Equivalence Partitioning | Brand, Price, Storage inputs  | Test valid/invalid brands, price ranges      |
| Boundary Value Analysis  | Price, Storage               | Test 64GB, 1024GB, min/max price boundaries  |
| Decision Table Testing   | Filter combinations          | Test combinations of brand + price + storage |

### White-Box Testing Techniques

| Coverage Type   | Target Function(s)     | Tool/Method | Coverage (%) |
|-----------------|-----------------------|-------------|--------------|
| Statement       | applyFilters()        | Manual      | 100%         |
| Decision        | renderProducts()      | Manual      | 100%          |

---

---

## Decision Table: E-commerce Product Filter

This table outlines the expected behavior of the product filter system based on various combinations of user inputs for Brand, Price Range, and Storage.

| Rule | Brand         | Price Range      | Storage (GB) | Expected Action (Filtered Products)                                  |
| :--- | :------------ | :--------------- | :----------- | :------------------------------------------------------------------- |
| **1**| -             | -                | -            | Render All Products                                                  |
| **2**| Apple         | -                | -            | Render Apple Products (iPhone 13, iPhone SE, iPhone 14 Pro)          |
| **3**| -             | \$0 - \$500      | -            | Render Products \$0-\$500 (iPhone SE)                                |
| **4**| -             | -                | 128          | Render Products 128GB (iPhone 13, Pixel 6)                           |
| **5**| Apple         | \$0 - \$500      | -            | Render Apple Products \$0-\$500 (iPhone SE)                          |
| **6**| Samsung       | \$500 - \$1000   | -            | Render Samsung Products \$500-\$1000 (Galaxy S22)                    |
| **7**| Google        | -                | 128          | Render Google Products 128GB (Pixel 6)                               |
| **8**| -             | \$500 - \$1000   | 256          | Render Products \$500-\$1000 & 256GB (Galaxy S22)                    |
| **9**| Apple         | -                | 64           | Render Apple Products 64GB (iPhone SE)                               |
| **10**| Samsung       | \$0 - \$500      | -            | Display "No products match" message                                  |
| **11**| Apple         | \$1000 - \$1500  | 1024         | Render Apple Products \$1000-\$1500 & 1024GB (iPhone 14 Pro)         |
| **12**| Apple         | \$500 - \$1000   | 256          | Display "No products match" message                                  |
| **13**| Any/Invalid   | -                | < 64 or > 1024 | Display "Storage must be between 64-1024 GB" error message           |
| **14**| -             | -                | Valid & no match | Display "No products match" message                                  |

## 3. Group Member Contributions

| Member    | Black-Box Techniques Applied          | White-Box Techniques Applied         | Other Contributions                |
|-----------|--------------------------------------|-------------------------------------|------------------------------------|
| Stephen Muhoho  | Equivalence Partitioning: tested all brand and price ranges | Statement coverage: tested all lines in applyFilters() | Wrote bug report #12               |
| Christian Machira  | Boundary Value Analysis: tested min/max storage and price | Decision coverage: tested if/else in renderProducts() | Documented test cases, summary     |
| Salma Adam  | Decision Table: created filter combination matrix | Reviewed code paths and edge cases | Wrote bug report #14, reflections  |

*Each member should briefly describe their specific efforts and the techniques they applied.*

---

## 4. Defect Log & GitHub Issues

### Linked GitHub Issues

- [#1: Filter class-boundary issue](https://github.com/PLP-Database-Design/week-4-christianmachira/issues/1) 
- [#2: Title displaying incorrectly](https://github.com/PLP-Database-Design/week-4-christianmachira/issues/2) 

### Bug Report 1

**Title**: Filter class-boundary issue

**Steps to Reproduce**:
1. Select price range "1000-1500"
2. Click "Apply Filters"

**Expected**: Should display iPhone 14 Pro ($1499)  
**Actual**: No products displayed  
**Severity**: Medium

---

### Bug Report 2

**Title**: title displaying incorrectly

**Steps to Reproduce**:

1. launch the app
2. Highlight the title

**Expected**: Should display "📱 SmartPhone Hub"
**Actual**: SmartPhone Hub
**Severity**: Low

---

## 5. Reflection

**Challenges Faced:**  
- Making sure the test covered all aspects of the code
- Configuration of tests gave me a bit of a problem since i had to reconfigure the file structure a bit

**Collaboration Benefits:**  
- Group discussions helped plan how to split the work and communicate efficiently
- Sharing our test cases and discussing our outcomes really helped

**Most Effective Techniques:**  
- the storage input boundary value analysis test was most useful since it covered a large scope
- decision table testing was also useful in helping us to know what to expect

---

## 6. Coverage Gaps (Optional Visualization)


## 5. Coverage Gaps (Optional Visualization)
![mermaidjs](https://github.com/user-attachments/assets/3f0e2915-2256-42be-b3ba-40b0ce0413cc)

---

*End of Report*
