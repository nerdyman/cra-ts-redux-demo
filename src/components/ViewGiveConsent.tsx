import React, { useCallback, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import {
  useStoreUserConsentGetConsents,
  useServerPostUserConsents,
} from '../utilities/hooks';
import { logger } from '../utilities/logger';
import { SharedDialog, useSharedDialogState } from './SharedDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginRight: 'auto',
      marginLeft: 'auto',
      maxWidth: '20rem',
      padding: theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      marginTop: theme.spacing(4.5),
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    formControlSubmit: {
      marginTop: theme.spacing(3.5),
    },
    formInputCheckbox: {
      '&:first-of-type': {
        marginTop: theme.spacing(2),
      },
    },
    formInputText: {
      marginBottom: theme.spacing(1.75),
      '&:last-of-type': {
        marginBottom: 0,
      },
    },
    formLabel: {
      marginBottom: theme.spacing(1),
    },
    formUserInfo: {},
  }),
);

interface DialogActions {
  onClose: () => void;
}

const DialogActions: React.FC<DialogActions> = ({ onClose, ...props }) => (
  <Button
    onClick={onClose}
    {...props}
    variant="contained"
    color="primary"
    size="large"
  >
    Close
  </Button>
);

/**
 * Messages to show in main view dialog
 */
const dialogMessages = {
  invalidConsents: (
    <>
      Please fill in both Name and Email fields <em>and</em> select at least one
      consent preference.
    </>
  ),
  duplicateEmail: (
    <>This email address already exists, please provide a new one.</>
  ),
};

/** Union of `dialogMessage` keys */
type DialogMessagesKeys = keyof typeof dialogMessages;

/**
 * Give consent view
 * @TODO - Use shareable functions for event handling
 */
