export const faqData = {
  headerText: 'Frequently Asked Questions',
  items: [
    {
      sectionName: 'About InstaCred',
      sectionId: 'About InstaCred',
      sectionDetails: [
        {
          question: 'What is InstaCred EMI?',
          answer:
            "<div style='margin-bottom:10px'>InstaCred is a facility which enables users to activate, utilize and manage a Cardless EMI credit line on behalf of the Bank/Lender at our merchant network.</div>" +
            '<div>It allows you to avail a credit line that enables you to buy your favourite products and services and pay for it in equated monthly instalment (EMI) at low-interest rates. e.g. - You want to purchase a cell phone or go on a holiday that costs INR 50,000 - split the amount into a equated monthly instalments, at a low-interest rate using InstaCred EMI payment option.</div>',
        },
        {
          question: 'How does it work?',
          answer:
            '<div>The facility to purchase using InstaCred EMI is available at hundreds of merchant partners. Simply select InstaCred option on the payment page at the Merchant website to proceed. For an updated list of Merchants and Offers, you can log in and navigate to Buy with InstaCred.</div>',
        },
        {
          question: 'Who is giving me this credit line?',
          answer:
            "<div style='margin-bottom:10px;'>Credit Lines are issued to you by your Bank/Lender. This Credit Line can be used to make purchases on InstaCred's Merchant Network.</div>",
        },
        {
          question:
            'Are there any processing fees associated with InstaCred EMI?',
          answer:
            '<div>Fees / Charges on your Loan are at the discretion of your Bank/Lender. Processing Fees, if any, will be displayed to you at the time of Transaction confirmation</div>',
        },
      ],
    },
    {
      sectionName: 'Buy with InstaCred',
      sectionId: 'BIC',
      sectionDetails: [
        {
          question: 'How do I shop using InstaCred?',
          answer:
            '<div>To shop using InstaCred, you need to be pre-approved by one of Lending Partners (Banks / NBFCs). As a pre-approved user, you can shop at our partner merchants choosing InstaCred at the Payment Checkout page. For an updated list of Merchants and Offers, you can log in and navigate to Buy with InstaCred',
        },
        {
          question: 'What is the tenure of the loan?',
          answer:
            '<div>Loan Tenures are decided by your Bank / Lender. Currently, our lending partners offer tenures ranging from 3 months to 18 months.</div>',
        },
        {
          question: 'Do I need to make a down payment?',
          answer:
            '<div>No. There is no down payment that is required to buy a product via InstaCred.',
        },
        {
          question:
            'Can I do partial payment for any purchases using InstaCred EMI and other payment options?',
          answer:
            '<div>No! We do not currently support partial payment transactions with InstaCred Cardless EMI.</div>',
        },
        {
          question: 'How much interest will I be paying?',
          answer:
            '<div>Interest rates are set by your Bank/Lender. The interest rate applicable will be displayed to you at the time of transaction.</div>',
        },
        {
          question: 'Where can I track the status of my purchase?',
          answer:
            '<div>Once your purchase is complete, you will receive a confirmation at your Merchant. You can also check the status of your purchase by navigating to purchase history after logging in to instacred.</div>',
        },
        {
          question:
            'What happens if I don’t need the product/service I bought?',
          answer:
            '<div>Your return policy is guided by the Merchant at which you have made the purchase. Once the merchant initiates the refund for your product, this will be refunded back to your Bank/Lender. If the refund amount is less than the loan amount then you will need to pay the balance amount to the bank. We recommend that you check with your Bank/Lender to determine the balance payable in case of refunds.</div>',
        },
      ],
    },
    {
      sectionName: 'Eligibility',
      sectionId: 'Eligibility',
      sectionDetails: [
        {
          question: 'What do I do to sign-up for InstaCred?',
          answer:
            '<div>You do not need to sign-up for InstaCred. You need to have a Pre-Approved line approved by one of our Lending Partners and you are good to transact using InstaCred.</div>',
        },
        {
          question: 'Do I need to submit any KYC documents?',
          answer:
            '<div>As a preapproved customer, you DO NOT need to submit any fresh KYC document. </div > ',
        },
        {
          question: 'Why am I not receiving an OTP?',
          answer:
            '<div>Please ensure that the mobile number you are using to register for InstaCred is the same that you’ve used to register with our Banking / NBFC partner.If you still do not receive the OTP, please check your Network Connection.If you are still not receiving an OTP, please try again in a few minutes.If you are repeatedly facing this issue, send us a query at <a href="mailto: contact@flexmoney.in">contact@flexmoney.in</a>.</div > ',
        },
      ],
    },
    {
      sectionName: 'Repayment',
      sectionId: 'Repayment',
      sectionDetails: [
        {
          question: 'How do I re-pay InstaCred?',
          answer:
            '<div>The loan is issued to you by one of our Lending Partners. Repayment of EMIs also needs to be made to your Bank/Lender. For any query pertaining to your Loan, you may get in touch with your Bank/Lender.</div>',
        },
        {
          question: 'What is the process to pre-close the EMI?',
          answer:
            '<div>Pre-closure of EMI is governed by the Terms of your Bank/Lender. You may get in touch with your Bank/Lender for pre-closure of EMIs. Terms and Conditions of your loan will be displayed to you at the time of transaction.</div>',
        },
        {
          question: 'Is there any Late Payment Fee associated with my loan?',
          answer:
            '<div>Fees / Charges on your Loan are at the discretion of your Bank/Lender. Your Bank/Lender may charge a Late Payment Fee. Please check with the Bank/Lender for the schedule of charges. Terms and Conditions of your loan will be conveyed to you at the time of transaction.</div>',
        },
        {
          question:
            'Can I increase the tenure of the loan after it has been approved?',
          answer:
            '<div>No, the loan tenure cannot be extended once the loan has been approved.</div>',
        },
        {
          question: 'Can I change my repayment cycle date?',
          answer:
            '<div>No, your repayment cycle date is governed by your Bank/Lender. This cannot be changed.</div>',
        },
      ],
    },
  ],
};

