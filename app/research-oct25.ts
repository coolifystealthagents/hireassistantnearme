import type { ResearchPost } from './fleet-data';
const published = '2026-10-25';
export const oct25ResearchPosts: readonly ResearchPost[] = [
  {
    "slug": "hireassistantnearme-attributing-rework-in-reference-check",
    "title": "Attributing rework in reference check",
    "excerpt": "A source-bounded assistant hiring guide for assistant hiring managers: reference check without unsupported decisions.",
    "published": "2026-10-25",
    "image": "/images/oct25/hireassistantnearme-attributing-rework-in-reference-check.png",
    "imageAlt": "Attributing rework in reference check study diagram",
    "keyStats": [
      {
        "value": "1",
        "label": "Declared unit of analysis",
        "source": "Protocol design"
      },
      {
        "value": "8",
        "label": "Analysis sections",
        "source": "Study plan"
      },
      {
        "value": "4",
        "label": "Authoritative context sources",
        "source": "Source register"
      }
    ],
    "takeaways": [
      "A source-bounded assistant hiring guide for assistant hiring managers: reference check without unsupported decisions.",
      "Preserve the denominator and every exclusion before interpreting a rate.",
      "Report unresolved records and limitations beside the result.",
      "The study measures documentation and workflow evidence, not candidate ability or future performance."
    ],
    "sections": [
      {
        "heading": "Research question and scope",
        "body": "This protocol asks how reference check can be described from the operational record in assistant hiring. It is a measurement method, not a performance score or a legal conclusion.\n\nThe scope is one defined population and one observation window. State what is excluded before looking at results so the denominator cannot drift.\n\nThe method does not estimate an industry rate and does not compare staffing models. It produces a repeatable description that an owner can review.\n\nKeep the reference check queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work.\n\nRecord the exact reference check source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since."
      },
      {
        "heading": "Population and unit of analysis",
        "body": "The unit is one reference check case, from the opening event through the recorded close. Keep the unit explicit so linked events are not counted as independent cases.\n\nRecord the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. A count without a denominator is not a measurement.\n\nExclude reopened cases only when the reopening did not create a new requirement. Preserve the exclusion count and the reason.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed.\n\nWrite the next action as a sentence with an owner and a time. \"Review the reference check exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is."
      },
      {
        "heading": "Definitions that make the measure reproducible",
        "body": "Write down the start event, the stop event, the pause rule, and the treatment of missing evidence before collecting data.\n\nDefine the primary measure and one or two supporting measures. A measure without a stated denominator or observation window is not yet a measure.\n\nIf a definition changes during the review, keep the earlier classification and apply the new rule only to later cases.\n\nUse a short reason code for every reference check exception. The code should describe the evidence problem, not the person who found it.\n\nKeep the reference check queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work."
      },
      {
        "heading": "Evidence standard and data dictionary",
        "body": "Each case needs the source, the observation time, the field it supports, and the reviewer. Mark missing, unavailable, and confirmed negative values separately.\n\nUse a pseudonymous case key. Keep the crosswalk between the key and the identity in an approved system with restricted access.\n\nRecord the version or date of every source. A current screenshot cannot prove what the record said when the first action was taken.\n\nReview one reference check case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed."
      },
      {
        "heading": "Sampling and collection",
        "body": "Use consecutive cases where possible, then stratify by channel, owner, or risk class. Convenience samples hide the cases that fail the control.\n\nInclude adverse cases: a missing source, a conflicting instruction, an unavailable owner, and a tight deadline. These cases show whether the process stops safely.\n\nRecord the collection window, the eligible count, the sample size, and every exclusion. The reviewer should be able to reproduce the sample.\n\nIf the reference check rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable.\n\nUse a short reason code for every reference check exception. The code should describe the evidence problem, not the person who found it."
      },
      {
        "heading": "Analysis and reporting",
        "body": "Report the eligible count, the sample, the missing-field rate, the exception rate, and the unresolved count at the close of the window.\n\nSeparate observation from interpretation. A high completion rate on a small easy sample is not evidence of a strong control.\n\nKeep the case-level detail available for review. Summary charts without the underlying records cannot support a decision.\n\nKeep a named backup for the reference check owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable.\n\nReview one reference check case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count."
      },
      {
        "heading": "Limitations and sources of error",
        "body": "The record may be incomplete, delayed, or maintained by someone outside the team. The method cannot infer missing work from a clean summary.\n\nSmall samples are sensitive to one case. Report the instability instead of presenting a precise-looking percentage.\n\nThe cited public sources frame recordkeeping, privacy, security, and internal control practice. They do not provide a result for this sample.\n\nDo not copy a value from a prior reference check record because it looks familiar. Reopen the source, confirm the version, and record what changed.\n\nIf the reference check rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable."
      },
      {
        "heading": "Review cadence and next action",
        "body": "Set a review date and name the owner who will read the result. A report without a review owner is an archive, not a control.\n\nChoose one next action: fix the source, simplify the field, change the queue, or stop the work until the owner decides. Record the decision and the next check.\n\nRepeat the protocol after the change. Compare the same definitions and report what moved, what did not, and what remains unknown.\n\nClose the loop with the person who raised the reference check issue. A record that is internally complete but never confirmed by the requester is only half closed."
      }
    ],
    "tables": [
      {
        "caption": "Evidence checkpoints for reference check",
        "columns": [
          "Checkpoint",
          "Evidence to review"
        ],
        "rows": [
          [
            "Ownership",
            "Named owner and authority limit"
          ],
          [
            "Input readiness",
            "Source, version, and missing fields"
          ],
          [
            "Exception visibility",
            "Reason code, owner, and due date"
          ],
          [
            "Completion evidence",
            "Accepted record and next review"
          ]
        ]
      }
    ],
    "sources": [
      {
        "name": "U.S. Department of Labor",
        "url": "https://www.dol.gov/"
      },
      {
        "name": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "name": "Federal Trade Commission",
        "url": "https://www.ftc.gov/"
      }
    ],
    "related": [
      {
        "label": "Research library",
        "href": "/research"
      },
      {
        "label": "Related study",
        "href": "/research/hireassistantnearme-capacity-planning-for-offer-packet"
      }
    ]
  },
  {
    "slug": "hireassistantnearme-capacity-planning-for-offer-packet",
    "title": "Capacity planning for offer packet",
    "excerpt": "A source-bounded assistant hiring guide for assistant hiring managers: offer packet without unsupported decisions.",
    "published": "2026-10-25",
    "image": "/images/oct25/hireassistantnearme-capacity-planning-for-offer-packet.png",
    "imageAlt": "Capacity planning for offer packet study diagram",
    "keyStats": [
      {
        "value": "1",
        "label": "Declared unit of analysis",
        "source": "Protocol design"
      },
      {
        "value": "8",
        "label": "Analysis sections",
        "source": "Study plan"
      },
      {
        "value": "4",
        "label": "Authoritative context sources",
        "source": "Source register"
      }
    ],
    "takeaways": [
      "A source-bounded assistant hiring guide for assistant hiring managers: offer packet without unsupported decisions.",
      "Preserve the denominator and every exclusion before interpreting a rate.",
      "Report unresolved records and limitations beside the result.",
      "The study measures documentation and workflow evidence, not candidate ability or future performance."
    ],
    "sections": [
      {
        "heading": "Research question and scope",
        "body": "This protocol asks how offer packet can be described from the operational record in assistant hiring. It is a measurement method, not a performance score or a legal conclusion.\n\nThe scope is one defined population and one observation window. State what is excluded before looking at results so the denominator cannot drift.\n\nThe method does not estimate an industry rate and does not compare staffing models. It produces a repeatable description that an owner can review.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed.\n\nWrite the next action as a sentence with an owner and a time. \"Review the offer packet exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is."
      },
      {
        "heading": "Population and unit of analysis",
        "body": "The unit is one offer packet case, from the opening event through the recorded close. Keep the unit explicit so linked events are not counted as independent cases.\n\nRecord the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. A count without a denominator is not a measurement.\n\nExclude reopened cases only when the reopening did not create a new requirement. Preserve the exclusion count and the reason.\n\nUse a short reason code for every offer packet exception. The code should describe the evidence problem, not the person who found it.\n\nKeep the offer packet queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work."
      },
      {
        "heading": "Definitions that make the measure reproducible",
        "body": "Write down the start event, the stop event, the pause rule, and the treatment of missing evidence before collecting data.\n\nDefine the primary measure and one or two supporting measures. A measure without a stated denominator or observation window is not yet a measure.\n\nIf a definition changes during the review, keep the earlier classification and apply the new rule only to later cases.\n\nReview one offer packet case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed."
      },
      {
        "heading": "Evidence standard and data dictionary",
        "body": "Each case needs the source, the observation time, the field it supports, and the reviewer. Mark missing, unavailable, and confirmed negative values separately.\n\nUse a pseudonymous case key. Keep the crosswalk between the key and the identity in an approved system with restricted access.\n\nRecord the version or date of every source. A current screenshot cannot prove what the record said when the first action was taken.\n\nIf the offer packet rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable.\n\nUse a short reason code for every offer packet exception. The code should describe the evidence problem, not the person who found it."
      },
      {
        "heading": "Sampling and collection",
        "body": "Use consecutive cases where possible, then stratify by channel, owner, or risk class. Convenience samples hide the cases that fail the control.\n\nInclude adverse cases: a missing source, a conflicting instruction, an unavailable owner, and a tight deadline. These cases show whether the process stops safely.\n\nRecord the collection window, the eligible count, the sample size, and every exclusion. The reviewer should be able to reproduce the sample.\n\nKeep a named backup for the offer packet owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable.\n\nReview one offer packet case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count."
      },
      {
        "heading": "Analysis and reporting",
        "body": "Report the eligible count, the sample, the missing-field rate, the exception rate, and the unresolved count at the close of the window.\n\nSeparate observation from interpretation. A high completion rate on a small easy sample is not evidence of a strong control.\n\nKeep the case-level detail available for review. Summary charts without the underlying records cannot support a decision.\n\nDo not copy a value from a prior offer packet record because it looks familiar. Reopen the source, confirm the version, and record what changed.\n\nIf the offer packet rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable."
      },
      {
        "heading": "Limitations and sources of error",
        "body": "The record may be incomplete, delayed, or maintained by someone outside the team. The method cannot infer missing work from a clean summary.\n\nSmall samples are sensitive to one case. Report the instability instead of presenting a precise-looking percentage.\n\nThe cited public sources frame recordkeeping, privacy, security, and internal control practice. They do not provide a result for this sample.\n\nClose the loop with the person who raised the offer packet issue. A record that is internally complete but never confirmed by the requester is only half closed.\n\nKeep a named backup for the offer packet owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable."
      },
      {
        "heading": "Review cadence and next action",
        "body": "Set a review date and name the owner who will read the result. A report without a review owner is an archive, not a control.\n\nChoose one next action: fix the source, simplify the field, change the queue, or stop the work until the owner decides. Record the decision and the next check.\n\nRepeat the protocol after the change. Compare the same definitions and report what moved, what did not, and what remains unknown.\n\nRecord the exact offer packet source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since."
      }
    ],
    "tables": [
      {
        "caption": "Evidence checkpoints for offer packet",
        "columns": [
          "Checkpoint",
          "Evidence to review"
        ],
        "rows": [
          [
            "Ownership",
            "Named owner and authority limit"
          ],
          [
            "Input readiness",
            "Source, version, and missing fields"
          ],
          [
            "Exception visibility",
            "Reason code, owner, and due date"
          ],
          [
            "Completion evidence",
            "Accepted record and next review"
          ]
        ]
      }
    ],
    "sources": [
      {
        "name": "U.S. Department of Labor",
        "url": "https://www.dol.gov/"
      },
      {
        "name": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "name": "Federal Trade Commission",
        "url": "https://www.ftc.gov/"
      }
    ],
    "related": [
      {
        "label": "Research library",
        "href": "/research"
      },
      {
        "label": "Related study",
        "href": "/research/hireassistantnearme-attributing-rework-in-reference-check"
      }
    ]
  },
  {
    "slug": "hireassistantnearme-early-warning-signals-in-trial-plan",
    "title": "Early-warning signals in trial plan",
    "excerpt": "A source-bounded assistant hiring guide for assistant hiring managers: trial plan without unsupported decisions.",
    "published": "2026-10-25",
    "image": "/images/oct25/hireassistantnearme-early-warning-signals-in-trial-plan.png",
    "imageAlt": "Early-warning signals in trial plan study diagram",
    "keyStats": [
      {
        "value": "1",
        "label": "Declared unit of analysis",
        "source": "Protocol design"
      },
      {
        "value": "8",
        "label": "Analysis sections",
        "source": "Study plan"
      },
      {
        "value": "4",
        "label": "Authoritative context sources",
        "source": "Source register"
      }
    ],
    "takeaways": [
      "A source-bounded assistant hiring guide for assistant hiring managers: trial plan without unsupported decisions.",
      "Preserve the denominator and every exclusion before interpreting a rate.",
      "Report unresolved records and limitations beside the result.",
      "The study measures documentation and workflow evidence, not candidate ability or future performance."
    ],
    "sections": [
      {
        "heading": "Research question and scope",
        "body": "This protocol asks how trial plan can be described from the operational record in assistant hiring. It is a measurement method, not a performance score or a legal conclusion.\n\nThe scope is one defined population and one observation window. State what is excluded before looking at results so the denominator cannot drift.\n\nThe method does not estimate an industry rate and does not compare staffing models. It produces a repeatable description that an owner can review.\n\nUse a short reason code for every trial plan exception. The code should describe the evidence problem, not the person who found it.\n\nKeep the trial plan queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work."
      },
      {
        "heading": "Population and unit of analysis",
        "body": "The unit is one trial plan case, from the opening event through the recorded close. Keep the unit explicit so linked events are not counted as independent cases.\n\nRecord the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. A count without a denominator is not a measurement.\n\nExclude reopened cases only when the reopening did not create a new requirement. Preserve the exclusion count and the reason.\n\nReview one trial plan case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed."
      },
      {
        "heading": "Definitions that make the measure reproducible",
        "body": "Write down the start event, the stop event, the pause rule, and the treatment of missing evidence before collecting data.\n\nDefine the primary measure and one or two supporting measures. A measure without a stated denominator or observation window is not yet a measure.\n\nIf a definition changes during the review, keep the earlier classification and apply the new rule only to later cases.\n\nIf the trial plan rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable.\n\nUse a short reason code for every trial plan exception. The code should describe the evidence problem, not the person who found it."
      },
      {
        "heading": "Evidence standard and data dictionary",
        "body": "Each case needs the source, the observation time, the field it supports, and the reviewer. Mark missing, unavailable, and confirmed negative values separately.\n\nUse a pseudonymous case key. Keep the crosswalk between the key and the identity in an approved system with restricted access.\n\nRecord the version or date of every source. A current screenshot cannot prove what the record said when the first action was taken.\n\nKeep a named backup for the trial plan owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable.\n\nReview one trial plan case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count."
      },
      {
        "heading": "Sampling and collection",
        "body": "Use consecutive cases where possible, then stratify by channel, owner, or risk class. Convenience samples hide the cases that fail the control.\n\nInclude adverse cases: a missing source, a conflicting instruction, an unavailable owner, and a tight deadline. These cases show whether the process stops safely.\n\nRecord the collection window, the eligible count, the sample size, and every exclusion. The reviewer should be able to reproduce the sample.\n\nDo not copy a value from a prior trial plan record because it looks familiar. Reopen the source, confirm the version, and record what changed.\n\nIf the trial plan rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable."
      },
      {
        "heading": "Analysis and reporting",
        "body": "Report the eligible count, the sample, the missing-field rate, the exception rate, and the unresolved count at the close of the window.\n\nSeparate observation from interpretation. A high completion rate on a small easy sample is not evidence of a strong control.\n\nKeep the case-level detail available for review. Summary charts without the underlying records cannot support a decision.\n\nClose the loop with the person who raised the trial plan issue. A record that is internally complete but never confirmed by the requester is only half closed.\n\nKeep a named backup for the trial plan owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable."
      },
      {
        "heading": "Limitations and sources of error",
        "body": "The record may be incomplete, delayed, or maintained by someone outside the team. The method cannot infer missing work from a clean summary.\n\nSmall samples are sensitive to one case. Report the instability instead of presenting a precise-looking percentage.\n\nThe cited public sources frame recordkeeping, privacy, security, and internal control practice. They do not provide a result for this sample.\n\nRecord the exact trial plan source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since.\n\nDo not copy a value from a prior trial plan record because it looks familiar. Reopen the source, confirm the version, and record what changed."
      },
      {
        "heading": "Review cadence and next action",
        "body": "Set a review date and name the owner who will read the result. A report without a review owner is an archive, not a control.\n\nChoose one next action: fix the source, simplify the field, change the queue, or stop the work until the owner decides. Record the decision and the next check.\n\nRepeat the protocol after the change. Compare the same definitions and report what moved, what did not, and what remains unknown.\n\nWrite the next action as a sentence with an owner and a time. \"Review the trial plan exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is."
      }
    ],
    "tables": [
      {
        "caption": "Evidence checkpoints for trial plan",
        "columns": [
          "Checkpoint",
          "Evidence to review"
        ],
        "rows": [
          [
            "Ownership",
            "Named owner and authority limit"
          ],
          [
            "Input readiness",
            "Source, version, and missing fields"
          ],
          [
            "Exception visibility",
            "Reason code, owner, and due date"
          ],
          [
            "Completion evidence",
            "Accepted record and next review"
          ]
        ]
      }
    ],
    "sources": [
      {
        "name": "U.S. Department of Labor",
        "url": "https://www.dol.gov/"
      },
      {
        "name": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "name": "Federal Trade Commission",
        "url": "https://www.ftc.gov/"
      }
    ],
    "related": [
      {
        "label": "Research library",
        "href": "/research"
      },
      {
        "label": "Related study",
        "href": "/research/hireassistantnearme-attributing-rework-in-reference-check"
      }
    ]
  },
  {
    "slug": "hireassistantnearme-measuring-response-time-for-work-sample",
    "title": "Measuring response time for work sample",
    "excerpt": "A source-bounded assistant hiring guide for assistant hiring managers: work sample without unsupported decisions.",
    "published": "2026-10-25",
    "image": "/images/oct25/hireassistantnearme-measuring-response-time-for-work-sample.png",
    "imageAlt": "Measuring response time for work sample study diagram",
    "keyStats": [
      {
        "value": "1",
        "label": "Declared unit of analysis",
        "source": "Protocol design"
      },
      {
        "value": "8",
        "label": "Analysis sections",
        "source": "Study plan"
      },
      {
        "value": "4",
        "label": "Authoritative context sources",
        "source": "Source register"
      }
    ],
    "takeaways": [
      "A source-bounded assistant hiring guide for assistant hiring managers: work sample without unsupported decisions.",
      "Preserve the denominator and every exclusion before interpreting a rate.",
      "Report unresolved records and limitations beside the result.",
      "The study measures documentation and workflow evidence, not candidate ability or future performance."
    ],
    "sections": [
      {
        "heading": "Research question and scope",
        "body": "This protocol asks how work sample can be described from the operational record in assistant hiring. It is a measurement method, not a performance score or a legal conclusion.\n\nThe scope is one defined population and one observation window. State what is excluded before looking at results so the denominator cannot drift.\n\nThe method does not estimate an industry rate and does not compare staffing models. It produces a repeatable description that an owner can review.\n\nRecord the exact work sample source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since.\n\nDo not copy a value from a prior work sample record because it looks familiar. Reopen the source, confirm the version, and record what changed."
      },
      {
        "heading": "Population and unit of analysis",
        "body": "The unit is one work sample case, from the opening event through the recorded close. Keep the unit explicit so linked events are not counted as independent cases.\n\nRecord the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. A count without a denominator is not a measurement.\n\nExclude reopened cases only when the reopening did not create a new requirement. Preserve the exclusion count and the reason.\n\nWrite the next action as a sentence with an owner and a time. \"Review the work sample exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is.\n\nClose the loop with the person who raised the work sample issue. A record that is internally complete but never confirmed by the requester is only half closed."
      },
      {
        "heading": "Definitions that make the measure reproducible",
        "body": "Write down the start event, the stop event, the pause rule, and the treatment of missing evidence before collecting data.\n\nDefine the primary measure and one or two supporting measures. A measure without a stated denominator or observation window is not yet a measure.\n\nIf a definition changes during the review, keep the earlier classification and apply the new rule only to later cases.\n\nKeep the work sample queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work.\n\nRecord the exact work sample source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since."
      },
      {
        "heading": "Evidence standard and data dictionary",
        "body": "Each case needs the source, the observation time, the field it supports, and the reviewer. Mark missing, unavailable, and confirmed negative values separately.\n\nUse a pseudonymous case key. Keep the crosswalk between the key and the identity in an approved system with restricted access.\n\nRecord the version or date of every source. A current screenshot cannot prove what the record said when the first action was taken.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed.\n\nWrite the next action as a sentence with an owner and a time. \"Review the work sample exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is."
      },
      {
        "heading": "Sampling and collection",
        "body": "Use consecutive cases where possible, then stratify by channel, owner, or risk class. Convenience samples hide the cases that fail the control.\n\nInclude adverse cases: a missing source, a conflicting instruction, an unavailable owner, and a tight deadline. These cases show whether the process stops safely.\n\nRecord the collection window, the eligible count, the sample size, and every exclusion. The reviewer should be able to reproduce the sample.\n\nUse a short reason code for every work sample exception. The code should describe the evidence problem, not the person who found it.\n\nKeep the work sample queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work."
      },
      {
        "heading": "Analysis and reporting",
        "body": "Report the eligible count, the sample, the missing-field rate, the exception rate, and the unresolved count at the close of the window.\n\nSeparate observation from interpretation. A high completion rate on a small easy sample is not evidence of a strong control.\n\nKeep the case-level detail available for review. Summary charts without the underlying records cannot support a decision.\n\nReview one work sample case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed."
      },
      {
        "heading": "Limitations and sources of error",
        "body": "The record may be incomplete, delayed, or maintained by someone outside the team. The method cannot infer missing work from a clean summary.\n\nSmall samples are sensitive to one case. Report the instability instead of presenting a precise-looking percentage.\n\nThe cited public sources frame recordkeeping, privacy, security, and internal control practice. They do not provide a result for this sample.\n\nIf the work sample rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable."
      },
      {
        "heading": "Review cadence and next action",
        "body": "Set a review date and name the owner who will read the result. A report without a review owner is an archive, not a control.\n\nChoose one next action: fix the source, simplify the field, change the queue, or stop the work until the owner decides. Record the decision and the next check.\n\nRepeat the protocol after the change. Compare the same definitions and report what moved, what did not, and what remains unknown.\n\nKeep a named backup for the work sample owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable."
      }
    ],
    "tables": [
      {
        "caption": "Evidence checkpoints for work sample",
        "columns": [
          "Checkpoint",
          "Evidence to review"
        ],
        "rows": [
          [
            "Ownership",
            "Named owner and authority limit"
          ],
          [
            "Input readiness",
            "Source, version, and missing fields"
          ],
          [
            "Exception visibility",
            "Reason code, owner, and due date"
          ],
          [
            "Completion evidence",
            "Accepted record and next review"
          ]
        ]
      }
    ],
    "sources": [
      {
        "name": "U.S. Department of Labor",
        "url": "https://www.dol.gov/"
      },
      {
        "name": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "name": "Federal Trade Commission",
        "url": "https://www.ftc.gov/"
      }
    ],
    "related": [
      {
        "label": "Research library",
        "href": "/research"
      },
      {
        "label": "Related study",
        "href": "/research/hireassistantnearme-attributing-rework-in-reference-check"
      }
    ]
  },
  {
    "slug": "hireassistantnearme-testing-completeness-in-interview-panel",
    "title": "Testing completeness in interview panel",
    "excerpt": "A source-bounded assistant hiring guide for assistant hiring managers: interview panel without unsupported decisions.",
    "published": "2026-10-25",
    "image": "/images/oct25/hireassistantnearme-testing-completeness-in-interview-panel.png",
    "imageAlt": "Testing completeness in interview panel study diagram",
    "keyStats": [
      {
        "value": "1",
        "label": "Declared unit of analysis",
        "source": "Protocol design"
      },
      {
        "value": "8",
        "label": "Analysis sections",
        "source": "Study plan"
      },
      {
        "value": "4",
        "label": "Authoritative context sources",
        "source": "Source register"
      }
    ],
    "takeaways": [
      "A source-bounded assistant hiring guide for assistant hiring managers: interview panel without unsupported decisions.",
      "Preserve the denominator and every exclusion before interpreting a rate.",
      "Report unresolved records and limitations beside the result.",
      "The study measures documentation and workflow evidence, not candidate ability or future performance."
    ],
    "sections": [
      {
        "heading": "Research question and scope",
        "body": "This protocol asks how interview panel can be described from the operational record in assistant hiring. It is a measurement method, not a performance score or a legal conclusion.\n\nThe scope is one defined population and one observation window. State what is excluded before looking at results so the denominator cannot drift.\n\nThe method does not estimate an industry rate and does not compare staffing models. It produces a repeatable description that an owner can review.\n\nWrite the next action as a sentence with an owner and a time. \"Review the interview panel exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is.\n\nClose the loop with the person who raised the interview panel issue. A record that is internally complete but never confirmed by the requester is only half closed."
      },
      {
        "heading": "Population and unit of analysis",
        "body": "The unit is one interview panel case, from the opening event through the recorded close. Keep the unit explicit so linked events are not counted as independent cases.\n\nRecord the opening count, additions, withdrawals, resolutions, and unresolved items at the end of the window. A count without a denominator is not a measurement.\n\nExclude reopened cases only when the reopening did not create a new requirement. Preserve the exclusion count and the reason.\n\nKeep the interview panel queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work.\n\nRecord the exact interview panel source and the time it was observed. A later reviewer should be able to tell whether the value was current when the first action was taken, even if the record has changed since."
      },
      {
        "heading": "Definitions that make the measure reproducible",
        "body": "Write down the start event, the stop event, the pause rule, and the treatment of missing evidence before collecting data.\n\nDefine the primary measure and one or two supporting measures. A measure without a stated denominator or observation window is not yet a measure.\n\nIf a definition changes during the review, keep the earlier classification and apply the new rule only to later cases.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed.\n\nWrite the next action as a sentence with an owner and a time. \"Review the interview panel exception\" is not a next action; \"Mina checks the missing source by 2pm and routes it to the owner\" is."
      },
      {
        "heading": "Evidence standard and data dictionary",
        "body": "Each case needs the source, the observation time, the field it supports, and the reviewer. Mark missing, unavailable, and confirmed negative values separately.\n\nUse a pseudonymous case key. Keep the crosswalk between the key and the identity in an approved system with restricted access.\n\nRecord the version or date of every source. A current screenshot cannot prove what the record said when the first action was taken.\n\nUse a short reason code for every interview panel exception. The code should describe the evidence problem, not the person who found it.\n\nKeep the interview panel queue separate from the general inbox. A shared queue without a named owner hides the oldest item and makes the weekly report look cleaner than the work."
      },
      {
        "heading": "Sampling and collection",
        "body": "Use consecutive cases where possible, then stratify by channel, owner, or risk class. Convenience samples hide the cases that fail the control.\n\nInclude adverse cases: a missing source, a conflicting instruction, an unavailable owner, and a tight deadline. These cases show whether the process stops safely.\n\nRecord the collection window, the eligible count, the sample size, and every exclusion. The reviewer should be able to reproduce the sample.\n\nReview one interview panel case end to end in the weekly meeting. Check the source, the decision, the destination record, and the confirmation rather than only the completion count.\n\nWhen a source is unavailable, record that fact instead of leaving the field blank. Missing, unavailable, and confirmed negative are three different states and should not be collapsed."
      },
      {
        "heading": "Analysis and reporting",
        "body": "Report the eligible count, the sample, the missing-field rate, the exception rate, and the unresolved count at the close of the window.\n\nSeparate observation from interpretation. A high completion rate on a small easy sample is not evidence of a strong control.\n\nKeep the case-level detail available for review. Summary charts without the underlying records cannot support a decision.\n\nIf the interview panel rule changes, keep the earlier classification and apply the new rule to later cases. A definition that changes quietly makes the trend unreadable.\n\nUse a short reason code for every interview panel exception. The code should describe the evidence problem, not the person who found it."
      },
      {
        "heading": "Limitations and sources of error",
        "body": "The record may be incomplete, delayed, or maintained by someone outside the team. The method cannot infer missing work from a clean summary.\n\nSmall samples are sensitive to one case. Report the instability instead of presenting a precise-looking percentage.\n\nThe cited public sources frame recordkeeping, privacy, security, and internal control practice. They do not provide a result for this sample.\n\nKeep a named backup for the interview panel owner. Coverage during leave or a time-zone gap should be written into the routine, not improvised when the owner is unavailable."
      },
      {
        "heading": "Review cadence and next action",
        "body": "Set a review date and name the owner who will read the result. A report without a review owner is an archive, not a control.\n\nChoose one next action: fix the source, simplify the field, change the queue, or stop the work until the owner decides. Record the decision and the next check.\n\nRepeat the protocol after the change. Compare the same definitions and report what moved, what did not, and what remains unknown.\n\nDo not copy a value from a prior interview panel record because it looks familiar. Reopen the source, confirm the version, and record what changed."
      }
    ],
    "tables": [
      {
        "caption": "Evidence checkpoints for interview panel",
        "columns": [
          "Checkpoint",
          "Evidence to review"
        ],
        "rows": [
          [
            "Ownership",
            "Named owner and authority limit"
          ],
          [
            "Input readiness",
            "Source, version, and missing fields"
          ],
          [
            "Exception visibility",
            "Reason code, owner, and due date"
          ],
          [
            "Completion evidence",
            "Accepted record and next review"
          ]
        ]
      }
    ],
    "sources": [
      {
        "name": "U.S. Department of Labor",
        "url": "https://www.dol.gov/"
      },
      {
        "name": "U.S. Small Business Administration",
        "url": "https://www.sba.gov/"
      },
      {
        "name": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "name": "Federal Trade Commission",
        "url": "https://www.ftc.gov/"
      }
    ],
    "related": [
      {
        "label": "Research library",
        "href": "/research"
      },
      {
        "label": "Related study",
        "href": "/research/hireassistantnearme-attributing-rework-in-reference-check"
      }
    ]
  }
];
