# DevCraft: Master Conceptual Entity-Relationship (ER) Specification
## Integrated 5-Feature Enterprise Data Model (Peter Chen Notation)
### Built Directly from Teammate Source Models: `docs/diagrams/Teammates diagrams/`

> **Course**: IN2901 Software Development Project  
> **Institution**: Faculty of Information Technology, University of Moratuwa  
> **Team**: Team DoD (Team 22)  
> **System**: DevCraft — A Guided MERN Stack Learning Platform & Developer Community  
> **Supervisor**: Ms. M.N. Chandimali  
> **Industry Mentor**: Mr. H.K. Gaminda Ishara (Creative Software)  

---

## 👥 Integrated Team Members & Subsystem Scope

| Index No | Student Name | Assigned Feature Module | Source ER File (`.drawio`) | Entities (Chen Notation) |
| :--- | :--- | :--- | :--- | :--- |
| **244068K** | **Gunasekara M.I.T.** | **Feature 01: Guided Coding Workspace & Anti-Boredom Engine** | `er_diagram_feature01.drawio` | `GUIDED_PROJECT`, `PROJECT_STEP`, `AST_VALIDATION_RULE`, `UNIT_TEST_SPEC`, `CONCEPT_CHECKPOINT`, `USER_PROJECT_PROGRESS`, `USER_STEP_ATTEMPT`, `ANTI_BOREDOM_MEME`, `MEME_TRIGGER_LOG` |
| **244230C** | **Wijesiri K.S.K.** | **Feature 02: Theory Dojo \| Integrated Chen ER Diagram** | `ER_Chen_Corrected (1).drawio` | `Lesson`, `Video`, `VideoCheckpoint`, `Concept`, `Question`, `QuestionVersion`, `Blank`, `AcceptedAnswer`, `LessonProgress`, `ConceptProgress`, `QuizAttempt`, `AttemptConcept`, `AttemptQuestion`, `Response`, `LearningPosition`, `StreakActivity`, `GenerationJob` |
| **244118P** | **Madhushan M.A. / Anushka** | **Feature 03: Debugging Simulator & Gamified Leaderboard** | `ER-diagram-anushka.drawio.drawio` | `DebugChallenge`, `ChallengeTestCase`, `DebugSession`, `DebugAttempt`, `XPEvent` |
| **244096T** | **Kalhari L.T.** | **Feature 04: Dual Purpose Community (Blog & Chat)** | `DevCraft_ER_Diagram_Clean_Layout.drawio` | `BLOG`, `HASHTAG`, `COMMENT`, `BLOG_LIKE`, `FOLLOW`, `COMMUNITY`, `COMMUNITY_MEMBERSHIP`, `COMMUNITY_INVITATION`, `VERIFIED_MENTOR_BADGE`, `REPORT`, `ENGAGEMENT_ANALYTICS`, `CHAT_MESSAGE` |
| **244047V** | **Dinisuru P.W.L.** | **Feature 05: Hybrid Mentorship & Discount Rewards** | `DevCraft-ER-Large-Font.drawio` | `MENTOR_PROFILE`, `MENTOR_EXPERTISE`, `AVAILABILITY_SLOT`, `BOOKING`, `COIN_WALLET`, `COIN_TRANSACTION`, `DAILY_ALLOCATION`, `AI_CONVERSATION`, `AI_REQUEST`, `DISCOUNT_REWARD`, `REWARD_POLICY`, `COIN_PACKAGE`, `COIN_TOP_UP`, `PAYMENT` |
| **Central** | **Team Core** | **Central User Anchor & Identity Highway** | Unified Anchor | `USER` (Central entity providing shared foreign key anchoring across all 5 modules) |

---

## 🏛️ Master Entity Dictionary (Direct from Teammates' Source Draw.io)

### 1. Central Anchor: `USER`
* **Attributes**:
  * `userId` / `_id` / `user_id` (PK): Primary user identifier (ObjectId / UUID).
  * `username`: Unique login handle and leaderboard display handle.
  * `email`: Verified contact email address.
  * `displayName` / `name`: Full public name.
  * `profileImage`: Cloudinary/S3 avatar image URL.
  * `totalXP`: Aggregated cumulative experience points across all platform activities.
  * `globalRank`: Computed competitive platform ranking.
  * `fatigueScore`: Real-time session fatigue score (0.00 – 1.00) driving meme triggers.
  * `isVerifiedMentor`: Flag earned via mentor verification audits.
  * `createdAt`: Account registration timestamp.

