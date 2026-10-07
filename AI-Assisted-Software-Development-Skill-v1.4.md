# AI-Assisted Software Development Skill v1.4

## 0. Purpose
This skill defines a general-purpose development methodology for collaborating with an AI assistant on software projects.
It is intentionally project-agnostic and should apply to:
- Web applications
- Educational simulators
- Medical/nursing simulators
- Data tools
- Small utilities
- Interactive visualizations
- Other software projects
The goal is not merely to generate code, but to establish a reliable loop of:
**understanding → modeling → planning → implementation → testing → review → documentation → versioning**.
The AI should adapt the depth of this process to project size. Small tasks should remain lightweight; complex projects should use the full protocol.

---

# 1. Core Philosophy

1. Understand before coding.
2. Model the problem before implementing complex behavior.
3. Build the smallest working version first.
4. Preserve working functionality.
5. Analyze impact before modifying shared logic.
6. Test both the new feature and affected existing features.
7. Distinguish facts, assumptions, simplifications, and guesses.
8. Keep important decisions traceable.
9. Prefer simple architecture that is sufficient for the project's complexity.
10. The AI writes code, but design decisions and validation remain explicit parts of the collaboration.
11. When multiple reasonable implementation paths exist, the AI should make the meaningful alternatives visible rather than silently committing the user to one path.
12. When implementation behavior is ambiguous, especially for visual or interactive behavior, the AI should confirm the user-observable result before committing to a technically specific implementation.
13. Verification must be treated as a separate phase from implementation. A feature being implemented does not mean the feature has been fully verified.
14. When a fix fails repeatedly, the AI should stop accumulating patches and return to root-cause analysis and alternative approaches.
Core principle:
> Build something that works first, validate it, then evolve it.

---

# 2. Development Workflow

Default workflow:

```text
Understand
↓
Define
↓
Model
↓
Plan
↓
Prototype
↓
Implement
↓
Test
↓
Review
↓
Refactor
↓
Document
↓
Version
```

Do not force every step onto trivial changes.

---

# 3. AI Coding Protocol

## Small change
For a small, localized change:

```text
Understand request
→ Check affected code
→ Modify
→ Quick verification
```

Examples:
- Text change
- Small CSS change
- Simple UI adjustment
- Local bug fix
## Medium change

```text
Requirements
→ Inspect current structure
→ Identify affected areas
→ Brief implementation plan
→ Implement
→ Test
→ Report result
```

## Large change

```text
Requirements
→ Current project analysis
→ Architecture/data-flow review
→ Proposed design
→ Identify risks and dependencies
→ Confirm major design when appropriate
→ Implement incrementally
→ Test each stage
→ Integration test
→ Document
→ Version
```

The AI should not perform a large architectural rewrite merely because a feature could theoretically be implemented more elegantly.

---

# 4. Requirements

Before implementation, identify:

- What is the user trying to accomplish?
- What is the required behavior?
- What is explicitly out of scope?
- What inputs exist?
- What outputs are expected?
- What existing behavior must remain unchanged?
- What edge cases matter?
- What constitutes success?
If requirements are ambiguous and the ambiguity materially affects implementation, ask for clarification rather than silently inventing requirements.

### Explicit Constraints and Prohibitions

Treat explicit constraints such as “must not,” “do not,” “keep unchanged,” or “do not use this approach” as first-class requirements.

Before implementation:
- Identify important MUST HAVE requirements.
- Identify important MUST NOT requirements.
- Identify existing behavior that must remain unchanged.
- Re-check these constraints when reviewing the implementation and tests.
Do not repeatedly propose or implement an approach that the user has explicitly ruled out unless the user changes that requirement.

### Implementation Confirmation for Ambiguous Behavior

When two or more technically different implementations could satisfy the same wording, first describe the difference in terms the user can observe rather than only in programming terminology.

This is especially important for:
- Animation
- Character or object movement
- Interaction behavior
- Visual transitions
- Drag / click behavior
- Timing and repetition
- UI states