export const lenderFaqData = {
  headerText: 'Lender Specific Questions',
  items: [
    {
      lenderId: '201',
      subHeaderId: 'IDFC First Bank Easy Buy Card',
      subSectionDetails: [
        {
          question: 'How to buy online with Easy Buy Card?',
          answer:
            '<div>As an IDFC First Bank Easy Buy Card customer, you can now shop online on EMI using InstaCred Cardless EMI. InstaCred has a lot of merchants on its network, which you can find <a href="/merchants">here</a> .' +
            '<div>Steps to complete online purchase:</div>' +
            '<div>1. Select the product that you want to purchase and provide your billing and shipping information.</div>' +
            '<div>2. On the checkout page select InstaCred as payment option. Look out for <strong>InstaCred Cardless EMI</strong>, <strong>InstaCred EMI</strong> or <strong>InstaCred</strong>.</div>' +
            '<div>3. After selection, you will be directed to InstaCred payment confirmation page.</div>' +
            '<div>4. Select your EMI tenure and enter OTP to confirm the purchase.</div><div>',
        },
        {
          question: 'What can I buy using InstaCred Cardless EMI?',
          answer:
            '<div>You can buy Furniture, Education, Apparel, Beauty products, Electronics, Flights, Hotels, Travel packages, and many other products across categories. To know more about the various merchants and categories on the InstaCred Cardless EMI network please click <a href="/buy">here</a></div> ',
        },
        {
          question: 'How to buy on Flipkart with Easy Buy Card?',
          answer:
            '<div><div style="line-height: 20px;">Purchasing using IDFC FIRST Bank Easy Buy Card on Flipkart is easy. You can complete your purchase using either of the modes given below:</div> <div><ul style="padding-left: 15px;"><li>Purchase directly using IDFC FIRST Bank – Easy Buy Card payment option at Check-out: <ul><li>Go to <a href="http://bit.ly/2PkUkDL" target="_blank">Flipkart</a> site and select the product that you want to purchase and provide your billing and shipping information.</li><li>On the checkout page select <b>IDFC FIRST Bank - Easy Buy Card</b> payment option under EMI. </li><li>Select the EMI tenure and enter OTP to confirm the purchase.</li></ul></li></ul></div></div>',
        },
        {
          question:
            'Is there a separate credit limit or Easy Buy Card for buying online?',
          answer:
            '<div>You can use your existing Easy Buy Card for buying online. The credit limit remains the same. You can use the limit to either buy online at partner websites or at select physical stores (<a href="/merchants">here</a>).</div>',
        },
        {
          question: 'Are there any extra charges for this service?',
          answer:
            '<div>Currently, there are no Fees associated with purchases made using InstaCred Cardless EMI. The applicable interest rate will be displayed once you choose the EMI plan. Please refer to the IDFC First Bank FAQs for details on your loan and schedule of charges (<a href="http://www.capitalfirst.com/faq">www.capitalfirst.com/faq</a>).</div>',
        },
        {
          question: 'How can transaction disputes be resolved?',
          answer:
            "<div>In case of disputes with regards to transaction with the merchant, please contact the merchant for details. If the merchant doesn’t reply please contact InstaCred, you can write to us at <a href='mailTo:contact@flexmoney.in'>contact@flexmoney.in</a>. In case the merchant agrees for cancellation, IDFC First Bank will cancel the loan in their system once the Bank gets the complete amount from the merchant via InstaCred (Flexmoney). Bank will refund the EMI, if any, after adjusting the applicable cancellation charges.<div style='font-size: 12px;font-weight: bold;margin-top: 15px;'>Note: Please do not share your voucher code with anyone</div></div>",
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>For cancellation of the loan you need to contact the merchant. IDFC First Bank Ltd will cancel the loan only after the merchant refunds the full amount to the Bank. For foreclosure of the loan you can contact IDFC First Bank Ltd <a href="http://www.capitalfirst.com/contact-us">(www.capitalfirst.com/contact-us)</a>. Loan can be foreclosed post customer pays the applicable foreclosure charges.\n</div>',
        },
      ],
    },
    {
      lenderId: '401',
      subHeaderId: 'Kotak Mahindra Bank',
      subSectionDetails: [
        {
          question:
            'How to buy online with Kotak Mahindra Bank Debit Card EMI?',
          answer:
            '<div>As a pre-approved customer of Kotak Mahindra Bank, you can shop on EMI at our partner merchants.' +
            '<div><br/></div>' +
            '<div>- On the checkout page, select the “InstaCred Cardless EMI" option</div>' +
            '<div>- Choose an EMI Tenure that you are comfortable with</div>' +
            '<div>- To authorize your transaction, you need to enter the last 4-digits of your Kotak Mahindra Bank Debit Card and the OTP sent to your mobile by Kotak Mahindra Bank.</div>' +
            '<br/><div>To see the latest list of merchants where you can shop using EMI from Kotak Mahindra Bank, kindly log in to <a target="_blank" href="https://instacred.me/login" class="text-color cursorPointer">instacred.me</a> and navigate to Buy with InstaCred.</div>' +
            '<br/><div><span class="bold-text">Note:</span> InstaCred, Kotak Mahindra Bank, its associates, partners or representatives will NEVER ask for your Debit Card / OTP details. Please do not share your OTP/Debit Card Details with anyone.</div>' +
            '</div',
        },
        {
          question:
            'What can I buy with Kotak Mahindra Debit Card EMI using InstaCred?',
          answer:
            '<div>As a Pre-approved customer of Kotak Mahindra Bank, you can buy Mobile phone, Electronics, Furniture, Fashion and many other products across categories. To see the latest list of merchants, please log in to <a target="_blank" href="https://instacred.me/login" class="text-color cursorPointer">instacred.me</a> and navigate to Buy with InstaCred.</div>',
        },
        {
          question: 'How are transaction disputes resolved?',
          answer:
            "<div>To dispute a transaction at a merchant, please contact the merchant directly. If the merchant doesn't reply within 2 working days, you can write to us at <a  class='text-color cursorPointer' href='mailto:contact@flexmoney.in'>contact@flexmoney.in</a> and we will get back to you in 2 working days. If the merchant agrees for cancellation, Kotak Mahindra Bank will cancel the loan in their system once the Bank gets the complete amount from the merchant via InstaCred. Bank will cancel the loan if any, after adjusting the applicable cancellation charges.</div>",
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>The loan is issued to you against purchases made at the Merchant. Your return policy is guided by the Merchant where you have made the purchase. Once the merchant initiates the refund for your product, this will be refunded back to your Bank in 2 business days. If the refund amount is less than the loan amount, then you will need to pay the balance amount to the bank. We recommend that you check with Kotak Mahindra Bank to determine the balance payable in case of refunds.</div>',
        },
      ],
    },
    {
      lenderId: '501',
      subHeaderId: 'HDFC Bank Cardless EMI',
      subSectionDetails: [
        {
          question: 'How to buy online with HDFC Bank Cardless EMI?',
          answer:
            '<div>As a pre-approved user from HDFC Bank, you can purchase at our partner merchant in EMI. At our partner merchants, add the products/service you want to purchase to your cart and proceed with EMI payment' +
            '<div>1) On the checkout page, select the "InstaCred Cardless EMI" option</div>' +
            '<div>2) Choose an "EMI Plan" that you are comfortable with</div>' +
            '<div>3) To authorize your transaction, you may be asked to enter the last 4-digits of Debit Card Confirm your transaction with OTP received from HDFC Bank</div>' +
            '<div><br/></div>' +
            '<div>To check for an updated list of merchants where you can buy using your HDFC Bank Credit Line, kindly log in to instacred.me (<a href="https://instacred.me/login" target="_blank">https://instacred.me/login</a> ) and navigate to Buy with InstaCred.</div>' +
            '<div><br/></div>' +
            '<div style="font-weight:bold">Note: InstaCred, HDFC Bank, its associates, partners or representatives will NEVER ask for your Debit Card / OTP details. Please do not share your OTP/Debit Card Details with anyone</div>',
        },
        {
          question:
            'What can I buy with HDFC Bank Cardless EMI using InstaCred?',
          answer:
            '<div>As a Pre-approved customer from HDFC Bank, you can buy a Mobile phone, Electronics, Furniture, Education, Fashion & beauty products, Flights, Hotels, Travel packages, and many other products across categories. To check for an updated list, you can log in to instacred.me (<a href="https://instacred.me/login" target="_blank">https://instacred.me/login</a>) and navigate to Buy with InstaCred.</div>',
        },
        {
          question: 'How can transaction disputes be resolved?',
          answer:
            "<div>In case of disputes with regards to the transaction with the merchant, please contact the merchant for details. If the merchant doesn't reply please contact InstaCred, you can write to us at <a href='contact@flexmoney.in' targe='_blank'>contact@flexmoney.in</a> and we will get back to you in 2 working days. In case the merchant agrees for cancellation, HDFC Bank will cancel the loan in their system once the Bank gets the complete amount from the merchant via InstaCred. Bank will cancel the loan, if any, after adjusting the applicable cancellation charges.</div>",
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>The loan is issued to you against purchases made at our Merchant Partner. Your return policy is guided by the Merchant at which you have made the purchase. Once the merchant initiates the refund for your product, this will be refunded back to your Bank. If the refund amount is less than the loan amount then you will need to pay the balance amount to the bank. We recommend that you check with HDFC Bank to determine the balance payable in case of refunds.</div>',
        },
      ],
    },
    {
      lenderId: '502',
      subHeaderId: 'HDFC Bank FlexiPay',
      subSectionDetails: [
        {
          question: 'What is HDFC Bank FlexiPay?',
          answer:
            '<div>Live each moment worry-free with HDFC Bank FlexiPay.<br/><br/>' +
            '<div>HDFC Bank FlexiPay is our <span style="font-weight: bold">‘Buy Now Pay Later’</span> service offered by HDFC bank, ' +
            'which lets you buy what you desire ' +
            'most. Now you needn’t miss out getting those favourite pair of shoes or the latest smartphone. ' +
            'If you have a HDFC Bank Debit Card, you may qualify for this <span style="font-weight: bold">pay later option.</span> <br/><br/>' +
            'FlexiPay makes it possible for you and your family to shop online with ease and contentment.' +
            'You can use this digital credit solution to pay later and what’s more is, the 15 days tenure is ' +
            'interest-free! Are you worried about charges and transaction limit? There are zero processing ' +
            'fees and unlimited transactions.</div></div>',
        },
        {
          question: 'Where can I use FlexiPay?',
          answer:
            '<div>FlexiPay - <span style="font-weight: bold">Pay Later</span> is accessible as a payment option at your preferred online platform’s ' +
            'check out page. It caters to your specific needs, in addition to the primary options of Credit Card, ' +
            'Debit Card and EMI. <br/> To use this option for making a payment, choose ‘FlexiPay’ in the checkout page.</div>',
        },
        {
          question: 'How does FlexiPay work?',
          answer:
            '<div>With FlexiPay- <span style="font-weight: bold">Pay Later in India</span>, you are offered a digital credit for up to 90 days. For a tenure of 30, ' +
            '60 or 90 days, the interest is debited from your account on the due date. The principal amount is recoverable ' +
            'at the end of the chosen tenure. <br/>' +
            'The most lucrative benefit of this product is the 15-day interest-free tenure, wherein only the principal ' +
            'amount is debited at the end of the selected tenure.</div>',
        },
        {
          question: 'How can I pay my FlexiPay charges?',
          answer:
            '<div>The due amount is automatically debited from your existing HDFC Bank Savings or Current Account.</div>',
        },
        {
          question: 'How do I use FlexiPay?',
          answer:
            '<div>There are five simple steps to follow to use this service:<br/>' +
            '<div>1) Select HDFC Bank FlexiPay- <span style="font-weight: bold">Buy Now Pay Later</span> at the checkout page on the website.<br/>' +
            '<div>2) Enter your HDFC Bank Registered mobile number.<br/>' +
            '<div>3) Select the preferred tenure of your choice, enter the last 4- digits of your HDFC Bank Debit ' +
            'Card. Select the terms and conditions checkbox to proceed further. .<br/>' +
            '<div>4) Enter the OTP received on your mobile number to confirm the transaction.<br/>' +
            '<div>5)You are done.<br/>' +
            '</div>',
        },
        {
          question:
            'Whom do I contact in case of any further queries regarding the loan?',
          answer:
            '<div>You can raise your queries with our phone banking team at toll free number <a href="tel:1800-2678-678">1800 2678 678</a> or ' +
            'write to us at our email id <a href="mailto:loansupport@hdfcbank.com">loansupport@hdfcbank.com</a></div>',
        },
      ],
    },
    {
      lenderId: '102',
      subHeaderId: 'Federal Bank',
      subSectionDetails: [
        {
          question: 'How to buy online with Federal Bank Debit Card EMI?',
          answer:
            '<div>As a pre-approved customer of Federal Bank, you can shop on EMI at our partner merchants.' +
            '<div><br/></div>' +
            '<div>- On the checkout page, select the “InstaCred Cardless EMI" option</div>' +
            '<div>- Choose an "EMI Plan" that you are comfortable with</div>' +
            '<div>- To authorize your transaction, you need to enter the last 4-digits of your Federal Bank Debit and the OTP sent to your mobile by Federal Bank.</div>' +
            '<br/><div>To see the latest list of merchants where you can shop using EMI from Federal Bank, kindly log in to <a target="_blank" href="https://instacred.me/login" class="text-color cursorPointer">instacred.me</a> and navigate to Buy with InstaCred.</div>' +
            '<br/><div><span class="bold-text">Note:</span> InstaCred, Federal Bank, its associates, partners or representatives will NEVER ask for your Debit Card / OTP details. Please do not share your OTP/Debit Card Details with anyone.</div>' +
            '</div',
        },
        {
          question:
            'What can I buy with Federal Bank Debit Card EMI using InstaCred?',
          answer:
            '<div>As a Pre-approved customer of Federal Bank, you can buy Mobile phone, Electronics, Furniture, Education packages, Fashion &amp; beauty products, Insurance and many other products across categories. To see the latest list of merchants, please log in to <a target="_blank" href="https://instacred.me/login" class="text-color cursorPointer">instacred.me</a>  and navigate to Buy with InstaCred.</div>',
        },
        {
          question: 'How are transaction disputes resolved?',
          answer:
            "<div>To dispute a transaction at a merchant, please contact the merchant directly. If the merchant doesn't reply within 2 working days, you can write to us at <a  class='text-color cursorPointer' href='mailto:contact@flexmoney.in'>contact@flexmoney.in</a> and we will get back to you in 2 working days. If the merchant agrees for cancellation, Federal Bank will cancel the loan in their system once the Bank gets the complete amount from the merchant via InstaCred. Bank will cancel the loan, if any, after adjusting the applicable cancellation charges.</div>",
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>The loan is issued to you against purchases made at the Merchant. Your return policy is guided by the Merchant where you have made the purchase. Once the merchant initiates the refund for your product, this will be refunded back to your Bank in 2 business days. If the refund amount is less than the loan amount, then you will need to pay the balance amount to the bank. We recommend that you check with Federal Bank to determine the balance payable in case of refunds.</div>',
        },
      ],
    },
    {
      lenderId: '601',
      subHeaderId: 'Home Credit',
      subSectionDetails: [
        {
          question: 'How do I shop online using Home Credit InstaCred EMI?',
          answer:
            '<div>As a valued Home Credit customer, you are eligible to purchase online on multiple merchant websites and convert it into easy EMIs. On our merchant page, you simply need to select the product of your choice, add the same in your cart and proceed with an EMI payment.</div>' +
            '<div>On the checkout page, select the “InstaCred Cardless EMI" option</div>' +
            '<div><ul>' +
            '<li>On the checkout page, select the “InstaCred Cardless EMI" option</li>' +
            '<li>Choose an "EMI Plan" that you are comfortable with</li>' +
            '<li>To authorize your transaction, you will be required to enter last 4-digits of your Ujjwal Card number</li>' +
            '<li>Confirm your transaction by entering the OTP received on your registered mobile number from Home Credit.</li>' +
            '</ul>' +
            '<div>To check the updated list of merchants, where you can buy using your Home Credit InstaCred EMI, please log in to instacred. Please note, InstaCred, Home Credit, HCIN representatives, merchants will NEVER ask for your Ujjwal Card / OTP details. Please do not share these details with anyone.</div>' +
            '</div>',
        },
        {
          question:
            'What products can I purchase using InstaCred EMI from Home Credit?',
          answer:
            '<div>You can purchase Mobile phones, Electronics, Furniture, Education, Fashion & beauty products, Flight tickets, Hotel bookings, Travel packages, and many other products across different categories. You can check the updated list by logging in and then navigate to buy with InstaCred.</div>',
        },
        {
          question:
            'Where can I contact if there is any issue with my transaction?',
          answer:
            '<div>For any transaction related queries, please contact the merchant. In case you do not receive an update from the merchant, please contact InstaCred. You can write to us at <a href="contact@flexmoney.in">contact@flexmoney.in</a> and we will get back to you within 2 working days. In case the merchant agrees for cancellation, Home Credit will cancel the loan in their system once the Lender gets the complete amount from the merchant via InstaCred. Lender will cancel the loan, after adjusting the applicable cancellation charges (If any).</div>',
        },
        {
          question: 'Are there any extra charges to avail this service?',
          answer:
            '<div>No, there is no fee when you purchase using InstaCred Cardless EMI. The interest rate as per the chosen EMI plan will be applicable. For more details about Home Credit loan & applicable charges, please visit the website <a href="www.homecredit.co.in">www.homecredit.co.in</a> </div>',
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>The loan is issued to you against your purchase made at our merchant partner & the return policy is guided by the merchant. Once the merchant initiates the refund for your product, this will be refunded back to your lender. If the refund amount is less than the loan amount, then you will need to pay the balance amount to the lender. We suggest you contact Home Credit to know the balance payable in case of refund.</div>',
        },
        {
          question: 'How can I get the details of my Ujjwal Card?',
          answer:
            '<div>Your Ujjwal card details are available on the Home Credit App [App Link] under customer profile section. Alternatively, you can send an email to Home Credit at <a href="care@homecredit.co.in">care@homecredit.co.in</a> one of the representatives will revert to you within 24 – 48 hours.</a></div>',
        },
      ],
    },
    {
      lenderId: '701',
      subHeaderId: 'ICICI Bank Cardless EMI',
      subSectionDetails: [
        {
          question: 'How do I shop online using ICICI Bank Cardless EMI?',
          answer:
            '<div>As a valued ICICI bank customer, you are eligible to purchase online on multiple merchant websites and convert it into easy EMIs. On our merchant page, you need to select the product of your choice, add the same in your cart and proceed with an EMI payment.</div>' +
            '<div><ul>' +
            '<li>On the payment options page, select the "ICICI Bank Cardless EMI" option</li>' +
            '<li>Choose an "EMI Plan" that you are comfortable with</li>' +
            '<li>To authorize your transaction, you will be required to enter your PAN number</li>' +
            '<li>Confirm your transaction by entering the OTP received on your mobile number registered with ICICI Bank.</li>' +
            '</ul>' +
            '<div>To check the updated list of merchants, where you can buy using your ICICI Bank Cardless EMI, please log in to instacred.</div>' +
            '<div>If anyone contacts you stating that they are from InstaCred, ICICI Bank, ICICI Group representative or merchant, please do not share your PAN/OTP details with anyone.</div>' +
            '</div>',
        },
        {
          question:
            'What products can I purchase using ICICI Bank Cardless EMI?',
          answer:
            '<div>You can purchase Mobile phones, Electronics, Furniture, Education, Fashion & beauty products, Flight tickets, Hotel bookings, Travel packages, and many other products across different categories. You can check the updated list by logging in and then navigate to buy with InstaCred.</div>',
        },
        {
          question:
            'Where can I contact if there is an issue with my transaction?',
          answer:
            '<div>For any transaction related queries, please contact the merchant. In case you do not receive an update from the merchant, please contact InstaCred. You can write to us at <a href="contact@flexmoney.in">contact@flexmoney.in</a> and we will get back to you within 2 working days. In case the merchant agrees for cancellation, ICICI Bank will cancel the loan in their system once the Lender gets the complete amount from the merchant via InstaCred. The lender will cancel the loan, after adjusting the applicable cancellation charges (If any).</div>',
        },
        {
          question: 'Are there any extra charges to avail this service?',
          answer:
            '<div>No, there is no fee when you purchase using ICICI Bank Cardless EMI. The interest rate as per the chosen EMI plan will be applicable. For more details about ICICI Credit loan & applicable charges, please visit the website <a href="https://www.icicibank.com/">www.icicibank.com</a></div>',
        },
        {
          question: 'Who should I contact for the cancellation of Loan?',
          answer:
            '<div>Please contact the merchant where you bought your item to request a refund. They will initiate a refund as per their refund policy.  Once the merchant initiates the refund for your product, this will be refunded back to your lender. If the refund amount is less than the loan amount, then you will need to pay the balance amount to the lender. We suggest you contact ICICI Bank to know the balance payable in case of refund.</div>',
        },
      ],
    },
  ],
};