export const ViewGiveConsent: React.FC<App.ReactFCTestProps> = props => {
  const classes = useStyles();
  const dialogState = useSharedDialogState({ visible: false });
  const [dialogMessage, setDialogMessage] = useState<DialogMessagesKeys>(
    'invalidConsents',
  );
  const formRef = useRef<HTMLFormElement>(document.createElement('form'));
  const [formIsBusy, setFormIsBusy] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldNameIsValid, setFieldNameIsValid] = useState(true);
  const [fieldEmail, setFieldEmail] = useState('');
  const [fieldEmailIsValid, setFieldEmailIsValid] = useState(true);
  const [fieldConsentNewsletter, setFieldConsentNewsletter] = useState(false);
  const [fieldConsentTargettedAds, setFieldConsentTargettedAds] = useState(
    false,
  );
  const [fieldConsentStatistics, setFieldConsentStatistics] = useState(false);
  const serverPostUserConsents = useServerPostUserConsents();
  const storeUserConsentGetConsents = useStoreUserConsentGetConsents();

  /**
   * Handle form submit
   */
  const handleSubmit = async (
    ev: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    ev.preventDefault();

    if (!fieldNameIsValid || !fieldEmailIsValid) {
      return;
    }

    // Disallow duplicate emails
    // @TODO show message to user - update existing user
    if (storeUserConsentGetConsents.find(item => item.email === fieldEmail)) {
      logger.debug('[handleSubmit] Email already exists.', {
        email: fieldEmail,
        store: storeUserConsentGetConsents,
      });

      setDialogMessage('duplicateEmail');
      dialogState.show();

      return;
    }

    if (
      !fieldConsentNewsletter &&
      !fieldConsentStatistics &&
      !fieldConsentTargettedAds
    ) {
      setDialogMessage('invalidConsents');
      dialogState.show();
      return;
    }

    setFormIsBusy(true);

    await serverPostUserConsents([
      {
        consent: {
          shouldCollectStats: fieldConsentStatistics,
          shouldRecieveNewsLetter: fieldConsentNewsletter,
          shouldShowTargetedAds: fieldConsentTargettedAds,
        },
        email: fieldEmail,
        name: fieldName,
      },
    ]);

    setFormIsBusy(false);
    setFieldEmail('');
    setFieldName('');
    setFieldConsentNewsletter(false);
    setFieldConsentStatistics(false);
    setFieldConsentTargettedAds(false);
  };

  /**
   * Handle submit button click to set error props on required fields
   * `handleSubmit` won't fire if form isn't valid but we still want to set
   * error states on invalid inputs
   */
  const handleDirectSubmitClick = (): void => {
    if (fieldName.length === 0 && fieldNameIsValid) {
      setFieldNameIsValid(false);
    }

    if (fieldEmail.length === 0 && fieldNameIsValid) {
      setFieldEmailIsValid(false);
    }
  };

  const handleFieldNameChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setFieldNameIsValid(ev.currentTarget.value.length > 0);
      setFieldName(ev.currentTarget.value);
    },
    [],
  );

  const handleFieldEmailChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setFieldEmailIsValid(ev.currentTarget.value.length > 0);
      setFieldEmail(ev.currentTarget.value);
    },
    [],
  );

  const handleFieldConsentNewsLetterChange = useCallback(
    (_ev: React.ChangeEvent<{}>, checked: boolean) => {
      setFieldConsentNewsletter(checked);
    },
    [],
  );

  const handleFieldConsentTargettedAds = useCallback(
    (_ev: React.ChangeEvent<{}>, checked: boolean) => {
      setFieldConsentTargettedAds(checked);
    },
    [],
  );

  const handleFieldConsentStatistics = useCallback(
    (_ev: React.ChangeEvent<{}>, checked: boolean) => {
      setFieldConsentStatistics(checked);
    },
    [],
  );

  const Actions = <DialogActions onClose={dialogState.hide} />;

  return (
    <Paper className={classes.root} data-testid={props['data-testid']}>
      <SharedDialog
        actions={Actions}
        sharedDialogState={dialogState}
        title="Submission Failed"
      >
        {dialogMessages[dialogMessage]}
      </SharedDialog>

      <form
        autoComplete="off"
        className={classes.form}
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>
            User Information
          </FormLabel>
          <div className={classes.formUserInfo}>
            <TextField
              className={classes.formInputText}
              error={!fieldNameIsValid}
              id="give-consent-name"
              label="Name"
              name="name"
              onChange={handleFieldNameChange}
              placeholder="Pepe Silvia"
              required
              type="text"
              value={fieldName}
            />
            <TextField
              className={classes.formInputText}
              error={!fieldEmailIsValid}
              id="give-consent-email"
              label="Email"
              name="email"
              onChange={handleFieldEmailChange}
              placeholder="pepe.silvia@example.com"
              required
              type="email"
              value={fieldEmail}
            />
          </div>
        </FormControl>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>
            I agree to: <br />
          </FormLabel>

          <Typography>Please select at least one option.</Typography>

          <FormControlLabel
            className={classes.formInputCheckbox}
            control={
              <Checkbox
                name="consent-newsletter"
                value="user-consent-consents-newsletter"
                checked={fieldConsentNewsletter}
              />
            }
            label="Revieve newsletter"
            onChange={handleFieldConsentNewsLetterChange}
          />
          <FormControlLabel
            className={classes.formInputCheckbox}
            control={
              <Checkbox
                name="consent-targetted-ads"
                value="user-consent-consents-targetted-ads"
                checked={fieldConsentTargettedAds}
              />
            }
            label="Be shown targetted ads"
            onChange={handleFieldConsentTargettedAds}
          />
          <FormControlLabel
            className={classes.formInputCheckbox}
            control={
              <Checkbox
                name="consent-statistics"
                value="user-consent-consents-statistics"
                checked={fieldConsentStatistics}
              />
            }
            label="Contribute to anonymous visit statistics"
            onChange={handleFieldConsentStatistics}
          />
        </FormControl>

        <FormControl className={classes.formControlSubmit}>
          <Button
            color="primary"
            disabled={formIsBusy}
            onClick={handleDirectSubmitClick}
            size="large"
            type="submit"
            variant="contained"
          >
            Give Consent
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};
