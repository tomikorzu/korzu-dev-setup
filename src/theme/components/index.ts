import type { Components, Theme } from "@mui/material/styles";
import { MuiAlertOverrides } from "./alert";
import { MuiAppBarOverrides } from "./appbar";
import { MuiAvatarOverrides } from "./avatar";
import { MuiButtonOverrides } from "./button";
import { MuiCardOverrides } from "./card";
import { MuiChipOverrides } from "./chip";
import { MuiCssBaselineOverrides } from "./cssbaseline";
import {
  MuiDialogActionsOverrides,
  MuiDialogContentOverrides,
  MuiDialogOverrides,
  MuiDialogTitleOverrides,
} from "./dialog";
import { MuiDividerOverrides } from "./divider";
import { MuiDrawerOverrides } from "./drawer";
import { MuiIconButtonOverrides } from "./iconbutton";
import { MuiLinkOverrides } from "./link";
import { MuiListItemButtonOverrides } from "./listitembutton";
import { MuiMenuItemOverrides, MuiMenuOverrides } from "./menu";
import { MuiPaperOverrides } from "./paper";
import { MuiSkeletonOverrides } from "./skeleton";
import { MuiSwitchOverrides } from "./switch";
import { MuiTabOverrides, MuiTabsOverrides } from "./tabs";
import { MuiTextFieldOverrides } from "./textfield";
import { MuiTooltipOverrides } from "./tooltip";

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