---

### 2. Feature 01: Guided Coding Workspace (Gunasekara M.I.T. - 244068K)
* **`GUIDED_PROJECT`**: Curated real-world project syllabus.
  * `_id` (PK), `title`, `slug`, `difficulty`, `track`, `totalSteps`, `rewardXP`.
* **`PROJECT_STEP`**: Sequential atomic milestones in the Monaco editor.
  * `_id` (PK), `stepNumber`, `title`, `instructionsMarkdown`, `initialCode`, `solutionCode`.
* **`AST_VALIDATION_RULE`**: Babel/ESPrima syntactic AST assertions.
  * `_id` (PK), `targetNodeType`, `requiredProperties`, `errorMessage`.
* **`UNIT_TEST_SPEC`**: Behavioral Jest unit assertions executed silently in sandboxed workers.
  * `_id` (PK), `testName`, `assertionScript`, `timeoutMs`.
* **`CONCEPT_CHECKPOINT`**: Prerequisite theoretical gatekeeper questions.
  * `_id` (PK), `questionText`, `correctAnswer`, `penaltySeconds`.
* **`USER_PROJECT_PROGRESS`**: Enrolled user track state.
  * `_id` (PK), `currentStepIndex`, `completedSteps`, `status`, `lastActiveTimestamp`.
* **`USER_STEP_ATTEMPT`**: Historical submission log.
  * `_id` (PK), `submittedCode`, `passStatus`, `executionTimeMs`, `attemptTimestamp`.
* **`ANTI_BOREDOM_MEME`**: Dynamic meme catalog with contextual triggers.
  * `_id` (PK), `title`, `imageUrl`, `caption`, `category`, `upvotesCount`.
* **`MEME_TRIGGER_LOG`**: Anti-boredom trigger history recording meme exposures.
  * `_id` (PK), `triggerReason`, `userReaction`, `triggeredAt`.

---

### 3. Feature 02: Theory Dojo (Wijesiri K.S.K. - 244230C)
* **`Lesson`**: Core curriculum module.
  * `lessonId` (PK), `title`, `track`, `orderIndex`, `isPublished`, `durationMinutes`.
* **`Video`**: Instructional video asset.
  * `videoId` (PK), `videoUrl`, `durationSeconds`, `resolution`.
* **`VideoCheckpoint`**: Interactive prompt checkpoints within video timeline.
  * `checkpointId` (PK), `timestampSeconds`, `promptText`.
* **`Concept`**: Sub-topic concept contained in a lesson.
  * `conceptId` (PK), `title`, `orderIndex`, `contentMarkdown`.
* **`Question`**: Interactive quiz problem.
  * `questionId` (PK), `promptText`, `difficulty`.
* **`QuestionVersion`**: Immutable question version template.
  * `versionId` (PK), `templateSnippet`, `versionNumber`.
* **`Blank`**: Fill-in-the-blank code puzzle token.
  * `blankId` (PK), `tokenIndex`, `hintText`.
* **`AcceptedAnswer`**: Valid acceptable answers for blanks.
  * `answerId` (PK), `acceptedText`, `isRegex`.
* **`LessonProgress`**: Learner lesson progress tracking.
  * `progressId` (PK), `progressPct`, `isCompleted`.
* **`LearningPosition`**: Bookmark state to resume video or lesson.
  * `positionId` (PK), `positionSeconds`, `activeTab`.
* **`ConceptProgress`**: Learner concept mastery record.
  * `conceptProgressId` (PK), `isMastered`.
* **`QuizAttempt`**: Overall quiz attempt instance.
  * `attemptId` (PK), `score`, `passed`, `startedAt`, `completedAt`.
* **`AttemptConcept`**: Hierarchical concept breakdown within a quiz attempt.
  * `attemptConceptId` (PK).
* **`AttemptQuestion`**: Question instance assigned within a quiz attempt.
  * `attemptQuestionId` (PK).
* **`Response`**: Submitted token per blank.
  * `responseId` (PK), `userSubmittedToken`, `isCorrect`.
* **`StreakActivity`**: Once-per-day study consistency record.
  * `streakId` (PK), `activityDate`, `xpEarned`, `lessonsCompleted`.
