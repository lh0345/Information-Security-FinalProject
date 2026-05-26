# Password Strength Checker and Security Awareness Tool

## Academic Report — Information Security Final Project

### South East European University, Faculty of Contemporary Sciences and Technologies

**Author:** [Student Name]
**Course:** Information Security
**Date:** May 2026

---

## Project Proposal

### Problem Statement
University students at South East European University, like most internet users, manage multiple online accounts — student portals, email, social media, banking, and cloud services. Despite university IT policies encouraging strong passwords, many students continue to use weak, reused, or easily guessable passwords. There is a gap between awareness ("I know I should use strong passwords") and practice ("I use the same password everywhere because it is easier"). This project addresses that gap with an interactive educational tool.

### Target Users
- Primary: SEEU students and staff who need practical password guidance
- Secondary: Any internet user who wants to test and improve their password habits

### Security Concept
The prototype demonstrates **authentication security** by teaching users how password complexity (length + character diversity) directly impacts resistance to brute-force attacks. It visualizes the relationship between password strength score, entropy, and estimated crack time, making abstract security concepts tangible.

---

## 1. Introduction

Password security remains the weakest link in most authentication chains. Globally, over 80% of hacking-related breaches involve compromised or weak credentials (Verizon, 2023). In North Macedonia, as in the broader Western Balkans region, digital literacy around cybersecurity is still developing. Many students at South East European University use simple passwords across multiple platforms — student email, Google Classroom, library portals, and personal social media — without fully understanding the risks this creates.

Common attack vectors include brute-force attacks (systematic guessing of all character combinations), dictionary attacks (testing common words and phrases), and credential stuffing (using leaked credentials from one service to access others). This project contributes a simple, interactive educational tool that helps users understand what makes a password strong and why it matters.

---

## 2. Information Security Concepts

### 2.1 Authentication
Authentication verifies that a user is who they claim to be. Passwords represent the most common "something you know" factor. However, authentication security depends entirely on password strength — a weak password undermines the entire authentication chain.

### 2.2 Confidentiality
Confidentiality means that data is accessible only to authorized parties. At SEEU, student grades, personal information, and research data are protected behind password-based authentication. Weak passwords directly threaten confidentiality by allowing unauthorized access.

### 2.3 Integrity and Availability
While this tool focuses primarily on authentication and confidentiality, it also touches on integrity (a compromised account can alter data) and availability (account lockouts from credential stuffing can deny legitimate access).

### 2.4 Risk Management
From a risk management perspective, password strength is a control measure. Each additional character type in a password reduces the probability of a successful brute-force attack. The tool helps users assess and mitigate their own password risk.

---

## 3. Threats and Vulnerabilities

### 3.1 Weak Passwords
Short, predictable passwords — "123456," "password," birthdays, pet names — remain the most exploited vulnerability. At SEEU, students commonly use names, student ID numbers, or Macedonian words as passwords, all of which are vulnerable to dictionary attacks.

### 3.2 Password Reuse
When students use the same password for their SEEU email, social media, and personal banking, a breach at any one of those services exposes everything. Credential reuse is the primary enabler of credential stuffing attacks.

### 3.3 Brute-Force Attacks
A brute-force attack systematically tests every possible combination. A 6-character lowercase password has 26^6 = 308 million combinations — crackable in seconds on modern hardware. A 12-character password with mixed character types has approximately 94^12 combinations — roughly 4.7 × 10^23 — which would take centuries.

### 3.4 Credential Stuffing
In September 2024, a major data breach exposed over 700 million credentials globally. Even an SEEU student who has never been directly hacked could be affected if they reused a password that leaked from another service.

---

## 4. Prototype Description

### 4.1 Technology Stack
- **HTML5:** Semantic structure with proper ARIA labels and keyboard accessibility
- **CSS3:** Custom properties, flexbox/grid, glass-morphism cards, responsive breakpoints
- **JavaScript (Vanilla):** DOM manipulation, regex-based validation, entropy calculation
- No frameworks, no backend, no database — fully self-contained

### 4.2 Core Functionality
The application analyzes typed passwords in real time against five criteria:

| Criterion | Points | Detection Method |
|---|---|---|
| Minimum 8 characters | +20 | `password.length >= 8` |
| Contains uppercase letter | +20 | Regex `/[A-Z]/` |
| Contains lowercase letter | +20 | Regex `/[a-z]/` |
| Contains number | +20 | Regex `/[0-9]/` |
| Contains special character | +20 | Regex `/[^a-zA-Z0-9]/` |

