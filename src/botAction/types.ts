import exp from "constants";
import { ChatHistory } from "../api/types/chat";

// Types.ts
export interface TextBlock {
  type: "TextBlock";
  size?: "medium" | "small" | "large" | "default";
  weight?: "lighter" | "default" | "bolder";
  text: string;
  wrap?: boolean;
}

export interface InputText {
  type: "Input.Text";
  id: string;
  placeholder: string;
  inlineAction: ActionExecute;
}

export interface ActionExecute {
  type: "Action.Execute";
  verb: string;
  iconUrl: string;
  tooltip: string;
}

export interface ShowCardAction {
  type: "Action.ShowCard";
  title: string;
  card: AdaptiveCard;
}

export interface AdaptiveCard {
  type: "AdaptiveCard";
  version?: string;
  $schema?: string;
  body: Array<TextBlock | InputText | RichTextBlock | ChoiceSet>;
  actions?: ShowCardAction[];
}
export interface ChoiceSet {
  type: "ChoiceSet";
  id: string;
  style: "expanded" | "compact";
  isMultiSelect: boolean;
  value: string;
  choices: Choice[];
}
export interface Choice {
  title: string;
  value: string;
}
export interface RichTextBlock {
  type: "RichTextBlock";
  inlines: Array<TextRun>;
  horizontalAlignment?: "left" | "center" | "right";
}
export interface TextRun {
  type: "TextRun";
  text: string;
  weight?: "lighter" | "default" | "bolder";
  italic?: boolean;
  color?:
    | "default"
    | "dark"
    | "light"
    | "accent"
    | "good"
    | "warning"
    | "attention";
  highlight?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  size?: "small" | "default" | "medium" | "large" | "extraLarge";
  fontType?: "default" | "monospace";
}

export interface Conversation {
  question: string;
  chatHist?: ChatHistory[];
  userAnswers?: UserAnswer[];
}
export interface UserAnswer {
  user: string;
  answer: string;
}
export interface QuestionDataInterface {
  conversationId: string;
  conversation: Conversation;
}

// CardTemplate is AdaptiveCard without its 'body' property,
// because we're going to define 'body' separately.
export type CardTemplate = Omit<AdaptiveCard, "body"> & {
  body: Array<TextBlock | InputText | RichTextBlock | ChoiceSet>;
};