* **`GenerationJob`**: Background AI question template generation audit payload.
  * `jobId` (PK), `status`, `targetConcept`.

---

### 4. Feature 03: Debugging Simulator & Leaderboard (Madhushan M.A. - 244118P)
* **`DebugChallenge`**: Interactive bug puzzle.
  * `challengeId` (PK), `brokenCode`, `errorLog`, `timeLimitSeconds`, `baseXP`.
* **`ChallengeTestCase`**: Hidden Jest test cases validating fixes.
  * `testCaseId` (PK), `description`, `testScript`.
* **`DebugSession`**: Live time-attack session instance (3 lives).
  * `sessionId` (PK), `status`, `livesRemaining`, `timeRemainingSeconds`, `score`.
* **`DebugAttempt`**: Individual run attempt submitted in a session.
  * `attemptId` (PK), `attemptNo`, `submittedCode`, `submittedAt`, `evaluationStatus`, `feedback`.
* **`XPEvent`**: Platform gamification ledger event.
  * `xpEventId` (PK), `amount`, `sourceType`, `sourceEventId`, `awardedAt`.

---

### 5. Feature 04: Dual Purpose Community (Kalhari L.T. - 244096T)
* **`BLOG`**: Community markdown knowledge article.
  * `blog_id` (PK), `content`, `category`, `status`, `createdAt`, `updatedAt`.
* **`ENGAGEMENT_ANALYTICS`**: Article performance metrics.
  * `analytics_id` (PK), `views`, `likes`, `comments`, `ratingScore`.
* **`BLOG_LIKE`**: Appreciation reaction on a blog.
  * `like_id` (PK), `createdAt`.
* **`COMMENT`**: Nested discussion thread on a blog.
  * `comment_id` (PK), `text`, `createdAt`, `parent_comment_id`.
* **`HASHTAG`**: Topic tag for classification and search.
  * `hashtag_id` (PK), `name`.
* **`FOLLOW`**: User-to-user social follow graph.
  * `follow_id` (PK), `followedAt`.
* **`VERIFIED_MENTOR_BADGE`**: Community credibility verification badge.
  * `badge_id` (PK), `issuedAt`, `isActive`.
* **`REPORT`**: Moderation flag for inappropriate content.
  * `report_id` (PK), `targetType`, `reason`, `status`, `createdAt`.
* **`COMMUNITY`**: Real-time discussion group/channel.
  * `community_id` (PK), `name`, `description`, `visibility`, `createdAt`.
* **`COMMUNITY_MEMBERSHIP`**: User membership state in a community.
  * `membership_id` (PK), `status`, `joinedAt`.
* **`COMMUNITY_INVITATION`**: Direct member invite into a community.
  * `invitation_id` (PK), `status`, `sentAt`.
* **`CHAT_MESSAGE`**: Streaming message in WebSocket chat room.
  * `message_id` (PK), `content`, `sentAt`, `editedAt`.

---

### 6. Feature 05: Hybrid Mentorship & Discount Rewards (Dinisuru P.W.L. - 244047V)
* **`MENTOR_PROFILE`**: Expert tutor marketplace listing.
  * `mentorId` (PK), `biography`, `verified`, `sessionPrice`, `durationMinutes`.
* **`MENTOR_EXPERTISE`**: Normalized expertise domain of a mentor.
  * `expertise` (PK).
* **`AVAILABILITY_SLOT`**: Bookable calendar interval.
  * `slotId` (PK), `startTime`, `endTime`, `status`.
* **`BOOKING`**: 1-on-1 scheduled mentorship guidance session.
  * `bookingId` (PK), `topic`, `status`, `originalPrice`, `discountAmount`, `finalAmount`, `holdExpiresAt`.
* **`COIN_WALLET`**: Student coin balance ledger.
  * `walletId` (PK), `freeCoins`, `purchasedCoins`, `dailyFreeAllowance`, `lastDailyReset`, `resetTimeZone`.
* **`COIN_TRANSACTION`**: Audit record of coin deductions and credits.
  * `transactionId` (PK), `type`, `balanceType`, `amount`, `createdAt`, `referenceType`, `referenceId`.
* **`DAILY_ALLOCATION`**: Record of free daily AI query token allowances.
  * `allocationId` (PK), `allocationDate`.
* **`AI_CONVERSATION`**: AI prompt/chat session container.
  * `conversationId` (PK), `createdAt`.