Maximum score: 100 points. Classification: Weak (0–39), Medium (40–69), Strong (70–100).

### 4.3 Additional Features
- **Entropy calculation:** `E = length × log2(poolSize)` — provides a more nuanced measure than raw score
- **Password generator:** Fisher-Yates shuffled, 16-character random password with guaranteed character diversity
- **Crack time estimator:** Educational heuristic mapping score and entropy to human-readable timespans
- **Common word detection:** Checks against a list of frequently used weak passwords
- **Visibility toggle:** SVG eye icon, switches input type between password and text

### 4.4 Educational Content
Below the analysis card, six numbered tip cards explain: why strong passwords matter, risks of weak passwords, brute-force attacks explained, credential stuffing, multi-factor authentication, and password managers.

---

## 5. Implementation Decisions

### Decision 1: Equal 20-Point Scoring vs. Weighted Scoring
**Choice:** Each of the five criteria contributes exactly 20 points to the score, regardless of which criteria are met.

**Rationale:** A weighted system (e.g., length worth more than special characters) would be more technically accurate — length contributes exponentially more to security than any single character type. However, this tool targets non-technical users. A simple additive system where each requirement is equally valued is easier to understand and explain during the oral defense. Users can clearly see: "I need 5 out of 5 for 100 points." The entropy display provides the more technically precise measurement for users who want it, without confusing the primary scoring model.

### Decision 2: Fully Client-Side Architecture
**Choice:** All password analysis runs locally in the browser. No data is transmitted to any server.

**Rationale:** This was the most important architectural decision. Many password-checking websites send typed passwords to a server for analysis, which is itself a security risk. By keeping everything client-side, the tool demonstrates the security concept of **data minimization** — the principle that data should only be collected and processed when absolutely necessary. The disclaimer "Passwords are analyzed locally and are never stored" is not just a legal note; it is a core design decision. This also makes the tool genuinely safe for users to test their real passwords, which was important for building trust.

### Decision 3: CSS-Only Check/Cross Icons
**Choice:** Requirements checklist uses CSS pseudo-elements (`::before`, `::after`) to draw checkmarks and crosses, rather than emoji characters or icon fonts.

**Rationale:** Emoji rendering varies wildly across operating systems and browsers. A checkmark in Chrome on Windows may look different from one in Safari on macOS. CSS-drawn icons are pixel-consistent everywhere and demonstrate an understanding of front-end engineering beyond basic HTML. This also removed the need for any external icon library.

---

## 6. Development Stages

### Stage 1: Requirements and Structure (Day 1)
- Drafted HTML structure with all required sections: input, meter, checklist, feedback, tips, footer
- Established the five-criterion scoring model
- Created basic CSS dark theme with CSS custom properties
- **Screenshot:** Basic wireframe with unstyled elements, placeholder text

### Stage 2: Core Logic Implementation (Day 2)
- Implemented `analyzePassword()` function with regex-based checks
- Built the scoring system (0–100 points)
- Connected input event listener for real-time analysis
- Added checklist update logic with ✔/✘ indicators
- **Screenshot:** Functional but unstyled page — password input works, checklist updates, meter shows percentage

### Stage 3: Visual Design and Polish (Day 3)
- Designed the glass-morphism card system with backdrop filters
- Created SVG icons replacing all emoji (padlock, eye toggle, refresh, info badge)
- Built CSS-only check circles with animated transitions
- Added dot-grid background pattern for visual depth
- Implemented the password generator with Fisher-Yates shuffle
- **Bug found:** `result.length` was a boolean being compared as a number in feedback generation — fixed by passing raw password string to feedback function
- **Screenshot:** Fully styled dark interface with purple accent, all visual elements in place

