# DevCraft: Master Design Class Diagram (DCD) Specification
## Unified 5-Subsystem Object-Oriented Architecture (Team Synthesis)

> **Course**: IN2901 Software Development Project  
> **Institution**: Faculty of Information Technology, University of Moratuwa  
> **Team**: Team DoD (Team 22)  
> **System**: DevCraft — A Guided MERN Stack Learning Platform & Developer Community  
> **Supervisor**: Ms. M.N. Chandimali  
> **Industry Mentor**: Mr. H.K. Gaminda Ishara (Creative Software)  

---

## 👥 Integrated Team Members & Subsystem Scope

| Index No | Student Name | Assigned Feature Module | Core Classes & Stereotypes |
| :--- | :--- | :--- | :--- |
| **244068K** | **Gunasekara M.I.T.** | **Feature 01: The Guided Coding Workspace & Anti-Boredom Engine** | `IDEWorkspace`, `InstructionsPanel`, `MonacoEditorWrapper`, `LivePreviewRenderer`, `ContextualCheckModal`, `MemePopupManager`, `IDEStateManager`, `ASTValidationService`, `JestSandboxRunner`, `ProjectStepModel`, `MemeModel`, `LearningProgressModel` |
| **244230C** | **Wijesiri K.S.K.** | **Feature 02: Theory Dojo \| Integrated Domain Class Diagram** | `Lesson`, `LessonProgress`, `Video`, `VideoCheckpoint`, `Concept`, `ConceptProgress`, `Question`, `QuestionVersion`, `Blank`, `AcceptedAnswer`, `QuizAttempt`, `AttemptConcept`, `AttemptQuestion`, `Response`, `DailyStreak`, `LearningPosition`, `GenerationJob` |
| **244118P** | **Madhushan M.A. / Anushka** | **Feature 03: Debugging Simulator & Gamified Leaderboard** | `DebugSession`, `DebugChallenge`, `ChallengeTestCase`, `DebugAttempt`, `DebuggingService`, `CodeEvaluator`, `EvaluationResult`, `XPEvent`, `EarnedXP`, `XPService`, `LeaderboardService`, `LeaderboardEntry` |
| **244096T** | **Kalhari L.T.** | **Feature 04: Dual Purpose Community (Blog & Chat)** | `Blog`, `BlogLike`, `Comment`, `Hashtag`, `EngagementAnalytics`, `Community`, `CommunityMembership`, `CommunityInvitation`, `DiscussionChat`, `ChatMessage`, `Report`, `Follow`, `VerifiedBadge` |
| **244047V** | **Dinisuru P.W.L.** | **Feature 05: Hybrid Mentorship & Discount Rewards** | `MentorProfile`, `AvailabilitySlot`, `Booking`, `BookingService`, `CoinWallet`, `CoinTransaction`, `AIConversation`, `AIRequest`, `AIMentorService`, `DiscountReward`, `RewardPolicy`, `CoinPackage`, `CoinTopUp`, `Payment`, `PaymentService`, `RewardService` |
| **Central** | **Team Core** | **Central User Anchor & Gamification Highway** | `User` (Shared identity linking workspace progress, dojo streaks, debug sessions, community blogs, and mentorship wallets) |

---

## 🗄️ Detailed Class Dictionary by Subsystem

### 1. Central Core: User Identity Anchor
* **`User`** (`<<Shared Account / Central Identity>>`):
  * Unifies the account identities across all teammate modules:
    * `244096T (Community)`: `userId`, `username`, `email`, `profileImage`, `isVerifiedMentor`, `+ viewProfile()`, `+ followUser()`, `+ reportTarget()`
    * `244118P (Debug & XP)`: `userId`, `displayName`, `totalXP`, `globalRank`, `+ addXP()`
    * `244047V (Mentorship)`: `userId`, `name`, `email`
    * `244068K (Workspace)`: `userId`, `fatigueScore`, `+ updateFatigue()`
    * `244230C (Theory Dojo)`: `userId`, references in `LessonProgress`, `ConceptProgress`, `QuizAttempt`, and `DailyStreak`.

---

