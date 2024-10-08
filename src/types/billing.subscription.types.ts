export type SubscriptionType = 'limitDate' | 'payAmount' | 'usageCount';

export interface SubscriptionDetail {
  /**
   * The limit date for the subscription.
   * The subscription is valid until this date.
   */
  limitDate?: Date;

  /**
   * The pay amount for the subscription.
   * This applies to subscriptions that are valid only once and where the pay amount is greater than 0.
   */
  payAmount?: number;

  /**
   * The usage count for the subscription.
   * This applies to subscriptions that are valid until the usage count is depleted.
   */
  usageCount?: number;

  /**
   * The date when the subscription started.
   */
  startDate: Date;

  /**
   * The date when the subscription ends or expires.
   */
  endDate?: Date;
}

export interface Subscription {
  _id?: string;
  stripeId?: string;
  isActive: boolean;
  participant: string;
  subscriptionType: SubscriptionType;
  resource?: string;
  resources?: string[];
  details: SubscriptionDetail;
}