For example, distinguish:
- “The same image sequence loops continuously”
from
- “The character is represented by separate visual states and changes between them according to its current behavior.”

If the distinction materially affects implementation effort, architecture, or user experience, confirm the intended behavior before implementing the full solution.

Do not force a technically specific interpretation onto an ambiguous visual or interaction requirement.

---

# 5. Domain-First Design

For systems that model real-world processes, first identify:

- Entities
- States
- Events
- Relationships
- Rules
- Constraints
- Inputs
- Outputs
Then translate them into software concepts.

```text
Real-world concept
↓
Domain model
↓
Software model
↓
Implementation
```

Do not let the UI become the accidental source of truth for complex domain logic.

---

# 6. Application Architecture

For applications with multiple layers, especially web applications or networked systems, identify the major architectural boundaries before implementation.
Typical structure:

```text
User
↓
Frontend / UI
↓
API / Server
↓
Domain / Business Logic
↓
Persistence / Database
↓
External Services / APIs
```

For each layer, define:
- Responsibility
- Inputs and outputs
- Important dependencies
- What the layer should not be responsible for
Use this only when the project actually has multiple architectural layers. Do not introduce server, API, or database layers merely for architectural style.
For small applications, a lightweight structure is sufficient.

---

# 7. Client / Server Boundary

For networked applications, explicitly decide what belongs on the client and what belongs on the server.
### Client-side responsibilities
- UI rendering
- Local interaction state
- Presentation logic
- Immediate user feedback
- Non-authoritative client-side validation
### Server-side responsibilities
- Shared or authoritative business rules
- Authentication and authorization
- Sensitive operations
- Persistent shared data
- External API calls requiring secrets
- Server-side validation
Do not place secrets in client-side code.
Do not rely on hiding a UI control as an access-control mechanism.
Define the client/server boundary before implementing complex interactions.
For offline or single-user applications, this section may be skipped.

---

# 8. API Contract

When a project uses APIs, define important client/server interfaces before implementing complex integration.
For each important endpoint, specify where practical:
- Method
- Path
- Authentication requirement
- Request structure
- Response structure
- Validation rules
- Error responses
- Side effects
- Persistence behavior
Treat the API contract as an explicit agreement between the client and server.
Avoid allowing frontend and backend assumptions about data shape to drift apart.
For simple applications without an API, do not create unnecessary API specifications.

---

# 9. Data Model First

For projects with non-trivial data:

```text
Data model
↓
State / business logic
↓
UI / visualization
```

Define the important data structures before building large amounts of UI.
Example:

```text
Patient
├── vitalSigns
├── rhythm
├── medications
└── events
```

The UI should represent the underlying model rather than independently duplicating the same logic.
For small projects, this can be simplified.

---

# 10. State / Event Architecture

When system behavior involves meaningful state transitions, consider an explicit State/Event model.

```text
Current State
↓
Event
↓
Transition / Rule
↓
New State
↓
Derived Outputs
```

Use this especially for:
- Simulators
- Interactive systems
- Games
- Workflow applications
- Systems with time-dependent behavior
Do not force a formal state machine onto simple CRUD or static interfaces.

---

# 11. Simulator Development Model

For educational or scientific simulators, use the following conceptual pipeline where appropriate:

```text
State
↓
Event
↓
Physiological / Logical Change
↓
Derived State
↓
Visualization
↓
Explanation
```

The visualization should reflect the internal model.
Example:

```text
AV conduction delay
↓
ventricular activation timing changes
↓
PR interval changes
↓
ECG visualization changes
↓
educational explanation
```

Do not create visually convincing behavior that is disconnected from the underlying model.

---

# 12. UI ↔ Logic Separation

Prefer separation between:

```text
Simulation / Domain Engine
↓
State / Data
↓
UI / Visualization
```

This allows:
- Logic changes without redesigning the UI
- UI changes without rewriting the model
- Easier testing
- Easier debugging
- Multiple visualizations of the same underlying state
For small projects, lightweight separation is sufficient.

---

# 13. Progressive Complexity

Build complexity in stages.
Typical simulator progression:

```text
Level 1 — Normal/basic state
↓
Level 2 — Single abnormality
↓
Level 3 — Multiple interacting abnormalities
↓
Level 4 — Complex scenarios / interactions
```

Do not attempt to model every real-world detail before validating the basic model.

---

# 14. MVP First

Start with the smallest version that proves the core idea.
Validate:

- Does the core function work?
- Is the data flow correct?
- Does the user interaction make sense?
- Is the architecture extendable enough?
Then expand.
Avoid polishing secondary features before the core model is stable.

---

# 15. Change Impact Analysis

Before modifying shared logic, identify:

- Directly affected files/components
- Dependent functions
- Shared state
- Data structures
- UI elements
- Persistence
- External integrations
- Tests
- Other features that depend on the changed behavior
Think in terms of:

```text
Changed component
├── direct dependencies
├── derived outputs
├── UI
├── persistence
└── regression risks
```

A change should be evaluated by its system-wide impact, not only by whether the modified function works.

### Implementation Alternatives and Trade-offs

When there are multiple plausible implementation approaches and the choice materially affects:
- User experience
- Architecture
- Compatibility
- Maintainability
- Performance
- Development risk
- Future extensibility

the AI should identify the meaningful alternatives before committing to one.

For each relevant option, briefly explain:
- What the approach does
- Main advantages
- Main disadvantages or risks
- When it is appropriate

Do not present alternatives for every trivial change. For small, low-risk, localized work, the AI may choose the simplest safe approach directly.

For important design choices, the AI may recommend the lower-risk option, but should make the reasoning and trade-offs visible so the user can make an informed decision.

---

# 16. Bug-Fixing Protocol

Use:

```text
Symptom
↓
Reproduction
↓
Root cause
↓
Affected scope
↓
Fix
↓
Regression test
```

When possible, explain:
- What broke?
- Why did it break?
- What was changed?
- What could be affected?
- How was it verified?
If the root cause is uncertain, explicitly distinguish hypotheses from confirmed findings.
Do not randomly patch symptoms when the underlying cause can be investigated.

### Repeated-Failure Escalation

If the same root-cause hypothesis leads to two consecutive unsuccessful fixes, stop applying incremental patches based on that hypothesis.

Instead:
1. Re-state the confirmed facts.
2. Separate confirmed findings from hypotheses.
3. Reproduce the failure again.
4. Inspect the relevant code, configuration, logs, state flow, or environment.
5. Reconsider the root cause.
6. Identify an alternative implementation or diagnostic path when appropriate.
7. Only then attempt another fix.

The purpose is to prevent a chain of increasingly fragile patches from accumulating around an incorrect diagnosis.

### Environment / Build Problem Diagnosis

When a failure may originate from the development environment rather than application code, distinguish the two before changing application logic.

Check, as appropriate:
- Operating system and environment
- Runtime and package-manager versions
- Framework / dependency versions
- Installation state
- Build configuration
- Environment variables or paths
- Relevant command output and error logs
- Whether the failure reproduces in a known-good environment

Do not modify application code merely to compensate for an unverified environment or installation problem.

If several valid installation or build approaches exist, identify the safer or simpler alternatives and their trade-offs before committing to a complicated workaround.

---

# 17. Regression Testing Protocol

After adding or changing a feature, test:
### New functionality
Does the requested behavior work?
### Existing functionality
Did important previous behavior remain intact?
### Boundary cases
What happens at minimum/maximum/empty/unusual inputs?
### Error cases
What happens with invalid input or unexpected state?
### Persistence
Do save/load/refresh/reconnect behaviors still work?
### Responsive behavior
Does the interface remain usable across relevant screen sizes?
For larger projects, maintain a regression checklist.

### Layered Verification

Testing should be performed at a depth appropriate to the change. For interactive or stateful features, use multiple layers rather than relying on a single automated test result.

A useful progression is:

```text
1. Structural / unit-level verification
↓
2. Feature behavior verification
↓
3. Integration verification
↓
4. Actual execution / visual or UX verification
↓
5. Regression verification
```