### 2. Feature 01: Guided Coding Workspace & Anti-Boredom (Gunasekara M.I.T. - 244068K)
* **`IDEWorkspace`** (`<<React Component>>`):
  * Attributes: `- projectId: String`, `- currentStepNumber: Int`, `- isEditorLocked: Boolean`, `- isPreviewActive: Boolean`
  * Methods: `+ loadProjectStep(stepId: String): void`, `+ handleCodeChange(code: String): void`, `+ runValidation(): Promise<TestReport>`, `+ togglePreview(): void`
* **`InstructionsPanel`** (`<<React Component>>`):
  * Attributes: `- stepTitle: String`, `- markdownContent: String`, `- hintList: List<String>`
  * Methods: `+ renderMarkdown(): JSX`, `+ revealNextHint(): void`, `+ toggleCollapsible(): void`
* **`MonacoEditorWrapper`** (`<<React Component>>`):
  * Attributes: `- editorInstance: IStandaloneCodeEditor`, `- currentLanguage: String = 'javascript'`, `- syntaxErrorMarkers: List<IMarker>`
  * Methods: `+ getCode(): String`, `+ setCode(content: String): void`, `+ setDiagnostics(markers: List): void`, `+ formatCode(): void`
* **`LivePreviewRenderer`** (`<<React Component>>`):
  * Attributes: `- iframeRef: RefObject`, `- srcDocContent: String`, `- consoleCaptureLog: List<String>`
  * Methods: `+ compileBundledSrc(): String`, `+ reloadSandbox(): void`, `+ postMessageToFrame(msg: Object): void`
* **`ContextualCheckModal`** (`<<React Component>>`):
  * Attributes: `- isOpen: Boolean`, `- checkpointQuestion: String`, `- selectedChoice: String`, `- isVerified: Boolean`
  * Methods: `+ handleOptionSelect(option: String): void`, `+ submitAnswer(): Boolean`, `+ closeModal(): void`
* **`MemePopupManager`** (`<<React Component>>`):
  * Attributes: `- consecutiveFailures: Int = 0`, `- isVisible: Boolean = false`, `- activeMemeData: MemeObject`
  * Methods: `+ evaluateTriggerConditions(): Boolean`, `+ fetchContextualMeme(): Promise<Meme>`, `+ dismissPopup(): void`
* **`IDEStateManager`** (`<<State Manager - Zustand>>`):
  * Attributes: `- activeProjectId: String`, `- currentCode: String`, `- validationStatus: String = 'IDLE'`, `- userAttemptsCount: Int = 0`
  * Methods: `+ updateCode(newCode: String): void`, `+ setValidationRunning(running: Boolean): void`, `+ resetWorkspace(): void`
* **`ASTValidationService`** (`<<Service>>`):
  * Attributes: `- parserConfig: Object`, `- bannedASTTokens: List<String>`
  * Methods: `+ parseToAST(sourceCode: String): Node`, `+ traverseRules(ast: Node, rules: List): ValidationResult`, `+ checkSyntaxOnly(sourceCode: String): Boolean`
* **`JestSandboxRunner`** (`<<Service>>`):
  * Attributes: `- isolatedVmTimeoutMs: Int = 3000`, `- memoryLimitMb: Int = 128`
  * Methods: `+ executeTests(userCode: String, testSpec: String): Promise<Report>`, `+ tearDownWorker(): void`
* **`ProjectStepModel`** (`<<Mongoose Schema>>`):
  * Attributes: `- stepId: ObjectId`, `- stepNumber: Int`, `- expectedASTTree: JSON`, `- unitTestAssertions: String`, `- solutionCode: String`
  * Methods: `+ findByStepNumber(num: Int): Promise<Step>`
* **`LearningProgressModel`** (`<<Mongoose Schema>>`):
  * Attributes: `- progressId: ObjectId`, `- userId: ObjectId`, `- projectId: ObjectId`, `- completedSteps: List<Int>`, `- totalTimeSpentSeconds: Int`, `- status: String`
  * Methods: `+ markStepCompleted(stepNum: Int): void`, `+ calculateProgressPct(): Float`
* **`MemeModel`** (`<<Mongoose Schema>>`):
  * Attributes: `- memeId: ObjectId`, `- imageUrl: String`, `- caption: String`, `- category: String`, `- upvotesCount: Int = 0`
  * Methods: `+ getRandomMeme(cat: String): Promise<Meme>`, `+ incrementUpvote(id: ObjectId): void`