* **`AI_REQUEST`**: In-IDE AI prompt and completion logs.
  * `requestId` (PK), `question`, `response`, `coinCost`, `inputTokens`, `outputTokens`, `status`, `createdAt`.
* **`DISCOUNT_REWARD`**: Leaderboard loyalty discount coupon.
  * `rewardId` (PK), `percentage`, `expiresAt`, `status`, `rankingPeriod`.
* **`REWARD_POLICY`**: Standing rules defining leaderboard discounts.
  * `policyId` (PK), `minRank`, `maxRank`, `discountPercentage`, `validityDays`, `active`.
* **`COIN_PACKAGE`**: Commercial coin packages.
  * `packageId` (PK), `name`, `coinAmount`, `price`, `active`.
* **`COIN_TOP_UP`**: Coin purchase order instance.
  * `topUpId` (PK), `coinsPurchased`, `purchaseAmount`, `status`, `creditedAt`.
* **`PAYMENT`**: Payment gateway transaction record (PayHere).
  * `paymentId` (PK), `providerReference`, `amount`, `currency`, `status`, `paidAt`.

---

## 🔗 Master Relationship Cardinality Matrix (Chen Model)

| Subsystem | Entity 1 | Relationship (Rhombus) | Entity 2 | Cardinality 1 | Cardinality 2 | Business Semantics |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F01** | `GUIDED_PROJECT` | `composes` | `PROJECT_STEP` | `1` | `1..N` | A guided project is composed of an ordered sequence of development steps. |
| **F01** | `PROJECT_STEP` | `configures` | `AST_VALIDATION_RULE` | `1` | `1..N` | A step specifies one or more AST structural rules. |
| **F01** | `PROJECT_STEP` | `evaluates with`| `UNIT_TEST_SPEC` | `1` | `1..N` | A step defines automated Jest unit test assertions. |
| **F01** | `PROJECT_STEP` | `interrupts with`| `CONCEPT_CHECKPOINT` | `1` | `0..1` | A step optionally interrupts with a mandatory theory check. |
| **F01** | `GUIDED_PROJECT` | `progress of` | `USER_PROJECT_PROGRESS`| `1` | `0..N` | A project tracks progress instances across users. |
| **F01** | `USER_PROJECT_PROGRESS` | `logs` | `USER_STEP_ATTEMPT` | `1` | `0..N` | A project progress instance logs individual step attempts. |
| **F01** | `PROJECT_STEP` | `receives` | `USER_STEP_ATTEMPT` | `1` | `0..N` | A step receives learner code execution attempts. |
| **F01** | `ANTI_BOREDOM_MEME`| `logged in` | `MEME_TRIGGER_LOG` | `1` | `0..N` | A meme catalog item is logged upon trigger exposure. |
| **F02** | `Lesson` | `contains` | `Concept` | `1` | `1..N` | A lesson contains one or more theory concepts. |
| **F02** | `Lesson` | `uses` | `Video` | `1` | `0..1` | A lesson optionally features an instructional video. |
| **F02** | `Video` | `checkpoints` | `VideoCheckpoint` | `1` | `0..N` | A video contains interactive timestamped question checkpoints. |
| **F02** | `VideoCheckpoint` | `prompts` | `QuestionVersion` | `1` | `1` | A checkpoint prompt references a specific question version. |
| **F02** | `Concept` | `assesses` | `Question` | `1` | `1..N` | A concept is assessed by code puzzle questions. |
| **F02** | `Question` | `versions` | `QuestionVersion` | `1` | `1..N` | A question has one or more immutable version templates. |
| **F02** | `QuestionVersion` | `blanks` | `Blank` | `1` | `1..N` | A version template has one or more fill-in-the-blank tokens. |
| **F02** | `Blank` | `accepts` | `AcceptedAnswer` | `1` | `1..N` | A blank accepts valid string or regex pattern solutions. |
| **F02** | `Lesson` | `progress` | `LessonProgress` | `1` | `0..N` | A lesson maintains completion progress records. |
| **F02** | `LessonProgress` | `resume` | `LearningPosition` | `1` | `1` | A progress record holds the student's resume position. |
| **F02** | `Video` | `current video` | `LearningPosition` | `1` | `0..N` | A video asset is referenced in learning resume positions. |
| **F02** | `Concept` | `mastery` | `ConceptProgress` | `1` | `0..N` | A concept evaluates individual mastery states. |
| **F02** | `Lesson` | `assessed in` | `QuizAttempt` | `1` | `0..N` | A lesson is assessed across multiple quiz attempts. |
| **F02** | `QuizAttempt` | `targets` | `AttemptConcept` | `1` | `1..N` | A quiz attempt targets specific concept assessments. |
| **F02** | `Concept` | `targeted` | `AttemptConcept` | `1` | `1..N` | A concept is targeted by attempt concept entries. |
| **F02** | `QuizAttempt` | `assigns` | `AttemptQuestion` | `1` | `1..N` | A quiz attempt assigns specific randomized questions. |
| **F02** | `QuestionVersion` | `assigned version` | `AttemptQuestion` | `1` | `1..N` | A question version is instantiated in assigned questions. |
| **F02** | `AttemptQuestion` | `responses` | `Response` | `1` | `1..N` | An assigned question captures blank response inputs. |
| **F02** | `Blank` | `answered` | `Response` | `1` | `1..N` | A blank token is answered by a student response. |
| **F02** | `QuizAttempt` | `requests` | `GenerationJob` | `1` | `0..N` | A quiz attempt triggers AI question generation jobs. |
| **F02** | `GenerationJob` | `produces` | `QuestionVersion` | `1` | `1..N` | A generation job produces validated question versions. |
| **F03** | `DebugChallenge` | `defines` | `ChallengeTestCase` | `1` | `1..N` | A challenge defines test assertions to verify bug fixes. |
| **F03** | `DebugChallenge` | `uses` | `DebugSession` | `1` | `0..N` | A challenge is tackled across multiple player sessions. |
| **F03** | `DebugSession` | `contains` | `DebugAttempt` | `1` | `0..N` | A session logs attempts against lives. |
| **F03** | `DebugSession` | `awards XP` | `XPEvent` | `0..1` | `1` | A won debug session creates an XP award event. |
| **F04** | `BLOG` | `measured by` | `ENGAGEMENT_ANALYTICS` | `1` | `1` | A blog's traffic and ratings are tracked by analytics. |
| **F04** | `BLOG` | `has` | `BLOG_LIKE` | `1` | `0..N` | A blog receives reader appreciation likes. |
| **F04** | `BLOG` | `has` | `COMMENT` | `1` | `0..N` | A blog post hosts discussion comment threads. |
| **F04** | `BLOG` | `has` | `HASHTAG` | `0..N` | `0..N` | Blogs are tagged with topic hashtags. |
| **F04** | `COMMUNITY` | `has members` | `COMMUNITY_MEMBERSHIP` | `1` | `0..N` | A chat community enrolls participant members. |
| **F04** | `COMMUNITY` | `has` | `COMMUNITY_INVITATION` | `1` | `0..N` | A community issues membership invitation requests. |
| **F04** | `COMMUNITY` | `has` | `CHAT_MESSAGE` | `1` | `0..N` | A chat channel streams real-time messages. |
| **F04** | `CHAT_MESSAGE` | `replies to` | `CHAT_MESSAGE` | `0..1` | `0..N` | A chat message can reply to a parent message. |
| **F05** | `MENTOR_PROFILE` | `specializes in` | `MENTOR_EXPERTISE` | `1` | `1..N` | A mentor profile specializes in categorized domains. |
| **F05** | `MENTOR_PROFILE` | `offers` | `AVAILABILITY_SLOT` | `1` | `0..N` | Mentors publish bookable calendar slots. |
| **F05** | `AVAILABILITY_SLOT` | `has bookings` | `BOOKING` | `1` | `0..N` | A slot is reserved by a student booking. |
| **F05** | `COIN_WALLET` | `records` | `COIN_TRANSACTION` | `1` | `0..N` | A wallet logs token transactions. |
| **F05** | `COIN_WALLET` | `allocates` | `DAILY_ALLOCATION` | `1` | `0..N` | A wallet tracks daily free AI token allowances. |
| **F05** | `AI_CONVERSATION` | `contains` | `AI_REQUEST` | `1` | `0..N` | An AI conversation contains query requests. |
| **F05** | `AI_REQUEST` | `deducts` | `COIN_TRANSACTION` | `0..1` | `1` | An AI query deducts token fee from transaction ledger. |
| **F05** | `REWARD_POLICY` | `governs` | `DISCOUNT_REWARD` | `1` | `0..N` | Standing reward policy issues discount rewards. |
| **F05** | `DISCOUNT_REWARD` | `applied to` | `BOOKING` | `0..1` | `0..1` | A discount voucher is optionally applied to a booking. |
| **F05** | `BOOKING` | `paid through` | `PAYMENT` | `0..1` | `0..N` | A booking checkout transaction is processed via PayHere. |
| **F05** | `COIN_WALLET` | `receives top-ups` | `COIN_TOP_UP` | `1` | `0..N` | A coin wallet receives credited coin top-up orders. |
| **F05** | `COIN_PACKAGE` | `selected for` | `COIN_TOP_UP` | `1` | `0..N` | A standardized coin package is chosen for top-up. |
| **F05** | `COIN_TOP_UP` | `paid through` | `PAYMENT` | `0..1` | `0..N` | A coin top-up purchase is completed through PayHere. |
| **Core** | `USER` | `tracks` | `USER_PROJECT_PROGRESS`| `1` | `0..N` | User tracks progress across workspace projects. |
| **Core** | `USER` | `triggers` | `MEME_TRIGGER_LOG` | `1` | `0..N` | User triggers anti-boredom memes during fatigue. |
| **Core** | `USER` | `authors` | `Lesson` | `1` | `0..N` | Expert user authors educational theory lessons. |
| **Core** | `USER` | `tracks` | `LessonProgress` | `1` | `0..N` | User tracks completion progress across lessons. |
| **Core** | `USER` | `has` | `ConceptProgress` | `1` | `0..N` | User tracks concept mastery records. |
| **Core** | `USER` | `takes` | `QuizAttempt` | `1` | `0..N` | User submits attempts on theory dojo quizzes. |
| **Core** | `USER` | `daily events` | `StreakActivity` | `1` | `0..N` | User maintains a study consistency streak. |
| **Core** | `USER` | `starts` | `DebugSession` | `1` | `0..N` | User initiates live debugging simulator sessions. |
| **Core** | `USER` | `earns` | `XPEvent` | `1` | `0..N` | User accumulates verified experience points. |
| **Core** | `USER` | `creates` | `BLOG` | `1` | `0..N` | User authors technical blog articles. |
| **Core** | `USER` | `likes` | `BLOG_LIKE` | `1` | `0..N` | User likes articles written by community peers. |
| **Core** | `USER` | `writes` | `COMMENT` | `1` | `0..N` | User participates in article discussion threads. |
| **Core** | `USER` | `follows` | `FOLLOW` | `1` | `0..N` | User follows other developers on the platform. |
| **Core** | `USER` | `has` | `VERIFIED_MENTOR_BADGE`| `1` | `0..1` | Qualified user earns a verified mentor community badge. |
| **Core** | `USER` | `reports` | `REPORT` | `1` | `0..N` | User flags inappropriate content or behavior. |
| **Core** | `USER` | `creates` | `COMMUNITY` | `1` | `0..N` | User creates public or private chat communities. |
| **Core** | `USER` | `member of` | `COMMUNITY_MEMBERSHIP` | `1` | `0..N` | User participates as a member of chat communities. |
| **Core** | `USER` | `invites` | `COMMUNITY_INVITATION` | `1` | `0..N` | User invites colleagues into communities. |
| **Core** | `USER` | `sends` | `CHAT_MESSAGE` | `1` | `0..N` | User posts messages in active community chats. |
| **Core** | `USER` | `has profile` | `MENTOR_PROFILE` | `1` | `0..1` | Expert user registers a public mentor profile. |
| **Core** | `USER` | `makes` | `BOOKING` | `1` | `0..N` | User reserves 1-on-1 time with human mentors. |
| **Core** | `USER` | `owns` | `COIN_WALLET` | `1` | `1` | Each user possesses an AI query token coin wallet. |
| **Core** | `USER` | `starts` | `AI_CONVERSATION` | `1` | `0..N` | User initiates conversations with AI Assistant. |
| **Core** | `USER` | `purchases` | `COIN_TOP_UP` | `1` | `0..N` | User buys coin packages to replenish AI token wallet. |
| **Core** | `USER` | `earns` | `DISCOUNT_REWARD` | `1` | `0..N` | High leaderboard rank awards platform discount vouchers. |

---

