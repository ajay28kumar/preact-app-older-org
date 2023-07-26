export const aivfPropsHelper = ({ aivfType, lenderName }) => {
  switch (aivfType) {
    case 'LAST_DIGITS_OF_DEBIT_CARD':
      return {
        title: `Enter Last 4 digits of ${lenderName} debit card`,
        inputLabel: 'Enter Last 4 Digit',
        leadingIcon: 'credit_card',
        buttonText: 'Verify Debit Card',
        aboutAivfText: 'Do not have a Debit card?',
        dialogueHeader: `Don't have your ${lenderName} Debit Card?`,
        dialogueBody: `Debit Card is required to activate InstaCred Cardless EMI facility. We confirm your identity with the debit card, please try again with any of your ${lenderName} Debit cards.`,
      };
    case 'ACCT_DIGITS':
      return {
        title: `Enter Last 4 digits of ${lenderName} Account Number`,
        inputLabel: 'Enter Last 4 Digit',
        leadingIcon: 'account_balance',
        buttonText: 'Verify Account Number',
        aboutAivfText: 'Do not have your account number?',
        dialogueHeader: `Don't have your ${lenderName} Account Number?`,
        dialogueBody: `Account Number is required to activate InstaCred Cardless EMI facility. We confirm your identity with your account number, please try again with your ${lenderName} Account Number.`,
      };
    default:
      return {};
  }
};
