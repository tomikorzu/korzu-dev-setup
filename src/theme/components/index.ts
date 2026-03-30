/**
 * Component Overrides Index
 *
 * Centraliza todas las personalizaciones de componentes MUI.
 */

import type { Components, Theme } from "@mui/material/styles";
import { MuiCssBaselineOverrides } from "./cssbaseline";
import { MuiButtonOverrides } from "./button";
import { MuiIconButtonOverrides } from "./iconbutton";
import { MuiCardOverrides } from "./card";
import { MuiChipOverrides } from "./chip";
import { MuiTextFieldOverrides } from "./textfield";
import { MuiLinkOverrides } from "./link";
import { MuiPaperOverrides } from "./paper";
import { MuiDividerOverrides } from "./divider";
import { MuiAppBarOverrides } from "./appbar";
import { MuiDrawerOverrides } from "./drawer";
import {
  MuiDialogOverrides,
  MuiDialogTitleOverrides,
  MuiDialogContentOverrides,
  MuiDialogActionsOverrides,
} from "./dialog";
import { MuiAlertOverrides } from "./alert";
import { MuiTooltipOverrides } from "./tooltip";
import { MuiSkeletonOverrides } from "./skeleton";
import { MuiMenuOverrides, MuiMenuItemOverrides } from "./menu";
import { MuiListItemButtonOverrides } from "./listitembutton";
import { MuiTabsOverrides, MuiTabOverrides } from "./tabs";
import { MuiSwitchOverrides } from "./switch";
import { MuiAvatarOverrides } from "./avatar";

export const components: Components<Theme> = {
  MuiCssBaseline: MuiCssBaselineOverrides,
  MuiButton: MuiButtonOverrides,
  MuiIconButton: MuiIconButtonOverrides,
  MuiCard: MuiCardOverrides,
  MuiChip: MuiChipOverrides,
  MuiTextField: MuiTextFieldOverrides,
  MuiLink: MuiLinkOverrides,
  MuiPaper: MuiPaperOverrides,
  MuiDivider: MuiDividerOverrides,
  MuiAppBar: MuiAppBarOverrides,
  MuiDrawer: MuiDrawerOverrides,
  MuiDialog: MuiDialogOverrides,
  MuiDialogTitle: MuiDialogTitleOverrides,
  MuiDialogContent: MuiDialogContentOverrides,
  MuiDialogActions: MuiDialogActionsOverrides,
  MuiAlert: MuiAlertOverrides,
  MuiTooltip: MuiTooltipOverrides,
  MuiSkeleton: MuiSkeletonOverrides,
  MuiMenu: MuiMenuOverrides,
  MuiMenuItem: MuiMenuItemOverrides,
  MuiListItemButton: MuiListItemButtonOverrides,
  MuiTabs: MuiTabsOverrides,
  MuiTab: MuiTabOverrides,
  MuiSwitch: MuiSwitchOverrides,
  MuiAvatar: MuiAvatarOverrides,
};
