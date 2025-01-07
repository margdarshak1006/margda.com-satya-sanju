import React from "react";
import { FaMoneyBillWave, FaExchangeAlt, FaTruck, FaFileContract,FaShieldAlt  } from "react-icons/fa";

const MainFooter = () => {
  return (
    <footer className="bg-slate-50 text-gray-800 py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Refund and Cancellation Policy */}
        <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2" /> Refund and Cancellation Policy
          </h3>
          <p className="text-sm text-gray-600 mb-4">
          This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Cancellations will only be considered if the request is made within one day of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Margdarshak Media does not accept cancellation requests for digital services or software as a service. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within one day of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within one day of receiving the product. The customer service team after looking into your complaint will take an appropriate decision
          </p>
          <p className="text-sm text-gray-600 mb-4">
          In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them. 
          </p>
          <p className="text-sm text-gray-600 mb-4">
          In case of any refunds approved by Margdarshak Media, it will take 15 days for the refund to be processed to you
          </p>
        </div>

        {/* Return Policy */}
        <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaExchangeAlt className="mr-2" /> Return Policy
          </h3>
          <p className="text-sm text-gray-600 mb-4">
          We offer refund / exchange within first one day from the date of your purchase. If one day have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
          Shipping Policy
          </p>
        </div>

        {/* Shipping Policy */}
        <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaTruck className="mr-2" /> Shipping Policy
          </h3>
          <p className="text-sm text-gray-600 mb-4">
          The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within one day from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaFileContract className="mr-2" /> Terms and Conditions
          </h3>
          <p className="text-sm text-gray-600 mb-4">
          This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name https://margda.com ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
          </p>
          <p className="text-sm text-gray-600 mb-4">
          The Platform is owned by Margdarshak Media, a company with its registered office at C-67A Nawada Housing Complex, Uttam Nager, New Delhi - 110059, India (hereinafter referred to as “Platform Owner”, 'we', 'us', 'our')..
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Your use of the Platform and services and tools are governed by the following terms and conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If you transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, you shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by you which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          For the purpose of these Terms of Use, wherever the context so requires ‘you’, 'your' or ‘user’ shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
          </p>
          <p className="text-sm text-black-300 mb-4">
          The use of Platform and/or availing of our Services is subject to the following Terms of Use:
          </p>
          <p className="text-sm text-gray-600 mb-4">
          To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents include and is not limited to the design, layout, look and graphics.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          You acknowledge that unauthorised use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          You agree to pay us the charges associated with availing the Services.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          You agree and acknowledge that website and the Services may contain links to other third-party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third-party websites. These links are provided for your convenience for provide further information.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi and Delhi.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
          </p>
        </div>

        {/* Privacy Policy Section */}
        <div className="mb-12">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaShieldAlt className="mr-2" /> Privacy Policy
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Introduction
          </p>
          <p className="text-sm text-gray-600 mb-4">
          This Privacy Policy describes how Margdarshak Media and its affiliates (collectively “Margdarshak Media, we, our, us”) collect, use, share, protect or otherwise process your information/ personal data through our website https://margda.com (hereinafter referred to as Platform). Please note that you may be able to browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India. By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Collection - We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship and related information provided from time to time. Some of the information that we may collect includes but is not limited to personal data / information provided to us during sign-up/registering or using our Platform such as name, date of birth, address, telephone/mobile number, email ID and/or any such information shared as proof of identity or address. Some of the sensitive personal data may be collected with your consent, such as your bank account or credit or debit card or other payment instrument information or biometric information such as your facial features or physiological information (in order to enable use of certain features when opted for, available on the Platform) etc all of the above being in accordance with applicable law(s) You always have the option to not provide information, by choosing not to use a particular service or feature on the Platform. We may track your behaviour, preferences, and other information that you choose to provide on our Platform. This information is compiled and analysed on an aggregated basis. We will also collect your information related to your transactions on Platform and such third-party business partner platforms. When such a third-party business partner collects your personal data directly from you, you will be governed by their privacy policies. We shall not be responsible for the third-party business partner’s privacy practices or the content of their privacy policies, and we request you to read their privacy policies prior to disclosing any information. If you receive an email, a call from a person/association claiming to be Margdarshak Media seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Usage - We use personal data to provide the services you request. To the extent we use your personal data to market to you, we will provide you the ability to opt-out of such uses. We use your personal data to assist sellers and business partners in handling and fulfilling orders; enhancing customer experience; to resolve disputes; troubleshoot problems; inform you about online and offline offers, products, services, and updates; customise your experience; detect and protect us against error, fraud and other criminal activity; enforce our terms and conditions; conduct marketing research, analysis and surveys; and as otherwise described to you at the time of collection of information. You understand that your access to these products/services may be affected in the event permission is not provided to us.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Sharing - We may share your personal data internally within our group entities, our other corporate entities, and affiliates to provide you access to the services and products offered by them. These entities and affiliates may market to you as a result of such sharing unless you explicitly opt-out. We may disclose personal data to third parties such as sellers, business partners, third party service providers including logistics partners, prepaid payment instrument issuers, third-party reward programs and other payment opted by you. These disclosures may be required for us to provide you access to our services and products offered to you, to comply with our legal obligations, to enforce our user agreement, to facilitate our marketing and advertising activities, to prevent, detect, mitigate, and investigate fraudulent or illegal activities related to our services. We may disclose personal and sensitive personal data to government agencies or other authorised law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process. We may disclose personal data to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to: enforce our Terms of Use or Privacy Policy; respond to claims that an advertisement, posting or other content violates the rights of a third party; or protect the rights, property or personal safety of our users or the general public.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          Security Precautions - To protect your personal data from unauthorised access or disclosure, loss or misuse we adopt reasonable security practices and procedures. Once your information is in our possession or whenever you access your account information, we adhere to our security guidelines to protect it against unauthorised access and offer the use of a secure server. However, the transmission of information is not completely secure for reasons beyond our control. By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Data Deletion and Retention - You have an option to delete your account by visiting your profile and settings on our Platform, this action would result in you losing all information related to your account. You may also write to us at the contact information provided below to assist you with these requests. We may in event of any pending grievance, claims, pending shipments or any other services we may refuse or delay deletion of the account. Once the account is deleted, you will lose access to the account. We retain your personal data information for a period no longer than is required for the purpose for which it was collected or as required under any applicable law. However, we may retain data related to you if we believe it may be necessary to prevent fraud or future abuse or for other legitimate purposes. We may continue to retain your data in anonymised form for analytical and research purposes.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Your Rights - You may access, rectify, and update your personal data directly through the functionalities provided on the Platform.

          </p>
          <p className="text-sm text-gray-600 mb-4">
          Consent - By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy. You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent that you have already provided by writing to the Grievance Officer at the contact information provided below. Please mention. Withdrawal of consent for processing personal data? in your subject line of your communication. We may verify such requests before acting on our request. However, please note that your withdrawal of consent will not be retrospective and will be in accordance with the Terms of Use, this Privacy Policy, and applicable laws. In the event you withdraw consent given to us under this Privacy Policy, we reserve the right to restrict or deny the provision of our services for which we consider such information to be necessary.
          </p>
          <p className="text-sm text-gray-600 mb-4">
          Changes to this Privacy Policy- Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We may alert / notify you about the significant changes to the Privacy Policy, in the manner as may be required under applicable laws.

          </p>
          <p className="text-sm text-gray-600 mb-4">
            Grievance Officer
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Insert Name of the Office: Ms Mani Mala
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Designation: Manager
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Insert Name and Address of the Company: Margdarshak Media, C-67A Nawada Howsing Complex, Dwarka Mor Metro, New Delhi – 110059.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Contact us: +917965174000
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Phone: Time: Monday – Friday (9:00 - 18:00)
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">&copy; 2025 Margdarshak Media. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;