Not every project requires every layer for every change. The AI should use the layers that can meaningfully detect the risks introduced by the change.

#### 1. Structural / unit-level verification
Check functions, modules, data transformations, syntax, static assumptions, or automated tests where applicable.

#### 2. Feature behavior verification
Verify that the requested feature works in the intended states and inputs.

#### 3. Integration verification
Verify interactions between the changed feature and other relevant features, shared state, events, persistence, UI, or external components.

#### 4. Actual execution / visual or UX verification
When behavior depends on runtime execution, timing, animation, layout, input devices, window behavior, or visual presentation, verify it in the actual relevant environment where practical.

#### 5. Regression verification
Re-check existing functionality that could reasonably have been affected.

### Integration Failure Rule

If integration testing reveals an error:
- Diagnose the error.
- Fix the underlying issue where possible.
- Re-run the relevant integration tests.
- Re-run affected regression tests when appropriate.
- Only then report the implementation as verified.

Do not report an implementation as complete merely because the original feature-level tests passed if later integration testing exposes a failure.

### Verification Status

Distinguish clearly between:
- Implemented
- Automatically tested
- Integration tested
- Actually executed
- Visually / manually verified
- Regression tested
- Not yet verified

A statement such as “all tests passed” must describe the scope of the tests that actually ran. It must not imply that untested runtime, visual, integration, or platform-specific behavior has been verified.

---

# 18. Requirement Traceability

For important features, connect:

```text
Requirement
↓
Design
↓
Implementation
↓
Test
```

Example:

```text
REQ-CARD-007
"AV block increases PR interval."
→ Model: AV conduction delay
→ Event: delayed conduction
→ Visualization: PR interval
→ Test: PR interval differs from baseline
```

This helps answer:
- Why does this code exist?
- Which requirement does it satisfy?
- How was it tested?

---

# 19. Scientific / Clinical Validation

For scientific, medical, nursing, or physiological simulations:

```text
Source
↓
Scientific / clinical assumption
↓
Model
↓
Expected result
↓
Simulation result
```

Distinguish:
1. Established scientific/clinical fact
2. Educational simplification
3. Modeling assumption
4. Visualization-only representation
5. Unverified approximation
Do not invent physiological relationships or numerical values without justification.
When accuracy matters, consult appropriate authoritative sources.
The model should be honest about its level of fidelity.

---

# 20. AI-Integrated Application Development

When the software itself uses an AI service, treat the AI as an external component rather than as an unrestricted source of application logic.
Prefer:

```text
User Input
↓
AI Processing
↓
Structured Output
↓
Validation
↓
Application State / Business Logic
↓
UI / Persistence
```

When AI output affects application behavior, define:
- Expected output schema
- Required fields
- Allowed values
- Validation rules
- Failure behavior
- Handling of partial or malformed responses
Prefer structured machine-readable output such as JSON when the application must consume AI results programmatically.
Do not directly trust free-form AI text as authoritative application state.


### AI Output Evaluation

When AI judgment or generated output materially affects application behavior, evaluate the AI itself rather than assuming that a validly formatted response is a correct response.

Use representative evaluation cases where appropriate, including:
- Normal / expected inputs
- Incorrect inputs
- Partially correct inputs
- Ambiguous inputs
- Boundary or adversarial inputs where relevant

Compare expected behavior with actual model output.

For important decisions:
- Consider deterministic rule-based validation where feasible.
- Consider human review when the consequence of an incorrect AI judgment is significant.
- Re-run representative AI evaluation cases after meaningful changes to the model, prompt, output schema, or relevant application logic.
- Do not treat fluent language, confidence, or apparent certainty as evidence of correctness.

AI evaluation is part of application testing when AI materially affects behavior.

---

# 21. Prompt / AI Logic Separation

When an application uses AI, separate AI behavior definitions from application code when practical.
Keep separately documented or versioned where useful:
- System prompt
- Domain instructions
- Evaluation criteria
- Output schema
- Example interactions
- Model-specific assumptions
- Prompt version
Application code should handle:
- API communication
- Validation
- State updates
- Persistence
- Error handling
A meaningful prompt change can change application behavior and should be treated as a behavior change.
For applications that do not use AI at runtime, this section does not apply.


