import React, { useEffect } from 'react'; // Import useEffect
import { FaFileContract } from "react-icons/fa";
import Nav from '../../Components/Home/navbar';
import Footer from '../../Components/Home/Footer';

const TermsofService = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 md:px-12 py-8">
        {/* Terms and Conditions */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <FaFileContract className="mr-2" /> Terms and Conditions
          </h3>
          <p className="text-gray-700 mb-4">
            This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
          </p>
          <p className="text-gray-700 mb-4">
            This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name https://margda.com ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
          </p>
          <p className="text-gray-700 mb-4">
            The Platform is owned by Margdarshak Media, a company with its registered office at C-67A Nawada Housing Complex, Uttam Nager, New Delhi - 110059, India (hereinafter referred to as “Platform Owner”, 'we', 'us', 'our').
          </p>
          <p className="text-gray-700 mb-4">
            Your use of the Platform and services and tools are governed by the following terms and conditions (“Terms of Use”) as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If you transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, you shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by you which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
          </p>
          <p className="text-gray-700 mb-4">
            For the purpose of these Terms of Use, wherever the context so requires ‘you’, 'your' or ‘user’ shall mean any natural or legal person who has agreed to become a user/buyer on the Platform.
          </p>
          <p className="text-gray-700 mb-4">
            ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
          </p>
          <p className="text-gray-700 mb-4">
            The use of Platform and/or availing of our Services is subject to the following Terms of Use:
          </p>
          <p className="text-gray-700 mb-4">
            To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.
          </p>
          <p className="text-gray-700 mb-4">
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
          </p>
          <p className="text-gray-700 mb-4">
            Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.
          </p>
          <p className="text-gray-700 mb-4">
            The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents include and is not limited to the design, layout, look and graphics.
          </p>
          <p className="text-gray-700 mb-4">
            You acknowledge that unauthorised use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.
          </p>
          <p className="text-gray-700 mb-4">
            You agree to pay us the charges associated with availing the Services.
          </p>
          <p className="text-gray-700 mb-4">
            You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
          </p>
          <p className="text-gray-700 mb-4">
            You agree and acknowledge that website and the Services may contain links to other third-party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third-party websites. These links are provided for your convenience for provide further information.
          </p>
          <p className="text-gray-700 mb-4">
            You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.
          </p>
          <p className="text-gray-700 mb-4">
            You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
          </p>
          <p className="text-gray-700 mb-4">
            Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
          </p>
          <p className="text-gray-700 mb-4">
            These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.
          </p>
          <p className="text-gray-700 mb-4">
            All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi and Delhi.
          </p>
          <p className="text-gray-700 mb-4">
            All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsofService;