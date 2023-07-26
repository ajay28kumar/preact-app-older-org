/** @jsx h */
import { h } from 'preact';
import style from './style.css';

const TermsAndConditionList = () => {
  return (
    <div className={style.container}>
      <div className={`bold-text font18 ${style.termsHeader}`}>
        GENERAL TERMS & CONDITIONS
      </div>
      <div>
        <ol>
          <li className={`${style.headerText} text80 font16`}>
            All the defined and capitalized terms in these terms and conditions
            (“<span className={style.underLineText}>T&C</span>”) will have the
            meaning assigned to them below:
            <ol type='a'>
              <li className='text80 font14'>
                Lending Partner shall mean any of Flexmoney’s partner lending
                institutions that underwrite the credit provided via the
                InstaCred service
              </li>
              <li className='text80 font14'>
                “<span className={style.underLineText}>Flexmoney</span>” shall
                mean Flexmoney Technologies Private Limited, a company
                registered under the Companies Act, 2013, having its registered
                office at 42, FLR 6, CS 2/108, 4, A.H. WadiaBaug, G D Ambedkar
                Marg, Kalachowki, Mumbai - 400 033, Maharashtra, India, which
                provides a platform for activating, utilizing and managing a
                digital credit line on behalf of the Lending Partner, thereby
                enabling You to make payment for the transactions with
                Merchants.
              </li>
              <li className='text80 font14'>
                “<span className={style.underLineText}>InstaCred</span>” shall
                refer to the services provided by Flexmoney’s platform to You on
                behalf of the LenderPartner, including but not limited to the
                activation, utilization and management of the digital credit
                line offered to You by the Lending Partner.
              </li>
              <li className='text80 font14'>
                “<span className={style.underLineText}>Merchant</span>” shall
                mean a third party company, person, organisation or
                entity,selected on the terms identified by Flexmoney and the
                Lending Parnter, which sells products and/ or services online to
                You.
              </li>
              <li className='text80 font14'>
                In these T&Cs, all references to “
                <span className={style.underLineText}>You</span>” or “
                <span className={style.underLineText}>Your</span>” shall refer
                to you, the person who is offered with digital credit line by
                the Lending Parnter and is accessing/ using the InstaCred
                service or signs up for using the service.
              </li>
            </ol>
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The InstaCred digital credit line is sanctioned at the sole
            discretion of the Lending Partner. The Lending Partner reserves the
            right to decide Your eligibility for the InstaCred digital credit
            line as per the Lending Partner’s internal policies and guidelines.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            Your availing of the InstaCred digital credit line shall be deemed
            to be Your unconditional acceptance of the T&Cs of the InstaCred
            service as contained herein and You shall be bound by the same.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The Lending Partner shall disburse the respective InstaCred amount
            from your InstaCred credit limit (either directly or through
            respective payment gateways) relating to the successful transactions
            initiated by You through the InstaCred service to the respective
            Merchant accounts.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The InstaCred amount shall be within the monetary limits set by the
            Lending Partner while granting You the InstaCred digital credit line
            and Bank reserves the right to vary monetary limits from time to
            time, as required.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            By availing InstaCred, You hereby unconditionally agree, confirm,
            declare and undertake as follows:
            <ol type='a'>
              <li className='text80 font14'>
                You shall utilize InstaCred only for genuine lawful personal
                needs in India and not otherwise.
              </li>
              <li className='text80 font14'>
                You shall avail InstaCred digital credit line as per the
                applicable interest rate and tenure at the checkout page. The
                Interest shall be applied to the InstaCred amount utilitzed by
                You on daily diminishing method.
              </li>
              <li className='text80 font14'>
                You shall repay the InstaCred amount availed as per the
                Repayment Terms set by the Lending Partner and accepted by you
                during the activation process.
              </li>
            </ol>
          </li>
          <li className={`${style.headerText} text80 font16`}>
            Neither the Lending Partner nor Flexmoney shall be responsible or
            liable for any loss or damage, howsoever caused or suffered by You
            arising out of the transactions with Merchants or the Merchant’s
            failure to provide necessary products/services to You for any reason
            whatsoever.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            You are responsible for maintaining the secrecy of Your passwords,
            PIN, login and account information relating to the InstaCred
            service. You will be responsible for the use of the InstaCred
            service by any other person using Your password, PIN and login
            information (with or without Your permission) and such transaction
            shall be binding on You.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The InstaCred transaction once confirmed and processed cannot be
            cancelled. The applicable interest and tenure confirmed at the time
            of availing the InstaCred digital credit line cannot be changed.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The InstaCred amount outstanding can be pre-closed at any time as
            per the terms agreed with the Lending Partners
          </li>
          <li className={`${style.headerText} text80 font16`}>
            In the event of Your default in repaying the InstaCred amount
            outstanding together with applicable interest, charges, taxes and
            costs and/or in adhering to the T&Cs contained herein,
            <ol type='a'>
              <li className='text80 font14'>
                You shall be liable to pay additional/penal interest as
                intimated to you by the Lending Partner.
              </li>
              <li className='text80 font14'>
                The entire amounts outstanding in the InstaCred account shall be
                payable forthwith on demand. However, the Lending Partner may at
                its sole discretion permit you to continue with the InstaCred
                service subject to Your payment of overdue amounts.
              </li>
              <li className='text80 font14'>
                The Lending Partner shall be entitled to report Yourname to
                CIBIL/RBI or any other statutory, regulatory or rating agencies.
              </li>
              <li className='text80 font14'>
                The Lending Partner shall be entitled to initiate such other
                legally permissible measures against You for recovering the
                amounts outstanding under the InstaCred digital credit line
                availed, including by engaging the services of recovery agents,
                in terms of the Lender`s Loan/Debt Collection Policy.
              </li>
              <li className='text80 font14'>
                The Lending Partner shall be entitled to pre-close the InstaCred
                facility at its discretion.
              </li>
            </ol>
          </li>
          <li className={`${style.headerText} text80 font16`}>
            The Lending Partner reserves the right at any time, without previous
            notice, to add, alter, modify, change or vary all or any of these
            T&Cs. All disputes, if any, arising out of or in connection with or
            otherwise relating hereto shall be subject to the exclusive
            jurisdiction of the competent Courts/Tribunals in India only.
          </li>
          <li className={`${style.headerText} text80 font16`}>
            You agree and declare that the Lending Partner shall have an
            unqualified right to assign the InstaCred digital credit availed by
            You to any other Bank/Financial Institution/NBFC of Lending
            Partner`s choice, for which purpose no further consent or
            concurrence shall be required from Your part.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsAndConditionList;