### AI Context and Application State

Separate the AI's conversational context from the application's authoritative state.

- Conversation history is context used to help the AI understand the interaction.
- Application state is maintained by the application and represents the current authoritative state.
- AI output should be treated as an input or proposal for state changes, not as authoritative state by itself.
- Validate AI-proposed state changes before applying them.
- Do not treat something as true merely because the AI stated it earlier in the conversation.
- Where practical, keep important state in structured data rather than relying on free-form conversation history.

### Prompt Injection and Untrusted Input

Treat user-provided text and externally supplied content as untrusted input.

- User input must not be allowed to redefine system rules, evaluation criteria, permissions, or application state.
- Distinguish user content from trusted system instructions and application data.
- Do not allow AI-generated text to directly grant permissions or perform sensitive operations.
- Sensitive operations must be enforced and validated by the authoritative application layer.
- Consider prompt injection and instruction-conflict cases when testing AI-integrated applications.

### AI Provider Abstraction

When an application may reasonably use multiple AI providers or models, keep provider-specific communication separate from core application logic where practical.

A suitable structure may be:

```text
Application Logic
↓
AI Interface / Adapter
↓
Model Provider
```

This can make model comparison or replacement easier.

Do not introduce an abstraction layer solely for architectural style. For small projects with one provider and little expected change, direct integration may be simpler and preferable.

---

# 22. Error and Uncertainty Handling

The AI should distinguish between:

- Confirmed fact
- Strong inference
- Plausible assumption
- Unverified hypothesis
Do not present uncertain implementation or scientific claims as confirmed facts.
When source information conflicts:
- Identify the conflict.
- Determine whether the difference is meaningful.
- Prefer authoritative or context-appropriate evidence.
- Preserve uncertainty when it cannot be resolved.

---

# 23. Code Review Protocol

After significant implementation, review the result for:

- Correctness
- Logical consistency
- Regression risk
- Maintainability
- Readability
- Error handling
- Security where relevant
- Performance where relevant
- Accessibility where relevant
- Responsive behavior where relevant
The AI should actively look for problems in code it just generated rather than assuming successful generation means correctness.

During review, also check:
- Were explicit MUST NOT constraints respected?
- Did the implementation silently choose a materially different interpretation of an ambiguous requirement?
- Were all meaningful affected features included in verification?
- Are any conclusions being presented as verified beyond the actual test scope?
- Did a failed approach leave unnecessary workaround code or duplicated logic?

---

# 24. Refactoring Rules

Do not refactor merely to make code look cleaner.
Refactor when there is a meaningful reason, such as:

- Repeated code
- Excessively large functions
- Difficult state management
- Repeated bugs
- Difficult feature expansion
- Excessive coupling
- Confusing responsibilities
Prefer:
> Make it work → Make it reliable → Then make it cleaner.
Avoid combining unrelated refactoring with a feature change unless necessary.

---

# 25. External Dependency Failure

For external APIs, network services, model providers, or other dependencies, consider:
- Timeout
- Connection failure
- Rate limiting
- Authentication failure
- Invalid response
- Partial response
- Service outage
- Retry behavior
- Graceful degradation
- User-facing error handling
Do not assume external services will always respond correctly.
Use retries only where they are safe and appropriate. Avoid duplicate side effects through uncontrolled retries.

---

# 26. Configuration and Secrets

Separate environment-specific configuration from application code.
Never hard-code:
- API keys
- Passwords
- Authentication tokens
- Database credentials
- Private secrets
Prefer environment variables or an appropriate secret-management mechanism.
Provide safe example configuration without real credentials.
Document required configuration values and distinguish development, testing, and production settings when relevant.

---

# 27. Data Lifecycle

For persistent application data, consider the complete lifecycle:

```text
Creation
↓
Validation
↓
Storage
↓
Read / Update
↓
Use / Export
↓
Retention
↓
Deletion / Archiving
```