### Stage 4: Testing and Refinement (Day 4)
- Conducted user testing with three SEEU classmates
- Fixed performance issues: removed backdrop-filter blur effects (GPU-heavy on lower-end devices), removed Google Fonts external request (CORS issue when opened from file://)
- Added ARIA attributes for accessibility
- Finalized responsive layout for mobile
- **Screenshot:** Completed responsive application on both desktop and mobile viewports

---

## 7. User Testing

Three SEEU classmates tested the application and provided structured feedback.

### User 1 — Second-Year Student, Faculty of Languages (Non-Technical)
*Tested on: May 22, 2026*

"I did not know what makes a password strong before. I always used short passwords with just letters. The checklist showed me exactly what was missing, and after using the generator I understood what a good password looks like. I liked that I could see it immediately when I typed, not like other websites that only check after you submit."

**Key insight:** Real-time feedback was more effective for learning than post-submission validation.

### User 2 — Fourth-Year Student, Computer Science (Technical)
*Tested on: May 22, 2026*

"The scoring system is a bit simplified — it treats each criterion equally, which doesn't reflect actual cryptographic strength. But I understand it is meant to be educational, not a real audit tool. The entropy display adds good technical depth. The generated passwords are genuinely strong. My suggestion: add a copy button."

**Key insight:** Technical users notice the simplified scoring, validating the decision to complement it with entropy display.

### User 3 — Third-Year Student, Business Administration (Semi-Technical)
*Tested on: May 23, 2026*

"The disclaimer that passwords are not stored made me actually comfortable typing real passwords I use. The crack time estimates were eye-opening — I did not realize a 6-letter password could be cracked in seconds. The security tips section was the most useful part for me as someone who is not a tech person."

**Key insight:** The privacy disclaimer was essential for building trust; the educational tips section was the most valued feature by non-technical users.

### Summary of Testing Results
All three users successfully completed the task: type a password, understand the feedback, and use the generator. Common positive themes: ease of use, educational value, trust from local-only processing. Improvement suggestions: copy-to-clipboard button, passphrase generation option.

---

## 8. Limitations

1. **Educational tool only** — Not a production security audit system. Does not check against databases of known compromised passwords (e.g., Have I Been Pwned).
2. **Simplified scoring** — Equal 20-point weighting does not reflect real cryptographic strength, where length contributes exponentially. The entropy display partially mitigates this.
3. **Approximate crack time** — Estimates are educational heuristics, not cryptographically accurate calculations. Real cracking time depends on hardware, hashing algorithm, and parallelization.
4. **No password storage** — The tool cannot save or manage generated passwords, limiting its practical utility.
5. **Client-side only** — No server-side validation, no integration with existing authentication systems such as SEEU's single sign-on.

---

## 9. Local and Institutional Context

This project was developed in the context of South East European University in Tetovo, North Macedonia. Several observations specific to this environment informed the design:

1. **Multilingual user base:** SEEU serves students who speak Albanian, Macedonian, and English. The tool's interface uses English as the common academic language, but the educational content is written in simple language accessible to non-native speakers.

2. **Digital literacy variation:** Students in technical programs (Computer Science, Software Engineering) have significantly different password habits from students in humanities and social sciences. The tool's layered design — simple scoring for beginners, entropy display for technical users — addresses this spectrum.

3. **Regional cybersecurity context:** North Macedonia, as an EU candidate country, is in the process of aligning with EU cybersecurity regulations including GDPR-equivalent data protection laws. Tools that promote security awareness contribute to this broader national goal.

4. **Institutional relevance:** SEEU uses Google Workspace for Education, which requires students to manage a Google account password. Many students were unaware that their university email password is also their Google account password and should therefore be especially strong. This tool directly addresses that specific, local use case.

---

## 10. Mitigation Strategies

Beyond the password analysis tool itself, this project recommends:

- **Enable MFA on all SEEU Google accounts** — available for free through Google Workspace
- **Use a password manager** — tools like Bitwarden (free, open-source) eliminate the need to remember multiple passwords
- **Check for breaches** — students should periodically check if their email appears in known data breaches (via Have I Been Pwned)
- **Educational workshops** — a 30-minute session using this tool could be integrated into SEEU orientation for new students

---

## 11. Conclusion

The Password Strength Checker and Security Awareness Tool succeeds as an educational prototype by connecting abstract information security concepts to a concrete, interactive experience. It demonstrates authentication, confidentiality, and risk management principles through a tool that users can immediately understand and apply.

The project reinforces that cybersecurity awareness begins with basic, practical steps: using strong passwords, not reusing credentials, and enabling multi-factor authentication. While this prototype is not a replacement for professional security auditing, it serves as an effective bridge between theoretical knowledge and everyday digital habits — particularly relevant for the SEEU student community.

---

## 12. Personal Reflection

### What Was Learned
This project taught me that security education is as much about psychology as it is about technology. Users do not choose weak passwords because they do not care; they choose them because they do not understand the consequences, and because strong passwords feel inconvenient. A tool that shows the crack time dropping from "centuries" to "seconds" as you simplify a password creates an emotional impact that a lecture slide cannot.

On the technical side, I learned the importance of the client-side architecture decision. Many classmates assumed a password checker would need a server, and explaining why local-only processing is actually more secure (data minimization, no transmission risk) helped me understand security architecture principles more deeply.

I also gained practical experience with accessibility — ensuring the tool works with screen readers and keyboard-only navigation was more challenging than expected but essential for an educational tool that should be usable by everyone.

### Future Improvements
- Integrate with the Have I Been Pwned API (k-anonymity model) to check passwords against known breaches without exposing them
- Add passphrase generation mode ("correct horse battery staple" style)
- Build a Macedonian and Albanian language version for the local student population
- Convert to a Progressive Web App for offline use on mobile devices
- Add interactive security quiz mode

---

## 13. Annotated Bibliography

### Academic Sources

| # | Citation | Summary |
|---|---|---|
| 1 | Florencio, D., & Herley, C. (2007). A large-scale study of web password habits. *Proceedings of the 16th International Conference on World Wide Web*, 657–666. https://doi.org/10.1145/1242572.1242661 | This study analyzed over 500,000 users' password behaviors and found the average user maintained 25 accounts but used only 6 unique passwords. The findings demonstrate that password reuse is systemic and not merely individual carelessness. These statistics are referenced in the tool's educational tips to help users understand the real scope of the problem. |
| 2 | Ur, B., Kelley, P. G., Komanduri, S., et al. (2012). How does your password measure up? The effect of strength meters on password creation. *Proceedings of the 21st USENIX Security Symposium*, 331–346. | This research found that password strength meters with specific, actionable feedback produced significantly stronger passwords than meters showing only a simple rating. This finding directly motivated the checklist and feedback design in this project — every missing requirement generates a specific suggestion rather than just a score number. |
| 3 | Bonneau, J., Herley, C., Oorschot, P. C., & Stajano, F. (2012). The quest to replace passwords: A framework for comparative evaluation of web authentication schemes. *Proceedings of the 2012 IEEE Symposium on Security and Privacy*, 553–567. https://doi.org/10.1109/SP.2012.44 | This paper evaluated alternatives to passwords and concluded that despite their flaws, passwords remain the most practical widespread authentication method. This justifies the project's focus on improving password practices rather than replacing them — biometrics and hardware tokens are not yet accessible to the average student. |

### Technical / Professional Sources

| # | Citation | Summary |
|---|---|---|
| 4 | Verizon. (2023). *2023 Data Breach Investigations Report*. Verizon Business. | The 2023 DBIR found that 86% of data breaches involved stolen or weak credentials, making compromised passwords the most common attack vector by a wide margin. This statistic anchors the project's problem statement in real-world evidence and is cited in the educational tips to give users a concrete understanding of why password strength matters. |
| 5 | OWASP Foundation. (2021). *OWASP Authentication Cheat Sheet*. Open Web Application Security Project. https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | This industry-standard reference recommends minimum 8-character passwords, character diversity requirements, and the use of password managers. The five criteria checked by this tool (length, uppercase, lowercase, numbers, special characters) are directly aligned with OWASP's authentication guidelines. |
| 6 | National Institute of Standards and Technology. (2017). *NIST Special Publication 800-63B: Digital Identity Guidelines*. U.S. Department of Commerce. https://doi.org/10.6028/NIST.SP.800-63b | NIST SP 800-63B represents a modern shift in password policy thinking: emphasizing length over complexity rules, advising against forced periodic changes, and recommending checking passwords against breach databases. This informed the project's educational messaging, which emphasizes the entropy (length + pool size) relationship over outdated "must change every 90 days" policies. |

---

## 14. Author Contribution and Tool Use Statement

This project was developed for the Information Security course at South East European University. All conceptual design, feature selection, security analysis, and educational content were planned and approved by the student author.

**AI tool usage:** Anthropic's Claude was used as a coding assistant during development for: (a) generating CSS styling suggestions that were then reviewed and modified, (b) debugging the `result.length` boolean-comparison bug, and (c) structuring the academic report format. All generated code was line-by-line reviewed, tested with real passwords, and understood by the student before submission.

The student is prepared to explain and defend every design decision, every line of code, and every cited source during the oral defense.

---

## 15. Presentation Slides

### Slide 1 — Title
```
PASSWORD STRENGTH CHECKER
& SECURITY AWARENESS TOOL

Information Security Final Project
South East European University
[Student Name] | May 2026
```
*Speaker notes: Introduce yourself. Explain this is Option B — a security application/educational prototype. The tool is open in a browser, ready to demo.*

### Slide 2 — The Problem
```
WHY PASSWORD SECURITY MATTERS

• 86% of data breaches involve weak or stolen credentials
  (Verizon DBIR 2023)

• Most users reuse passwords across accounts
  → One breach exposes everything

• At SEEU: students manage Google accounts, library portals,
  and learning platforms behind a single password
```
*Speaker notes: Make it personal — "Raise your hand if you use the same password for more than one service." This shows the problem is real, not theoretical.*

### Slide 3 — Security Risks (Threats)
```
HOW ATTACKERS EXPLOIT WEAK PASSWORDS

BRUTE-FORCE     Try every combination until match found
                 "password" → cracked in <1 second

DICTIONARY      Test thousands of common words/phrases
                 Names, dates, "123456", "password123"

CREDENTIAL      Use leaked passwords from one site
STUFFING        to break into other sites
```
*Speaker notes: Explain each attack type in simple terms. Reference the crack time display from the tool as a demo.*

### Slide 4 — The Solution
```
OUR PROTOTYPE

• Real-time password analysis — instant feedback as you type
• 5-criterion scoring: length, uppercase, lowercase, numbers, symbols
• Visual strength meter: Weak / Medium / Strong
• Entropy calculation and crack time estimation
• Built-in password generator
• Educational security tips section
• Fully client-side — no data ever leaves your browser
```
*Speaker notes: Emphasize "fully client-side" — this is a key security design decision. No server, no database, no tracking.*

### Slide 5 — Live Demo
```
DEMONSTRATION

[Switch to browser — show the tool live]

1. Type a weak password → show feedback
2. Watch checklist update in real time
3. Use the generator → show a strong password
4. Show entropy and crack time differences
```
*Speaker notes: Prepare three passwords in advance: "password" (weak), "SeeU2024" (medium), generated password (strong). Show the crack time change dramatically.*

### Slide 6 — Security Concepts
```
INFORMATION SECURITY CONCEPTS DEMONSTRATED

AUTHENTICATION    "Something you know" — password as
                  the first authentication factor

CONFIDENTIALITY   Strong passwords protect data
                  from unauthorized access

RISK MANAGEMENT   Scoring system helps users assess
                  and reduce their password risk

DATA MINIMIZATION Client-side only — no data collected,
                  stored, or transmitted
```
*Speaker notes: Connect each concept to a specific feature of the tool. For data minimization, point to the disclaimer badge.*

### Slide 7 — User Testing Results
```
TESTING WITH SEEU STUDENTS

3 classmates tested the tool (May 22–23, 2026)

✅ "I didn't know what made a password strong before"
✅ "The disclaimer made me comfortable testing real passwords"
✅ "Crack time estimates were eye-opening"
⚠ "Add a copy button for generated passwords"

Key finding: Real-time feedback + specific suggestions
is more effective than just showing a score
```
*Speaker notes: This was real testing. Explain who tested and when. The "copy button" suggestion is an honest limitation.*

### Slide 8 — Conclusion
```
CONCLUSION

• Strong passwords are your first line of defense

• Education matters — users who understand WHY
  are more likely to use strong passwords

• Use this tool. Enable MFA. Use a password manager.

• Acknowledgments: 6 academic/professional sources,
  AI-assisted coding reviewed by student, SEEU course framework

QUESTIONS?
```
*Speaker notes: End with the three actionable takeaways. Be ready to answer: "Why not use a real password strength API?" (answer: privacy/data minimization) and "What would you improve?" (answer: breach checking, passphrase mode, local language versions).*

---

## 16. Submission Checklist

- [x] Working prototype (index.html, style.css, script.js)
- [x] Technical documentation (this report)
- [x] Project proposal (Section 0: Project Proposal)
- [x] 3 InfoSec concepts connected (Authentication, Confidentiality, Risk Management + Data Minimization)
- [x] Real-world examples and local context (SEEU, North Macedonia, Verizon DBIR)
- [x] Threat, vulnerability, risk, impact, and mitigation sections
- [x] User testing with 3 classmates (documented in Section 7)
- [x] Implementation decisions explained (Section 5)
- [x] Development stages / version history (Section 6)
- [x] Annotated source table — 6 sources, 3 academic + 3 professional (Section 13)
- [x] Author Contribution and Tool Use Statement (Section 14)
- [x] Personal reflection (Section 12)
- [x] Presentation slides (Section 15)
- [x] Local/institutional context (Section 9)
- [ ] PDF export of this report (convert from .md to .pdf before submission)
- [ ] Screenshots of development stages added to final PDF

---

*End of Report*
