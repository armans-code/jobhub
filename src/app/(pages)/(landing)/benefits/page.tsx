import BenefitCard from "@/components/landing/benefit-card";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function Page() {
  return (
    <main className="w-full py-12 space-y-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-x-16">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-semibold">Benefits</h2>
            <p className="text-md text-gray-800 line-clamp-3">
              Fueling Your Journey, Balancing Your Life: Unlock Your Potential
              with Us – Where Every Team Member Enjoys Robust Benefits for
              Personal and Professional Growth.
            </p>
          </div>
          <div>
            <Image
              className="rounded-xl"
              src="/workplace.jpg"
              width={600}
              height={540}
              alt="Workplace"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-3 gap-8 items-center">
          <BenefitCard
            title="Comprehensive Health Coverage"
            description="Enjoy peace of mind with our extensive health coverage, providing
              access to top-notch medical, dental, and vision care. Your
              well-being is our priority, ensuring you and your dependents are
              covered for a healthier life."
          />
          <BenefitCard
            title="Professional Development Opportunities"
            description="Propel your career forward with ongoing professional development
              initiatives. From workshops to mentorship programs, we invest in
              your growth, helping you achieve your full potential and stay
              ahead in your field."
          />
          <BenefitCard
            title="Flexible Work Arrangements"
            description="Embrace a work environment that values your time and individual
              needs. Our flexible work arrangements empower you to maintain a
              healthy work/life balance, fostering productivity and satisfaction
              in your professional and personal life."
          />
          <BenefitCard
            title="Retirement Savings Plans"
            description="Secure your financial future with our robust retirement savings
              plans. We understand the importance of long-term financial
              stability, offering investment options and employer contributions
              to support you in building a nest egg for the years ahead."
          />
          <BenefitCard
            title="Employee Assistance Program (EAP)"
            description="Your well-being matters beyond the workplace. Our Employee
              Assistance Program provides confidential support services,
              ensuring you have access to resources for mental health, stress
              management, and personal challenges, promoting a holistic approach
              to your overall wellness."
          />
          <BenefitCard
            title="Generous Paid Time Off (PTO)"
            description="Recharge and rejuvenate with our generous paid time off policy.
              Whether it's for vacations, personal milestones, or well-deserved
              breaks, we recognize the importance of downtime and encourage you
              to take the time you need to refresh and come back to work
              energized."
          />
        </div>
      </section>
    </main>
  );
}

export default Page;
