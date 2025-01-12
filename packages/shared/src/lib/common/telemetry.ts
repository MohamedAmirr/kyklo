import { ClassroomId } from '../classroom/classroom'
import { UserId } from '../user/user'


type SignedUp = {
    userId: UserId
    email: string
    firstName: string
    lastName: string
    classroomId: ClassroomId
}

type RequestTrialSubmitted = {
    fullName: string
    email: string
    numberOfEmployees: string
    companyName: string
    goal: string
}

type RequestTrialClicked = {
    location: string
}

type KeyActiviated = {
    date: string
    key: string
}

type UpgradeClicked = {
    limitType?: 'team'
}

type UpgradePopup = {
    limitType?: 'team'
}

type ReferralLinkCopied = {
    userId: UserId
}

type RewardButtonClicked = {
    source: 'note' | 'rewards-button'
}

type RewardInstructionsClicked = {
    type: 'share-template' | 'linkedin' | 'referral' | 'contribute-piece'
}

type Referral = {
    referredUserId: UserId
}

type OpenedFromDasahboard = {
    location: 'sidenav' | 'tasks-progress'
}
export enum TelemetryEventName {
    SIGNED_UP = 'signed.up',
    REQUEST_TRIAL_CLICKED = 'request.trial.clicked',
    REQUEST_TRIAL_SUBMITTED = 'request.trial.submitted',
    KEY_ACTIVIATED = 'key.activated',
    UPGRADE_CLICKED = 'upgrade.clicked',
    OPENED_PRICING_FROM_DASHBOARD = 'pricing.viewed',
    UPGRADE_POPUP = 'upgrade.popup',
    DEMO_IMPORTED = 'demo.imported',
    REFERRAL = 'referral',
    REFERRAL_LINK_COPIED = 'referral.link.copied',
    REWARDS_OPENED = 'rewards.opened',
    REWARDS_INSTRUCTION_CLICKED = 'rewards.instructions.clicked',
}

type BaseTelemetryEvent<T, P> = {
    name: T
    payload: P
}

export type TelemetryEvent =
  | BaseTelemetryEvent<TelemetryEventName.SIGNED_UP, SignedUp>
  | BaseTelemetryEvent<TelemetryEventName.REFERRAL, Referral>
  | BaseTelemetryEvent<TelemetryEventName.REQUEST_TRIAL_CLICKED, RequestTrialClicked>
  | BaseTelemetryEvent<TelemetryEventName.KEY_ACTIVIATED, KeyActiviated>
  | BaseTelemetryEvent<TelemetryEventName.REQUEST_TRIAL_SUBMITTED, RequestTrialSubmitted>
  | BaseTelemetryEvent<TelemetryEventName.UPGRADE_CLICKED, UpgradeClicked>
  | BaseTelemetryEvent<TelemetryEventName.UPGRADE_POPUP, UpgradePopup>
  | BaseTelemetryEvent<TelemetryEventName.REFERRAL_LINK_COPIED, ReferralLinkCopied>
  | BaseTelemetryEvent<TelemetryEventName.DEMO_IMPORTED, Record<string, never>>
  | BaseTelemetryEvent<TelemetryEventName.OPENED_PRICING_FROM_DASHBOARD, OpenedFromDasahboard>
  | BaseTelemetryEvent<TelemetryEventName.REWARDS_OPENED, RewardButtonClicked>
  | BaseTelemetryEvent<TelemetryEventName.REWARDS_INSTRUCTION_CLICKED, RewardInstructionsClicked>