Define where appropriate:
- Who can access the data
- How long it is retained
- What deletion means
- What happens after restart
- Backup / recovery requirements
- Behavior when stored data is missing or corrupted
For clinical, educational, or personal data, prefer synthetic development data when real data is not necessary.

---

# 28. Roles and Permissions

For multi-user applications, define:
- User roles
- Authentication
- Authorization
- Accessible resources
- Allowed actions
- Administrative functions
Permissions must be enforced at the appropriate authoritative layer, not only through UI visibility.
Do not add a role system to a single-user application without a real requirement.

---

# 29. Deployment / Operations

For applications intended to run as a service, define as appropriate:
- Development environment
- Production environment
- Required runtime
- Environment configuration
- Startup procedure
- Deployment procedure
- Health check
- Logging
- Backup
- Update procedure
- Rollback procedure
- Shutdown / restart behavior
A project is not complete merely because it works on the developer's machine.
For local-only prototypes, keep deployment documentation lightweight.

---

# 30. Logging / Observability

For server applications, provide enough logging to diagnose meaningful failures.
Logs should help identify:
- Operation
- Time
- Relevant identifier
- Success / failure
- Error cause
- External service failure
Do not log secrets, passwords, API keys, or unnecessary personal/clinical information.
Prefer useful diagnostic information over excessive logging.

---

# 31. Development / Demo Data

For non-trivial applications, consider providing safe sample data or demo scenarios.
Use them to:
- Test UI
- Test workflows
- Reproduce bugs
- Demonstrate functionality
- Verify deployment
Keep development fixtures synthetic whenever real personal or clinical data is not required.

---

# 32. Behavioral Versioning

For applications whose behavior depends on prompts, configuration, schemas, or external models, track meaningful behavior-affecting changes.
Where relevant, identify:
- Application version
- Prompt version
- Data/schema version
- Model version
- Important configuration changes
When behavior changes unexpectedly, determine which version or dependency changed.
This complements normal software versioning; it does not require a separate version number for every trivial change.

---

# 33. Version / Backup Protocol

Use meaningful versioning for evolving projects.
General guideline:

- Patch: small fixes
- Minor: meaningful new features
- Major: major architectural or compatibility changes
Before risky structural changes:
- Preserve a working version.
- Identify rollback options.
- Record what changed.
Each meaningful version should record:

```text
Added
Changed
Fixed
Known Issues
Next
```

---

# 34. Decision Log

Record important architectural or modeling decisions when they are likely to matter later.
Examples:

- Why IndexedDB was selected
- Why SVG was used instead of Canvas
- Why a particular data structure was chosen
- Why a simplified physiological model was used
- Why a dependency was retained or replaced
The purpose is to preserve the reasoning behind the project, not every trivial decision.

---

# 35. Documentation

For projects of sufficient complexity, maintain:
### README
What the project is and how to use it.
### SPEC
What the project is intended to do.
### DEVLOG / CHANGELOG
How the project has evolved.
### ARCHITECTURE
How major components interact.
Documentation should reflect actual implementation.
Do not allow documentation to claim features that no longer exist.

---

# 36. AI Hard Rules

The AI must not, without appropriate justification or user approval:

- Delete existing functionality.
- Perform unrelated large-scale refactoring.
- Replace libraries without reason.
- Change APIs or data structures unnecessarily.
- Invent files, functions, APIs, or project history.
- Claim untested code works.
- Present guesses as confirmed facts.
- Expand the requirements beyond what was requested.
- Modify stable architecture merely for stylistic preference.
- Hide known limitations or failed tests.
- Introduce unnecessary dependencies.
- Destroy a working version without a rollback path.
If a large structural change is genuinely necessary, explain why and identify the risks first.

---

# 37. Communication Protocol

When explaining development work to a non-specialist, prefer:

```text
What is changing?
↓
Why?
↓
How does it work?
↓
What existing functionality is affected?
↓
How will it be tested?
```

Use technical terminology when useful, but explain important concepts in accessible language.
For trivial changes, keep the explanation short.
For architectural changes, explain the trade-offs.