---

### 3. Feature 02: Theory Dojo (Wijesiri K.S.K. - 244230C)
* **`Lesson`** (`<<Entity>>`): Root lesson unit in the MERN theory curriculum.
  * Attributes: `- lessonId: ObjectId`, `- title: String`, `- track: String`, `- orderIndex: Integer`, `- isPublished: Boolean`, `- durationMinutes: Integer`
  * Methods: `+ publish(): void`, `+ getCurriculum(): List<Concept>`
* **`LessonProgress`** (`<<Entity>>`): Learner completion tracking per lesson.
  * Attributes: `- progressId: ObjectId`, `- progressPct: Float`, `- isCompleted: Boolean`
  * Methods: `+ updateProgress(pct: Float): void`
* **`LearningPosition`** (`<<Entity>>`): Resumable bookmark state recording timestamp in instructional video and active tab.
  * Attributes: `- positionId: ObjectId / UUID`, `- userId: ObjectId`, `- currentLessonId: ObjectId`, `- videoId: ObjectId [0..1]`, `- positionSeconds: Integer`, `- activeTab: String`, `- updatedAt: DateTime`
  * Methods: `+ save(): void`, `+ resumeLesson(): Lesson`
* **`Video`** & **`VideoCheckpoint`** (`<<Entity>>`): Instructional video playback with timestamped interactive question checks.
  * Video: `- videoId: ObjectId`, `- videoUrl: String`, `- durationSeconds: Integer`, `- resolution: String`, `+ getPlaybackUrl(): String`
  * VideoCheckpoint: `- checkpointId: ObjectId`, `- timestampSeconds: Integer`, `- promptText: String`, `+ triggerModal(): void`
* **`Concept`** & **`ConceptProgress`** (`<<Entity>>`): Granular concepts contained in lessons and user mastery states.
  * Concept: `- conceptId: ObjectId`, `- title: String`, `- orderIndex: Integer`, `- contentMarkdown: String`, `+ renderContent(): String`
  * ConceptProgress: `- conceptProgressId: ObjectId`, `- isMastered: Boolean`, `+ setMastered(): void`
* **`Question`**, **`QuestionVersion`**, **`Blank`**, & **`AcceptedAnswer`** (`<<Entity>>`): Fill-in-the-blank code puzzle model supporting regex and string validation.
  * Question: `- questionId: ObjectId`, `- promptText: String`, `- difficulty: String`, `+ getLatestVersion(): QuestionVersion`
  * QuestionVersion: `- versionId: ObjectId`, `- templateSnippet: String`, `- versionNumber: Integer`, `+ compileTemplate(): String`
  * Blank: `- blankId: ObjectId`, `- tokenIndex: Integer`, `- hintText: String`, `+ validateAnswer(input: String): Boolean`
  * AcceptedAnswer: `- answerId: ObjectId`, `- acceptedText: String`, `- isRegex: Boolean`, `+ matches(text: String): Boolean`
* **`QuizAttempt`**, **`AttemptConcept`**, **`AttemptQuestion`**, & **`Response`** (`<<Entity>>`): Hierarchical attempt tracking recording learner submitted tokens and correctness.
  * QuizAttempt: `- attemptId: ObjectId`, `- score: Integer`, `- passed: Boolean`, `- startedAt: DateTime`, `- completedAt: DateTime`, `+ calculateGrade(): Float`
  * AttemptConcept: `- attemptConceptId: ObjectId`, `+ getScore(): Float`
  * AttemptQuestion: `- attemptQuestionId: ObjectId`, `+ isAllCorrect(): Boolean`
  * Response: `- responseId: ObjectId`, `- userSubmittedToken: String`, `- isCorrect: Boolean`, `+ grade(): Boolean`
* **`DailyStreak`** (`<<Entity>>`): Daily consistency streak counter with fire multiplier.
  * Attributes: `- streakId: ObjectId`, `- currentStreak: Integer`, `- longestStreak: Integer`, `- lastActivityDate: Date`, `- timezone: String = 'Asia/Colombo'`, `- fireLevel: Integer = 1`
  * Methods: `+ recordActivity(): void`, `+ evaluateStreak(): Integer`, `+ recordOncePerDay(): void`, `+ getFireAnimation(): String`
