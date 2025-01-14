import type { Signer } from '@ethersproject/abstract-signer';
import type {
  ChainKey,
  ConfigUpdate,
  Order,
  RouteOptions,
  Token,
} from '@lifi/sdk';
import type { PaletteMode, PaletteOptions, Shape } from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography';
import type { CSSProperties, ReactNode, RefObject } from 'react';
import type { LanguageKey, LanguageResources } from '../providers';

export type WidgetVariant = 'default' | 'expandable' | 'drawer' | 'refuel';

export enum DisabledUI {
  FromAmount = 'fromAmount',
  FromToken = 'fromToken',
  ToAddress = 'toAddress',
  ToToken = 'toToken',
}
export type DisabledUIType = `${DisabledUI}`;

export enum HiddenUI {
  Appearance = 'appearance',
  Language = 'language',
  PoweredBy = 'poweredBy',
  ToAddress = 'toAddress',
}
export type HiddenUIType = `${HiddenUI}`;

export type Appearance = PaletteMode | 'auto';
export type ThemeConfig = {
  palette?: Pick<
    PaletteOptions,
    'grey' | 'background' | 'text' | 'secondary' | 'primary'
  >;
  shape?: Shape;
  typography?: TypographyOptions;
};

export interface WidgetWalletManagement {
  connect(): Promise<Signer>;
  disconnect(): Promise<void>;
  switchChain?(chainId: number): Promise<Signer>;
  addToken?(token: Token, chainId: number): Promise<void>;
  addChain?(chainId: number): Promise<boolean>;
  signer?: Signer;
}

export interface SDKConfig
  extends Omit<
    ConfigUpdate,
    'defaultExecutionSettings' | 'defaultRouteOptions' | 'disableVersionCheck'
  > {
  defaultRouteOptions?: Omit<RouteOptions, 'bridges' | 'exchanges'>;
}

export interface WidgetContract {
  address: string;
  callData: string;
  gasLimit: string;
  approvalAddress?: string;
  outputToken?: string;
  fallbackAddress?: string;
}

export interface WidgetConfig {
  fromChain?: `${ChainKey}` | number;
  toChain?: `${ChainKey}` | number;
  fromToken?: string;
  toToken?: string;
  toAddress?: string;
  fromAmount?: number | string;
  toAmount?: number | string;

  contract?: WidgetContract;
  contractComponent?: ReactNode;
  contractCompactComponent?: ReactNode;

  fee?: number;
  integrator?: string;
  referrer?: string;

  slippage?: number;
  routePriority?: Order;

  variant?: WidgetVariant;

  appearance?: Appearance;
  theme?: ThemeConfig;
  containerStyle?: CSSProperties;

  disableTelemetry?: boolean;
  disabledUI?: DisabledUIType[];
  hiddenUI?: HiddenUIType[];
  useRecommendedRoute?: boolean;

  walletManagement?: WidgetWalletManagement;
  sdkConfig?: SDKConfig;

  buildSwapUrl?: boolean;

  bridges?: {
    allow?: string[];
    deny?: string[];
  };
  exchanges?: {
    allow?: string[];
    deny?: string[];
  };
  chains?: {
    allow?: number[];
    deny?: number[];
  };
  tokens?: {
    featured?: Token[];
    allow?: Token[];
    deny?: (Partial<Token> & Pick<Token, 'address' | 'chainId'>)[];
  };
  languages?: {
    default?: LanguageKey;
    allow?: LanguageKey[];
    deny?: LanguageKey[];
  };
  languageResources?: LanguageResources;
  disableI18n?: boolean;

  /** @deprecated Use hiddenUI: ['appearance'] instead */
  disableAppearance?: boolean;
  /** @deprecated Use chains.deny instead */
  disabledChains?: number[];
  /** @deprecated Use tokens.featured instead */
  featuredTokens?: Token[];
}

export type WidgetDrawerProps = {
  elementRef?: RefObject<HTMLDivElement>;
  open?: boolean;
};

export type WidgetProps = WidgetDrawerProps &
  WidgetConfig & {
    config?: WidgetConfig;
  };
