# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> Full Inheritance Plan Flow
- Location: e2e.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Create Plan')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - navigation [ref=e7]:
        - generic [ref=e8]:
          - button "Logo" [ref=e10] [cursor=pointer]:
            - img "Logo" [ref=e11]
          - generic [ref=e12]: CIP
        - generic [ref=e13]:
          - generic [ref=e14]:
            - link "How it Works" [ref=e15] [cursor=pointer]:
              - /url: "#core-capabilities"
            - link "TaxCore" [ref=e16] [cursor=pointer]:
              - /url: "#taxcore-intelligence"
            - link "Pricing" [ref=e17] [cursor=pointer]:
              - /url: "#pricing"
            - link "Enterprise" [ref=e18] [cursor=pointer]:
              - /url: /login
          - button "Launch App" [ref=e20] [cursor=pointer]
    - generic [ref=e21]:
      - img "Home Background" [ref=e22]
      - generic [ref=e24]:
        - generic [ref=e25]:
          - heading "Secure Your Digital Legacy" [level=2] [ref=e26]
          - paragraph [ref=e27]: Automated, non-custodial inheritance for the multi-chain future. Ensure your assets reach your beneficiaries safely, securely, and tax-efficiently.
        - generic [ref=e28]:
          - button "Start Plan" [ref=e29] [cursor=pointer]
          - button "View Demo" [ref=e30] [cursor=pointer]:
            - img
            - text: View Demo
    - generic [ref=e33]:
      - paragraph [ref=e34]: Securing Assets On Top Chains
      - generic [ref=e35]:
        - generic [ref=e36]:
          - img "BNB Chain" [ref=e37]
          - generic [ref=e38]: BNB Chain
        - generic [ref=e39]:
          - img "Polygon" [ref=e40]
          - generic [ref=e41]: Polygon
        - generic [ref=e42]:
          - img "Ethereum" [ref=e43]
          - generic [ref=e44]: Ethereum
        - generic [ref=e45]:
          - img "Solana" [ref=e46]
          - generic [ref=e47]: Solana
    - generic [ref=e50]:
      - generic [ref=e51]:
        - heading "Core Capabilities" [level=2] [ref=e52]
        - paragraph [ref=e53]: Built for security and autonomy across multiple blockchains, ensuring your plan executes exactly as intended.
      - generic [ref=e54]:
        - generic [ref=e56]:
          - heading "Dead Man's Switch" [level=3] [ref=e58]
          - paragraph [ref=e59]: Automated triggers based on wallet inactivity or oracle verification. Customizable heartbeat periods from 3 months to 5 years.
        - generic [ref=e61]:
          - heading "Beneficiary KYB" [level=3] [ref=e63]
          - paragraph [ref=e64]: Integrated Know Your Beneficiary compliance checks ensure assets are only transferred to verified identities, meeting global regulatory standards.
        - generic [ref=e66]:
          - heading "Asset Aggregation" [level=3] [ref=e68]
          - paragraph [ref=e69]: Consolidate assets from multiple wallets and chains into a single abstract smart account for unified distribution.
    - generic [ref=e73]:
      - generic [ref=e74]:
        - generic [ref=e75]:
          - generic [ref=e76]: Infrastructure for Accountants
          - heading "TaxCore Intelligence" [level=2] [ref=e77]
          - paragraph [ref=e78]: TaxCore isn't just a calculator; it's a full compliance suite. It integrates real-time transaction analysis, automatic capital gains calculation, and multi-jurisdiction tax rules to prepare accountant-ready documentation.
        - generic [ref=e79]:
          - generic [ref=e80]:
            - 'heading "Before: Smart Planning" [level=3] [ref=e81]'
            - paragraph [ref=e82]: Identify tax obligations based on beneficiary residency. Preliminary tax summary estimation.
          - generic [ref=e83]:
            - 'heading "During: Execution Tracking" [level=3] [ref=e84]'
            - paragraph [ref=e85]: Real-time snapshotting of asset values at time of transfer. Freezing cost-basis for accurate gains reporting.
          - generic [ref=e86]:
            - 'heading "After: Compliance & Reporting" [level=3] [ref=e87]'
            - paragraph [ref=e88]: Automated PDF generation for tax authorities. Post-distribution summaries for beneficiaries.
      - generic [ref=e89]:
        - generic [ref=e91]:
          - generic [ref=e94]: TaxCore CalculatorIcon
          - generic [ref=e95]: Export PDF
        - generic [ref=e96]:
          - generic [ref=e97]:
            - generic [ref=e98]:
              - text: Origin Jurisdiction
              - generic [ref=e99]: United Kingdom
            - generic [ref=e100]:
              - text: Beneficiary Residency
              - generic [ref=e101]: Germany
          - generic [ref=e102]:
            - generic [ref=e104]:
              - paragraph [ref=e105]: Est. Capital Gains
              - paragraph [ref=e106]: $142,050.00
              - generic [ref=e108]: +12% since inception
            - generic [ref=e110]:
              - paragraph [ref=e111]: Inheritance Tax
              - paragraph [ref=e112]: $56,820.00
              - paragraph [ref=e113]: "Rate: 40% (Above Threshold)"
          - generic [ref=e115]:
            - paragraph [ref=e116]: TaxCore AI Insight
            - paragraph [ref=e117]: Based on the double taxation treaty between UK and Germany, the beneficiary may claim credit for tax paid in the UK.
          - button "Generate Preliminary Report" [ref=e118] [cursor=pointer]
    - generic [ref=e121]:
      - generic [ref=e123]:
        - heading "Children's Trust Accounts" [level=3] [ref=e125]
        - paragraph [ref=e126]: Create time-locked vaults for minor beneficiaries. Set automated drip-feeds for tuition or monthly allowances unlocked only after specific dates or milestones.
        - generic [ref=e127]:
          - generic [ref=e129]: 18th Birthday Release
          - generic [ref=e131]: Tuition Direct-Pay
      - generic [ref=e134]:
        - heading "MPC Security Architecture" [level=3] [ref=e136]
        - paragraph [ref=e137]: We use Multi-Party Computation to shard private keys. No single entity—including us—can access your funds. Recovery requires a threshold of shards.
        - generic [ref=e138]:
          - generic [ref=e140]: Non-custodial by design
          - generic [ref=e142]: SOC 2 Type II Audited
    - generic [ref=e146]:
      - generic [ref=e147]:
        - heading "Simple Pricing for Peace of Mind" [level=2] [ref=e148]
        - paragraph [ref=e149]: Choose the plan that fits your estate complexity.
      - generic [ref=e150]:
        - generic [ref=e152]:
          - generic [ref=e153]:
            - heading "Starter" [level=3] [ref=e154]
            - paragraph [ref=e155]: For single-chain assets.
          - generic [ref=e156]:
            - generic [ref=e157]: $0
            - generic [ref=e158]: /mo
          - generic [ref=e159]:
            - generic [ref=e161]: 1 Wallet Connected
            - generic [ref=e163]: Basic Beneficiary triggers
          - button "Start Free" [ref=e164] [cursor=pointer]
        - generic [ref=e165]:
          - generic [ref=e166]: POPULAR
          - generic [ref=e167]:
            - generic [ref=e168]:
              - heading "Pro Estate" [level=3] [ref=e169]
              - paragraph [ref=e170]: Multi-chain & TaxCore.
            - generic [ref=e171]:
              - generic [ref=e172]: $29
              - generic [ref=e173]: /mo
            - generic [ref=e174]:
              - generic [ref=e176]: Unlimited Wallets
              - generic [ref=e178]: Full TaxCore Access
              - generic [ref=e180]: Children's Trust Features
            - button "Get Started" [ref=e181] [cursor=pointer]
        - generic [ref=e183]:
          - generic [ref=e184]:
            - heading "Lifetime" [level=3] [ref=e185]
            - paragraph [ref=e186]: Pay once, secure forever.
          - generic [ref=e187]:
            - generic [ref=e188]: $999
            - generic [ref=e189]: /one-time
          - generic [ref=e190]:
            - generic [ref=e192]: All Pro Features
            - generic [ref=e194]: Concierge Onboarding
            - generic [ref=e196]: Hardware Key Backup
          - button "Buy Lifetime" [ref=e197] [cursor=pointer]
    - generic [ref=e201]:
      - generic [ref=e202]:
        - heading "For Family Offices & Custodians" [level=2] [ref=e203]
        - paragraph [ref=e204]: Manage high-net-worth digital estates with enterprise-grade multi-sig coordination, dedicated account managers, and custom legal framework integration.
        - generic [ref=e206] [cursor=pointer]: Contact Sales
      - img "Shield" [ref=e207]
    - contentinfo [ref=e208]:
      - generic [ref=e210]:
        - generic [ref=e211]:
          - generic [ref=e212]:
            - generic [ref=e213]:
              - img "Logo" [ref=e215]
              - generic [ref=e216]: CIP
            - paragraph [ref=e217]: The standard for sovereign digital inheritance. Securing the future of decentralized wealth.
          - generic [ref=e218]:
            - heading "Product" [level=4] [ref=e219]
            - generic [ref=e220]:
              - link "Features" [ref=e221] [cursor=pointer]:
                - /url: "#"
              - link "TaxCore" [ref=e222] [cursor=pointer]:
                - /url: "#"
              - link "Security" [ref=e223] [cursor=pointer]:
                - /url: "#"
              - link "Pricing" [ref=e224] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e225]:
            - heading "Resources" [level=4] [ref=e226]
            - generic [ref=e227]:
              - link "Documentation" [ref=e228] [cursor=pointer]:
                - /url: "#"
              - link "API Reference" [ref=e229] [cursor=pointer]:
                - /url: "#"
              - link "Whitepaper" [ref=e230] [cursor=pointer]:
                - /url: "#"
              - link "Community" [ref=e231] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e232]:
            - heading "Legal" [level=4] [ref=e233]
            - generic [ref=e234]:
              - link "Terms of Service" [ref=e235] [cursor=pointer]:
                - /url: "#"
              - link "Privacy Policy" [ref=e236] [cursor=pointer]:
                - /url: "#"
              - link "Cookie Policy" [ref=e237] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e238]:
          - paragraph [ref=e239]: © 2024 CIP Protocol. All rights reserved.
          - generic [ref=e240]:
            - generic [ref=e241]: public
            - generic [ref=e242]: mail
  - region "Notifications Alt+T"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Full Inheritance Plan Flow', async ({ page }) => {
  4  |   // Go to the app
  5  |   await page.goto('http://localhost:5173');
  6  | 
  7  |   // Click to start plan creation (adjust selector as needed)
> 8  |   await page.click('text=Create Plan');
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  9  | 
  10 |   // Add a beneficiary
  11 |   await page.click('text=Add Another Beneficiary');
  12 |   await page.fill('input[placeholder="Enter name"]', 'John Doe');
  13 |   await page.fill('input[placeholder="0x..."]', '0x1234567890abcdef1234567890abcdef12345678');
  14 |   await page.fill('input[type="number"]', '100');
  15 | 
  16 |   // Proceed to next step
  17 |   await page.click('text=Next: Review Plan');
  18 | 
  19 |   // Choose a plan type (adjust selector as needed)
  20 |   await page.click('text=Time-Lock');
  21 |   await page.click('text=Continue');
  22 | 
  23 |   // Review and confirm
  24 |   await page.click('text=Confirm & Protect Plan');
  25 | 
  26 |   // Expect a success message (adjust selector/text as needed)
  27 |   await expect(page.locator('text=protected successfully')).toBeVisible();
  28 | });
```