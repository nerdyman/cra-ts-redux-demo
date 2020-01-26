/**
 * @module SharedDialog
 * @desc Generic dialog, can be used anywhere
 */

import React, { useCallback, useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

/** Dialog title */
export interface SharedDialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClose?: () => void;
}

const SharedDialogTitle = withStyles(styles)(
  (props: SharedDialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  },
);

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/**
 * Props for `useSharedDialogState`
 */
interface UseSharedDialogStateProps {
  /** Whether dialog is visible */
  visible: boolean;
}

/**
 * Return props for `useSharedDialogState`
 */
interface UseSharedDialogStateReturn extends UseSharedDialogStateProps {
  /** Set `visible` property to false */
  hide: () => void;
  /** Set `visible` property to false */
  show: () => void;
  /** Toggle `visible` property */
  toggle: () => void;
}

/**
 * Hook to control SharedDialog state from parent
 */
export const useSharedDialogState = ({
  visible,
}: UseSharedDialogStateProps): UseSharedDialogStateReturn => {
  const [internalVisible, setInternalVisible] = useState(visible || false);
  const show = useCallback(() => setInternalVisible(true), []);
  const hide = useCallback(() => setInternalVisible(false), []);
  const toggle = useCallback(() => setInternalVisible(prop => !prop), []);

  return {
    hide,
    show,
    toggle,
    visible: internalVisible,
  };
};

/**
 * Props for `SharedDialog`
 */
interface SharedDialogProps {
  /** Actions to show at bottom of dialog */
  actions?: React.ReactNode;
  /** Dialog state */
  sharedDialogState: UseSharedDialogStateReturn;
  /** Dialog Title */
  title?: React.ReactNode;
}

/**
 * Generic dialog component
 * @NOTE This component does not instantiate its own state. An invoked
 *       `useSharedDialog` call stored as a variable __MUST__ be supplied via
 *       the `sharedDialogState` prop.
 */
export const SharedDialog: React.FC<SharedDialogProps> = ({
  actions,
  children,
  sharedDialogState,
  title,
  ...props
}) => {
  return (
    <div {...props}>
      <Dialog onClose={sharedDialogState.hide} open={sharedDialogState.visible}>
        {title && (
          <SharedDialogTitle onClose={sharedDialogState.hide}>
            {title}
          </SharedDialogTitle>
        )}
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </div>
  );
};