* **`GenerationJob`** (`<<Entity>>`): Background AI question generation job audit payload.
  * Attributes: `- jobId: UUID`, `- parentAttemptId: ObjectId`, `- lessonId: ObjectId`, `- status: String`, `- targetConceptIds: List<ObjectId>`, `- exclusionFingerprints: List<String>`, `- requestedAt: DateTime`
  * Methods: `+ recordOutcome(): void`, `+ runGeneration(): void`

---

### 4. Feature 03: Debugging Simulator & Gamified Leaderboard (Madhushan M.A. / Anushka - 244118P)
* **`DebugSession`** (`<<Entity>>`): Time-attack live game instance tracking lives remaining (default 3), timer countdown, and game outcome.
* **`DebugChallenge`** (`<<Entity>>`): Problem definition containing broken code, error logs, time limit, and reward base XP.
* **`ChallengeTestCase`** (`<<Entity>>`): Automated assertion scripts verifying candidate bug fixes.
* **`DebugAttempt`** (`<<Entity>>`): Code submission record evaluated by the evaluator.
* **`DebuggingService`** (`<<Service>>`): Orchestrates session creation, test evaluation, life penalty deductions, and surrender workflows.
* **`CodeEvaluator`** (`<<Interface>>`) & **`EvaluationResult`** (`<<Value Object>>`): Contract evaluating fix attempts against test cases.
* **`XPEvent`** (`<<Entity>>`): Audit log of awarded XP across the system.
* **`XPService`** (`<<Service>>`): Records XP events, calculates total XP, daily XP, and awards streak bonuses.
* **`EarnedXP`** (`<<Command Value>>`): Command payload carrying userId, sourceType, sourceEventId, amount, and debugResultId.
* **`LeaderboardService`** (`<<Service>>`): High-throughput rankings provider calculating global leaderboards, tier cutoffs, and cache refreshes.
* **`LeaderboardEntry`** (`<<Read Model>>`): Lightweight DTO formatted with userId, displayName, totalXP, and rank.

---

### 5. Feature 04: Dual-Purpose Community (Kalhari L.T. - 244096T)
* **`Blog`**, **`BlogLike`**, & **`Comment`** (`<<Entity>>`): Full-featured technical publishing and discussion engine with nested comments.
* **`Hashtag`** (`<<Entity>>`): Categorization tags indexing blogs and chat communities.
* **`EngagementAnalytics`** (`<<Entity>>`): Computes reader metrics (views, likes, comments, composite rating score).
* **`Community`**, **`CommunityMembership`**, & **`CommunityInvitation`** (`<<Entity>>`): Real-time community channel management with membership role approvals and invite links.
* **`DiscussionChat`** & **`ChatMessage`** (`<<Entity>>`): WebSocket room architecture for ongoing technical discussions.
* **`Report`** (`<<Entity>>`): User and content moderation flag mechanism.
  * Attributes: `- reportId: ObjectId`, `- targetType: String`, `- reason: String`, `- status: String`, `- createdAt: Date`
  * Methods: `+ resolveReport(): void`
* **`Follow`** (`<<Entity>>`): Peer social following graph connecting users as followers and followed creators.
  * Attributes: `- followId: ObjectId`, `- followedAt: Date`
* **`VerifiedBadge`** (`<<Entity>>`): Trust seal awarded to verified community mentors.
  * Attributes: `- badgeId: ObjectId`, `- issuedAt: Date`, `- isActive: Boolean`
  * Methods: `+ issueBadge(): void`, `+ revokeBadge(): void`

---

### 6. Feature 05: Hybrid Mentorship & Discount Rewards (Dinisuru P.W.L. - 244047V)
* **Mentorship & Booking**:
  * **`MentorProfile`** & **`AvailabilitySlot`** (`<<Entity>>`): Mentors declare bios, expertise, session prices, and bookable time slots.
  * **`Booking`** (`<<Entity>>`): 1-on-1 guidance reservation calculating base fees, discount deductions, and expiration holds.
  * **`BookingService`** (`<<Service>>`): Handles mentor search by skill, slot holds, and booking confirmations.