export const ntbFaqData = {
  headerText: 'Frequently Asked Questions',
  items: [
    {
      sectionName: '',
      sectionId: 'NTB',
      sectionDetails: [
        {
          question: 'What is InstaCred EMI?',
          answer:
            "<div style='margin-bottom:10px'>InstaCred EMI enables Cardless Instant EMI for Shopping, powers instant digital EMI from top Banks & NBFCs at your favourite online sites</div > " +
            '<div>With InstaCred Cardless EMI you can Buy Now, Pay Later, with EMI! Get Instant Credit Limit of up to ₹ 1 Lakh from leading Banks / NBFCs in Less than 5 Minutes! Shop on EMI for Mobile Phones, Watches, Laptops, Furniture and more at your favourite online sites.</div>',
        },
        {
          question: 'How can I apply for InstaCred EMI?',
          answer:
            '<div>Applying for InstaCred EMI is very simple! Just download the InstaCred <a href="https://play.google.com/store/apps/details?id=me.instacred.instantcredit" target="_blank">app</a> on your android phone from Goole Play Store and activate your InstaCred EMI in less than 5 mins! with a 100% online process</div>' +
            '<div>Activate in 4 easy steps:</div>' +
            '<div>' +
            '<ol>' +
            '<li>' +
            'Verify Mobile number' +
            '</li>' +
            '<li>' +
            'Complete KYC' +
            '</li>' +
            '<li>' +
            'Get Instant Approval' +
            '</li>' +
            '<li>' +
            'Set up auto-repayment' +
            '</li>' +
            '</ol>' +
            '</div>' +
            '<div>In case of any query, you can reach us at contact@flexmoney.in</div>',
        },
        {
          question:
            'What are the minimum documents required for my InstaCred EMI approval?',
          answer:
            '<div>You need the following</div>' +
            '<div>' +
            '<ol>' +
            '<li>' +
            'Valid PAN' +
            '</li>' +
            '<li>' +
            'Valid Aadhaar Number/Virtual Id (VID)' +
            '</li>' +
            '<li>' +
            'Bank Account Details to set up auto-repayment of EMI' +
            '</li>' +
            '</ol>' +
            '</div>',
        },
        {
          question: 'How long will it take to activate my InstaCred EMI?',
          answer:
            '<div>Generally it  takes less than 5 mins to get an activated InstaCred EMI. You can start shopping immediately after approval/activation at our partner websites</div>',
        },
        {
          question: 'Will I be charged for activating my InstaCred EMI?',
          answer:
            '<div>Yes there is a one time activation fee of Rs. 589(inc. taxes) which will be charged only at the time of your first purchase.</div>' +
            '<div>This fee is charged to you by your Bank. InstaCred does not charge you anything. There are no other additional fees or monthly charges</div>',
        },
        {
          question: 'Where can I use my InstaCred EMI?',
          answer:
            '<div>You can use Instacred EMI to pay on our partner websites</div>' +
            '<div>Partner websites are the online websites that accept payments through Instacred. You can check out the list <a href="https://instacred.me/buy?utm_campaign=202" target="_blank">here</a></div>',
        },
        {
          question: 'What can I purchase with my InstaCred EMI?',
          answer:
            '<div>Instacred EMI is available at all the top websites. Using Instacred EMI you can shop Mobiles & Electronics, Fashion & Clothing, Travel & Holidays, Furniture, Insurance etc. You can find out more about the websites <a href="https://instacred.me/buy?utm_campaign=202" target="_blank">here</a></div>',
        },
        {
          question:
            'Is there a limit on how many purchases I can have with InstaCred EMI?',
          answer:
            '<div>You can purchase on multiple websites, multiple times using Instacred EMI as long as you have sufficient balance in your available credit limit</div>',
        },
        {
          question: 'Why was my InstaCred EMI not approved?',
          answer:
            '<div>Approval/Rejection of Instacred EMI application is solely at the discretion of the lending partner (Bank/NBFC). Our Partner Bank/NBFC approves / rejects your application based on its internal policy and on the basis of the information available with it.</div>',
        },
        {
          question:
            'What can I do if my InstaCred EMI application is cancelled/rejected due to non-eligibility?',
          answer:
            '<div>Approval/Rejection is on the basis of the internal policy of the Bank and the information available with it at the time of processing your application. Policy of the Bank may change from time to time. You may re-apply after a few months time to check if you become eligible</div>',
        },
        {
          question: 'After purchase, how do I repay my EMIs?',
          answer:
            '<div>Your Loan is offered to you by your Bank. At the time of application, you can choose the Repayment Bank Account i.e. the Bank Account from which you want to pay your EMI. Once you complete the purchase using InstaCred EMI, your Bank will setup a loan account and deduct EMI from your chosen Bank Account.</div>' +
            '<div>Please ensure that your chosen repayment account is adequately funded to service the EMI amount</div>',
        },
        {
          question: 'Can I get Personal Loan with Instacred EMI?',
          answer:
            '<div>No. InstaCred EMI does not offer Personal Loans. We work with our lending partner and help you avail easy EMI option to fulfil your needs by shopping across our network of partner merchants</div>',
        },
        {
          question: 'How can I reach InstaCred for any queries?',
          answer: '<div>You can reach us at contact@flexmoney.in</div>',
        },
      ],
    },
  ],
};