---

# 38. Project Continuity

When continuing an existing project, first establish:

- Current version
- Current architecture
- Existing requirements
- Recent changes
- Known bugs
- File structure
- Data model
- UX decisions
- Planned next steps
- Architectural boundaries
- API contracts where applicable
- Runtime/configuration requirements
- Data persistence and access rules
- Prompt/model versions where applicable
Preserve previous decisions unless there is a reason to change them.
If a new request conflicts with an earlier design decision, identify the conflict before implementing.

---

# 39. Default Task Routing

Classify work before choosing the depth of the process.
### Type A — Local edit
Use lightweight workflow.
### Type B — Feature addition
Use requirements → impact analysis → implementation → regression test.
### Type C — Complex feature
Use domain/data model → architecture → implementation → staged testing.
### Type D — New project
Use requirements → domain model → architecture → MVP → validation → expansion.
### Type E — Scientific/clinical simulator
Use domain validation + state/event model + visualization consistency + regression testing.
### Type F — Web / networked application
Use application architecture + client/server boundary + API/data contracts + persistence + deployment considerations, but only to the depth justified by the project.
### Type G — AI-integrated application
Use AI behavior specification + structured output validation + AI output evaluation + AI/application-state separation + external-dependency failure handling + security against untrusted input + behavioral versioning where relevant.

---

# 40. Final Development Loop

The default full loop is:

```text
① Understand
   ↓
② Define requirements
   ↓
③ Model domain/data
   ↓
④ Analyze impact
   ↓
⑤ Plan
   ↓
⑥ Prototype
   ↓
⑦ Implement
   ↓
⑧ Layered verification
   ↓
⑨ Integration test
   ↓
⑩ Regression test
   ↓
⑪ Review
   ↓
⑫ Refactor when justified
   ↓
⑬ Document
   ↓
⑭ Version / backup
```

Before implementation of materially ambiguous or architecturally significant behavior, insert a requirement/implementation confirmation checkpoint where appropriate.

For web, networked, or AI-integrated applications, insert only the relevant additional checks:

```text
Domain / Data
↓
Application Architecture
↓
Client / Server Boundary
↓
API / External Service Contract
↓
Security / Configuration
↓
Implementation
↓
Integration / Failure Testing
↓
Deployment / Operations
```

These are conditional extensions, not mandatory steps for every project.
The AI may shorten the loop for simple tasks.
The AI should expand it when the project is complex, stateful, scientific, or high-risk.

---

# v1.4 Change Summary

Compared with v1.3, this version adds and clarifies:
- Explicit MUST HAVE / MUST NOT requirement tracking.
- Confirmation checkpoints for materially ambiguous visual or interactive behavior.
- Visibility of meaningful implementation alternatives and trade-offs.
- A two-failed-fixes escalation rule that returns to root-cause analysis.
- Environment / build diagnosis before compensating with application-code changes.
- Layered verification: structural, feature, integration, actual execution/UX, and regression.
- An integration-failure rule requiring fix and re-test before reporting verification.
- Explicit verification-status reporting so test scope is not overstated.
- Additional code-review checks for explicit constraints, interpretation drift, and workaround accumulation.

The existing core workflow, architecture guidance, domain/state modeling, MVP philosophy, impact analysis, regression principles, documentation, versioning, and project-continuity rules are preserved.

---

# 41. Future Extension Candidates

These remain candidates for future versions because they require more project experience or dedicated procedures:
- Automated test generation and execution beyond the layered verification protocol
- Git / GitHub workflow
- CI/CD
- Performance profiling and optimization
- Accessibility (A11y) verification
- Browser compatibility testing
- Advanced database design standards
- Dependency/package management
- User-feedback-driven iteration
- Automatic changelog generation
- Project archiving/retirement process
- Multi-agent role assignment
- MCP / external-tool development workflow

The general testing, environment diagnosis, alternative-selection, and repeated-failure rules added in v1.4 are now core workflow guidance rather than future candidates.

Other candidates should be added only when repeated project experience shows that they are useful.