* **AI Mentor & Coins**:
  * **`CoinWallet`** & **`CoinTransaction`** (`<<Entity>>`): In-app coin ledger managing daily free allowances (10 coins reset at midnight in Asia/Colombo timezone) and purchased coins.
  * **`AIConversation`** & **`AIRequest`** (`<<Entity>>`): Stores AI query prompts, responses, token counts, and coin expenditure.
  * **`AIMentorService`** (`<<Service>>`): Evaluates wallet balance and queries AI model for student guidance.
* **Discount Rewards**:
  * **`DiscountReward`** & **`RewardPolicy`** (`<<Entity>>`): Translates leaderboard rankings into redeemable booking discounts.
  * **`RewardService`** (`<<Service>>`): Evaluates user ranks against policy and issues discount vouchers.
* **Payments & Coin Top-Ups**:
  * **`CoinPackage`** (`<<Entity>>`): Pre-configured coin packages available for purchase (`packageId`, `name`, `coinAmount`, `price`, `active`).
  * **`CoinTopUp`** (`<<Entity>>`): Purchase order for coin credits (`topUpId`, `coinsPurchased`, `purchaseAmount`, `status`, `creditedAt`, `+ creditWallet()`).
  * **`Payment`** & **`PaymentService`** (`<<Service>>`): Manages payment gateway checkout (PayHere), notifications, webhook verification, and order fulfillment.

---

## 🔗 Master Multiplicity & Relationship Verification (94 Relationships)

| Subsystem | Source Class | Connector | Target Class | Multiplicity | Business Semantics |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F01** | `IDEWorkspace` | Composition (`◆`) | `InstructionsPanel` | `1 : 1` | Workspace grid embeds 1 instructions panel. |
| **F01** | `IDEWorkspace` | Composition (`◆`) | `MonacoEditorWrapper` | `1 : 1` | Workspace embeds 1 active Monaco editor. |
| **F01** | `IDEWorkspace` | Composition (`◆`) | `LivePreviewRenderer` | `1 : 1` | Workspace embeds 1 live sandbox preview. |
| **F01** | `IDEWorkspace` | Composition (`◆`) | `ContextualCheckModal` | `1 : 0..1` | Workspace optionally renders a prerequisite checkpoint modal. |
| **F01** | `IDEWorkspace` | Composition (`◆`) | `MemePopupManager` | `1 : 1` | Workspace contains 1 anti-boredom meme popup manager. |
| **F01** | `MonacoEditorWrapper` | Dependency (`..>`) | `IDEStateManager` | `uses` | Monaco editor syncs buffer state with Zustand store. |
| **F01** | `IDEStateManager` | Dependency (`..>`) | `ASTValidationService` | `invokes API` | State manager dispatches code validation tasks. |
| **F01** | `ASTValidationService`| Association (`—`) | `ProjectStepModel` | `reads` | Validation service reads target AST rules for the step. |
| **F01** | `ASTValidationService`| Composition (`◆`) | `JestSandboxRunner` | `1 : 1` | Validation service encapsulates a Jest sandbox runner. |
| **F01** | `ASTValidationService`| Dependency (`..>`) | `LearningProgressModel`| `updates` | Successful validation advances learning progress. |
| **F01** | `MemePopupManager` | Dependency (`..>`) | `MemeModel` | `queries` | Meme manager queries random contextual memes on fatigue. |
| **F02** | `Lesson` | Composition (`◆`) | `Concept` | `1 : 1..*` | A lesson contains 1 or more theory concepts. |
| **F02** | `Lesson` | Composition (`◆`) | `Video` | `1 : 0..1` | A lesson optionally features an instructional video. |
| **F02** | `Video` | Composition (`◆`) | `VideoCheckpoint` | `1 : 0..*` | A video contains timestamped checkpoint questions. |
| **F02** | `VideoCheckpoint` | Association (`—`) | `QuestionVersion` | `1 : 1` | A video checkpoint prompts a specific question version. |
| **F02** | `Concept` | Composition (`◆`) | `Question` | `1 : 1..*` | A concept is assessed by code puzzle questions. |
| **F02** | `Question` | Composition (`◆`) | `QuestionVersion` | `1 : 1..*` | A question has 1 or more immutable version templates. |
| **F02** | `QuestionVersion` | Composition (`◆`) | `Blank` | `1 : 1..*` | A code question version has 1 or more missing blanks. |
| **F02** | `Blank` | Composition (`◆`) | `AcceptedAnswer` | `1 : 1..*` | A blank accepts valid string or regex pattern solutions. |
| **F02** | `Lesson` | Association (`—`) | `LessonProgress` | `1 : 0..*` | A lesson maintains completion progress records. |
| **F02** | `Lesson` | Association (`—`) | `QuizAttempt` | `1 : 0..*` | A lesson is assessed across multiple quiz attempts. |
| **F02** | `Concept` | Association (`—`) | `ConceptProgress` | `1 : 0..*` | A concept evaluates individual mastery states. |
| **F02** | `Concept` | Association (`—`) | `AttemptConcept` | `1 : 1..*` | A concept is targeted by attempt concept entries. |
| **F02** | `QuizAttempt` | Composition (`◆`) | `AttemptConcept` | `1 : 1..*` | A quiz attempt targets specific concept assessments. |
| **F02** | `AttemptConcept` | Composition (`◆`) | `AttemptQuestion` | `1 : 1..*` | An attempt concept breaks down into assigned questions. |
| **F02** | `QuestionVersion` | Association (`—`) | `AttemptQuestion` | `1 : 1..*` | A question version is instantiated in assigned questions. |
| **F02** | `AttemptQuestion` | Composition (`◆`) | `Response` | `1 : 1..*` | An assigned question captures blank response inputs. |
| **F02** | `Blank` | Association (`—`) | `Response` | `1 : 1..*` | A blank token is answered by a student response. |
| **F02** | `LessonProgress` | Association (`—`) | `LearningPosition` | `1 : 1` | A progress record holds the student's resume position. |
| **F02** | `Video` | Association (`—`) | `LearningPosition` | `1 : 0..*` | A video asset is referenced in learning resume positions. |
| **F02** | `QuizAttempt` | Dependency (`..>`) | `ConceptProgress` | `updates mastery`| A graded quiz attempt updates concept mastery flags. |
| **F02** | `QuizAttempt` | Dependency (`..>`) | `GenerationJob` | `requests AI` | A quiz attempt triggers AI question generation jobs. |
| **F02** | `GenerationJob` | Dependency (`..>`) | `QuestionVersion` | `produces` | A generation job produces validated question versions. |
| **F03** | `DebugChallenge` | Composition (`◆`) | `ChallengeTestCase` | `1 : 1..*` | A challenge defines 1 or more test cases. |
| **F03** | `DebugChallenge` | Association (`—`) | `DebugSession` | `1 : 0..*` | A challenge is tackled across multiple player sessions. |
| **F03** | `DebugSession` | Composition (`◆`) | `DebugAttempt` | `1 : 0..*` | A player session contains zero or more fix attempts. |
| **F03** | `DebuggingService` | Dependency (`..>`) | `DebugSession` | `manages` | Debugging service creates and manages session lifecycles. |
| **F03** | `DebuggingService` | Dependency (`..>`) | `CodeEvaluator` | `evaluates` | Debugging service invokes the test evaluator. |
| **F03** | `CodeEvaluator` | Dependency (`..>`) | `EvaluationResult` | `returns` | Evaluator returns test execution reports. |
| **F03** | `DebugAttempt` | Dependency (`..>`) | `EvaluationResult` | `records` | Attempt logs evaluation output. |
| **F03** | `DebugSession` | Dependency (`..>`) | `XPEvent` | `dispatches` | A won debug session dispatches an XP reward event. |
| **F03** | `XPService` | Dependency (`..>`) | `XPEvent` | `records` | XP service records and tallies XP transactions. |
| **F03** | `XPService` | Dependency (`..>`) | `EarnedXP` | `accepts` | XP service processes earned XP command values. |
| **F03** | `LeaderboardService`| Dependency (`..>`) | `LeaderboardEntry` | `returns` | Leaderboard service computes ranked leader entries. |
| **F04** | `Blog` | Composition (`◆`) | `BlogLike` | `1 : 0..*` | A blog post receives zero or more likes. |
| **F04** | `Blog` | Composition (`◆`) | `Comment` | `1 : 0..*` | A blog post hosts discussion comment threads. |
| **F04** | `Blog` | Association (`—`) | `Hashtag` | `1..* : 0..*` | Blogs are tagged with topic hashtags. |
| **F04** | `Blog` | Association (`—`) | `EngagementAnalytics` | `1 : 1` | A blog's traffic and ratings are tracked by analytics. |
| **F04** | `Community` | Composition (`◆`) | `CommunityMembership`| `1 : 0..*` | A community enrolls participant members. |
| **F04** | `Community` | Composition (`◆`) | `DiscussionChat` | `1 : 0..*` | A community hosts zero or more chat rooms. |
| **F04** | `DiscussionChat` | Composition (`◆`) | `ChatMessage` | `1 : 0..*` | A chat channel streams real-time messages. |
| **F04** | `Community` | Composition (`◆`) | `CommunityInvitation`| `1 : 0..*` | A community issues membership invitation requests. |
| **F04** | `ChatMessage` | Association (`—`) | `ChatMessage` | `0..1 : 0..*` | A chat message can reply to a parent message. |
| **F05** | `MentorProfile` | Composition (`◆`) | `AvailabilitySlot` | `1 : 0..*` | A mentor creates zero or more availability slots. |
| **F05** | `AvailabilitySlot` | Association (`—`) | `Booking` | `1 : 0..*` | An availability slot holds booking history. |
| **F05** | `BookingService` | Dependency (`..>`) | `MentorProfile` | `searches` | Booking service searches mentor profiles. |
| **F05** | `BookingService` | Dependency (`..>`) | `AvailabilitySlot` | `holds/releases` | Booking service holds and releases calendar slots. |
| **F05** | `BookingService` | Dependency (`..>`) | `Booking` | `creates` | Booking service confirms guidance bookings. |
| **F05** | `CoinWallet` | Composition (`◆`) | `CoinTransaction` | `1 : 0..*` | A wallet records ledger transactions. |
| **F05** | `AIConversation` | Composition (`◆`) | `AIRequest` | `1 : 0..*` | An AI conversation contains query requests. |
| **F05** | `AIMentorService` | Dependency (`..>`) | `CoinTransaction` | `charges` | AI mentor service verifies coin balances and charges tokens. |
| **F05** | `AIMentorService` | Dependency (`..>`) | `AIRequest` | `processes` | AI mentor service processes and logs query prompts. |
| **F05** | `DiscountReward` | Association (`—`) | `Booking` | `0..1 : 0..*` | A discount voucher is optionally redeemed against a booking. |
| **F05** | `RewardPolicy` | Composition (`◆`) | `DiscountReward` | `1 : 0..*` | Standing reward policy issues discount rewards. |
| **F05** | `Payment` | Association (`—`) | `Booking` | `0..* : 0..1` | A booking checkout is processed through payment gateway. |
| **F05** | `CoinPackage` | Association (`—`) | `CoinTopUp` | `1 : 0..*` | A coin package is selected for top-up purchase. |
| **F05** | `CoinTopUp` | Association (`—`) | `CoinWallet` | `0..* : 1` | A top-up purchase credits coins to the user wallet. |
| **F05** | `CoinTopUp` | Association (`—`) | `Payment` | `0..* : 0..1` | A coin top-up purchase generates a payment transaction. |
| **F05** | `PaymentService` | Dependency (`..>`) | `Payment` | `verifies` | Payment service verifies gateway webhooks. |
| **F05** | `PaymentService` | Dependency (`..>`) | `CoinTopUp` | `fulfills` | Payment service fulfills coin credits upon payment confirmation. |
| **F05** | `PaymentService` | Dependency (`..>`) | `Booking` | `confirms` | Payment service confirms mentor booking upon payment. |
| **F05** | `RewardService` | Dependency (`..>`) | `RewardPolicy` | `evaluates` | Reward service evaluates standing discount policies. |
| **Cross** | `User` | Association (`—`) | `LearningProgressModel`| `1 : 0..*` | User tracks progress across workspace projects. |
| **Cross** | `User` | Association (`—`) | `Lesson` | `1 : 0..*` | Expert user authors educational theory lessons. |
| **Cross** | `User` | Association (`—`) | `LessonProgress` | `1 : 0..*` | User tracks completion progress across lessons. |
| **Cross** | `User` | Association (`—`) | `ConceptProgress` | `1 : 0..*` | User tracks concept mastery records. |
| **Cross** | `User` | Association (`—`) | `QuizAttempt` | `1 : 0..*` | User submits attempts on theory dojo quizzes. |
| **Cross** | `User` | Association (`—`) | `DailyStreak` | `1 : 1` | Each user maintains exactly 1 daily activity streak. |
| **Cross** | `User` | Association (`—`) | `DebugSession` | `1 : 0..*` | User initiates live debugging simulator sessions. |
| **Cross** | `User` | Association (`—`) | `XPEvent` | `1 : 0..*` | User accumulates verified experience points. |
| **Cross** | `User` | Association (`—`) | `Blog` | `1 : 0..*` | User authors technical blog articles. |
| **Cross** | `User` | Association (`—`) | `Community` | `1 : 0..*` | User creates public or private chat communities. |
| **Cross** | `User` | Association (`—`) | `CommunityMembership` | `1 : 0..*` | User participates as a member of chat communities. |
| **Cross** | `User` | Association (`—`) | `Follow` | `1 : 0..*` | User follows other developers on the platform. |
| **Cross** | `User` | Association (`—`) | `Report` | `1 : 0..*` | User flags inappropriate content or behavior. |
| **Cross** | `User` | Association (`—`) | `VerifiedBadge` | `1 : 0..1` | Qualified user earns a verified mentor community badge. |
| **Cross** | `User` | Association (`—`) | `MentorProfile` | `1 : 0..1` | Expert user registers a public mentor profile. |
| **Cross** | `User` | Association (`—`) | `CoinWallet` | `1 : 1` | Each user owns exactly 1 coin wallet. |
| **Cross** | `User` | Association (`—`) | `Booking` | `1 : 0..*` | User reserves 1-on-1 time with human mentors. |
| **Cross** | `User` | Association (`—`) | `CoinTopUp` | `1 : 0..*` | User buys coin packages to replenish AI token wallet. |
| **Cross** | `LearningProgressModel`| Dependency (`..>`) | `XPService` | `* : 1` | Workspace completion dispatches earned XP. |
| **Cross** | `QuizAttempt` | Dependency (`..>`) | `XPService` | `* : 1` | Theory puzzle completion dispatches earned XP. |
| **Cross** | `LeaderboardService`| Dependency (`..>`) | `RewardService` | `1 : *` | Weekly leaderboard standings trigger discount reward issuance. |
| **Cross** | `VerifiedBadge` | Dependency (`..>`) | `MentorProfile` | `1 : 1` | Community verification badge validates mentor credibility. |

---

## 🛡️ Zero-Isolation Architecture Guarantee

Every single class (71 out of 71) across all 5 subsystems and the central core is connected with formal UML typed relationships:
1. **No Orphan Classes**: Validated with automated AST traversal (`Isolated Classes: 0`).
2. **Strict Adherence to Source Diagrams**: Every class, attribute, method, relationship type (composition `◆`, aggregation `◇`, dependency `..>`, association `—`), and multiplicity matches the source diagrams created by the 5 subsystem owners:
   - Feature 01: `class_diagram_workspace.drawio`
   - Feature 02: `Class_UML_Notation (1).drawio`
   - Feature 03: `DevCraft-Anushka-Class-Diagrams-v3.drawio`
   - Feature 04: `DevCraft_Community_Blogs_Class_Diagram.drawio`
   - Feature 05: `DevCraft-Class-Diagram.drawio`
3. **Cross-Subsystem Cohesion**: Integrated through the central `User` identity and cross-module bridges (e.g., F01 Progress & F02 Quiz Attempts feeding F03 `XPService`, F03 `LeaderboardService` driving F05 `RewardService` discounts, F04 `VerifiedBadge` endorsing F05 `MentorProfile`).
