"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

import { 
  User, 
  Briefcase, 
  Building2, 
  Globe, 
  TrendingUp, 
  Home, 
  Landmark, 
  Calculator
} from 'lucide-react';

const ITRFilingPage = () => {
  const router = useRouter();
  const [regime, setRegime] = useState('');
  const [ay, setAy] = useState('2026-27');
  const isFormValid = ay !== "" && regime !== "";

  const categories = [
    { title: "Salaried Employee", desc: "Claim TDS refunds and stay compliant.", icon: <User size={28} /> },
    { title: "Freelancer / Consultant", desc: "Income from freelancing or gig work.", icon: <Briefcase size={28} /> },
    { title: "Business Owner", desc: "Proprietors, SMEs, and startups.", icon: <Building2 size={28} /> },
    { title: "NRI", desc: "Income earned in India and DTAA benefits.", icon: <Globe size={28} /> },
    { title: "Stock / Crypto Trader", desc: "Capital gains or losses.", icon: <TrendingUp size={28} /> },
    { title: "Rental Income", desc: "Income from house or commercial property.", icon: <Home size={28} /> },
    { title: "Bank Interest", desc: "Refund TDS deducted on interest.", icon: <Landmark size={28} /> },
    { title: "Home Loan Borrower", desc: "Claim deductions on loan interest.", icon: <Calculator size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-24 px-6 flex flex-col items-center font-sans text-[#1e293b]">

      {/* FIRST BLOCK */}
      <div className="w-full max-w-7xl flex flex-col items-center space-y-20 mb-40">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Who Should File Their ITR in 2026?
        </h2>

        <p className="text-slate-500 text-lg md:text-xl max-w-4xl text-center leading-relaxed">
          Filing your Income Tax Return (ITR) for AY 2026–27 is a smart financial decision
          that protects your future, ensures compliance, and helps you claim your rightful tax refunds.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center text-[#2bb673]">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        {/* GAP BETWEEN FIRST & SECOND BLOCK */}
      <div className="h-14" />


        {/* 👇 SPACE ADDED AFTER "guide you" */}
        <div className="text-center px-6 max-w-3xl mx-auto mt-32">
          <p className="text-slate-800 text-lg font-bold md:text-xl max-w-4xl text-center leading-relaxed gap-8 w-full">
            Not sure if you must file? Don’t worry — send us your details today.
            Our tax experts will guide you!
          </p>
        </div>
      </div>
      <div className="h-20" />


      {/* SECOND BLOCK */}
      <div className="w-full max-w-4xl space-y-32">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">

          <div className="pt-32 pb-16 px-10 text-center border-b border-slate-50 space-y-20 mb-40">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              File Your <span className="text-[#00d29d]">Income Tax Return</span>
              <br />By Yourself
            </h2>

            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              <span className="font-bold text-slate-700">eTaxMentor</span> makes ITR filing simple,
              smart, and stress-free. Our intelligent assistant guides you step-by-step.
            </p>
          </div>
          <div className="h-10" />
          {/* Selection */}
          <div className="p-12 md:p-16 bg-[#f1f5f9]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
              
              <div className="flex flex-col space-y-6">
                <label className="font-bold">Assessment Year</label>
                <div className="h-6" />
                <select
                  value={ay}
                  onChange={(e) => setAy(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00d29d]/20 focus:border-[#00d29d] transition-all shadow-sm"
                >
                  
                  <option value="">Please Select Assessment Year</option>
                  <option value="2025-26">FY 2025-26 (AY 2025-26)</option>
                  <option value="2025-26">FY 2024-25 (AY 2024-25)</option>
                  <option value="2025-26">FY 2023-24 (AY 2023-24)</option>
                  <option value="2025-26">FY 2022-23 (AY 2022-23)</option>
                  <option value="2025-26">FY 2021-22 (AY 2021-22)</option>
                  <option value="2025-26">FY 2020-21 (AY 2020-21)</option>
                  <option value="2025-26">FY 2019-20 (AY 2019-20)</option>
                  <option value="2025-26">FY 2018-19 (AY 2018-19)</option>
                  <option value="2025-26">FY 2017-18 (AY 2017-18)</option>
                  <option value="2025-26">FY 2016-17 (AY 2016-17)</option>
                  <option value="2025-26">FY 2015-16 (AY 2015-16)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-8">
                <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                  Select Your Regime
                </label>
                
                <div className="flex flex-col space-y-6">
                  {['old', 'new'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setRegime(type)}
                      className={`flex items-center p-5 border rounded-xl cursor-pointer transition-all ${
                        regime === type
                          ? 'border-[#00d29d] bg-white shadow-sm'
                          : 'border-slate-200 bg-white/50 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        regime === type ? 'border-[#00d29d]' : 'border-slate-300'
                      }`}>
                        
                        {regime === type && <div className="w-2.5 h-2.5 bg-[#00d29d] rounded-full" />}
                      </div>
                      <span className={`ml-4 font-bold capitalize ${
                        regime === type ? 'text-slate-900' : 'text-slate-500'
                      }`}>
                        {type} Regime
                      </span>
                      <div className="h-10" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <div className="h-12" />
            <div className="mt-28 flex justify-center">
              <div className="h-12" />
              <button
                type="button"
                disabled={!isFormValid}
                onClick={() => router.push("/who-should-file-itr/status")}
                className={`font-bold py-4 px-20 rounded-xl uppercase tracking-wider text-sm transition-all shadow-md
                  ${
                    isFormValid
                      ? "bg-[#2bb673] hover:bg-[#229e60] text-white hover:shadow-lg cursor-pointer"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  }`}
              >
                Continue
              </button>

              {/* <button
                type="button"   // IMPORTANT
                onClick={() => router.push("/who-should-file-itr/status")}
                className="bg-[#2bb673] hover:bg-[#229e60] text-white font-bold
                          py-4 px-20 rounded-xl transition-all shadow-md
                          hover:shadow-lg uppercase tracking-wider text-sm"
              >
                Continue
              </button> */}

              {/* <button className="bg-[#2bb673] hover:bg-[#229e60] text-white font-bold py-4 px-20 rounded-xl transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm">
                Continue
              </button> */}
              
            </div>
            <div className="h-12" />
          </div>
        </div>
        <div className="h-20" />
      </div>


    </div>
  );
};

export default ITRFilingPage;










// "use client";

// import React, { useState } from "react";
//  import { useRouter } from "next/navigation";
// import {
//   User,
//   Briefcase,
//   Building2,
//   Globe,
//   TrendingUp,
//   Home,
//   Landmark,
//   Calculator,
// } from "lucide-react";

// export default function WhoShouldFileITR() {
//   const router = useRouter();
//   const [regime, setRegime] = useState("");
//   const [ay, setAy] = useState("2026-27");

//   const categories = [
//     { title: "Salaried Employee", desc: "Claim TDS refunds and stay compliant.", icon: <User size={28} /> },
//     { title: "Freelancer / Consultant", desc: "Income from freelancing or gig work.", icon: <Briefcase size={28} /> },
//     { title: "Business Owner", desc: "Proprietors, SMEs, and startups.", icon: <Building2 size={28} /> },
//     { title: "NRI", desc: "Income earned in India and DTAA benefits.", icon: <Globe size={28} /> },
//     { title: "Stock / Crypto Trader", desc: "Capital gains or losses.", icon: <TrendingUp size={28} /> },
//     { title: "Rental Income", desc: "Income from house or commercial property.", icon: <Home size={28} /> },
//     { title: "Bank Interest", desc: "Refund TDS deducted on interest.", icon: <Landmark size={28} /> },
//     { title: "Home Loan Borrower", desc: "Claim deductions on loan interest.", icon: <Calculator size={28} /> },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f8fafc] py-24 px-6 flex flex-col items-center">

//       {/* CATEGORIES */}
//       <div className="max-w-7xl w-full space-y-16">
//         <h2 className="text-4xl font-bold text-center">
//           Who Should File Their ITR in 2026?
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {categories.map((item, i) => (
//             <div key={i} className="bg-white p-8 rounded-2xl text-center shadow-sm">
//               <div className="mb-3 text-green-500">{item.icon}</div>
//               <h3 className="font-bold">{item.title}</h3>
//               <p className="text-sm text-slate-500">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FORM */}
//       <div className="max-w-4xl w-full bg-white mt-32 p-16 rounded-3xl shadow">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

//           <div>
//             <label className="font-bold">Assessment Year</label>
//             <select
//               value={ay}
//               onChange={(e) => setAy(e.target.value)}
//               className="w-full mt-4 p-4 border rounded-xl"
//             >
//               <option value="">Please Select Assessment Year</option>
//               <option value="2026-27">FY 2025-26 (AY 2026-27)</option>
//             </select>
//           </div>

//           <div>
//             <label className="font-bold">Select Regime</label>
//             {["old", "new"].map((type) => (
//               <div
//                 key={type}
//                 onClick={() => setRegime(type)}
//                 className={`mt-4 p-4 border rounded-xl cursor-pointer ${
//                   regime === type ? "border-green-500" : ""
//                 }`}
//               >
//                 {type} Regime
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-16 text-center">
//           <button
//             onClick={() => router.push("/who-should-file-itr/status")}
//             className="bg-green-500 text-white px-16 py-4 rounded-xl font-bold"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );








// "use client";

// import React, { useState } from "react";
// import {
//   User,
//   Users,
//   Building,
//   Briefcase,
//   Building2,
//   Globe,
//   TrendingUp,
//   Home,
//   Landmark,
//   Calculator,
//   Scale,
// } from "lucide-react";

// const ITRFilingPage = () => {
//   // STEP CONTROL
//   const [step, setStep] = useState<"form" | "status">("form");
//   const [regime, setRegime] = useState("");
//   const [ay, setAy] = useState("2026-27");

//   /* =========================
//      PAGE 1 – CATEGORIES
//   ========================= */
//   const categories = [
//     { title: "Salaried Employee", desc: "Claim TDS refunds and stay compliant.", icon: <User size={28} /> },
//     { title: "Freelancer / Consultant", desc: "Income from freelancing or gig work.", icon: <Briefcase size={28} /> },
//     { title: "Business Owner", desc: "Proprietors, SMEs, and startups.", icon: <Building2 size={28} /> },
//     { title: "NRI", desc: "Income earned in India and DTAA benefits.", icon: <Globe size={28} /> },
//     { title: "Stock / Crypto Trader", desc: "Capital gains or losses.", icon: <TrendingUp size={28} /> },
//     { title: "Rental Income", desc: "Income from house or commercial property.", icon: <Home size={28} /> },
//     { title: "Bank Interest", desc: "Refund TDS deducted on interest.", icon: <Landmark size={28} /> },
//     { title: "Home Loan Borrower", desc: "Claim deductions on loan interest.", icon: <Calculator size={28} /> },
//   ];

//   /* =========================
//      PAGE 2 – STATUS INFO
//   ========================= */
//   const statusCards = [
//     { title: "Individual", icon: <User size={28} /> },
//     { title: "Hindu Undivided Family (HUF)", icon: <Users size={28} /> },
//     { title: "Firm (excluding LLP)", icon: <Building size={28} /> },
//     { title: "LLP", icon: <Briefcase size={28} /> },
//     { title: "Company", icon: <Building2 size={28} /> },
//     {
//       title: "Trust / Political Party / Institution / AOP / BOI / Local Authority",
//       icon: <Scale size={28} />,
//     },
//   ];

//   /* =========================
//      STEP 2 – STATUS PAGE
//   ========================= */
//   if (step === "status") {
//     return (
//       <div className="min-h-screen bg-white px-10 py-12">
//         <div className="max-w-7xl mx-auto">

//           <button
//             onClick={() => setStep("form")}
//             className="mb-6 text-[#00a878] font-semibold text-sm hover:underline"
//           >
//             ← Back to Assessment Selection
//           </button>

//           <h2 className="text-xl font-bold text-slate-800 mb-6">
//             Status Information:
//           </h2>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

//             {/* LEFT – STATUS CARDS */}
//             <div className="lg:col-span-5 grid grid-cols-2 gap-6">
//               {statusCards.map((item, index) => (
//                 <div
//                   key={index}
//                   className="h-36 bg-white border border-slate-200 rounded-2xl
//                              flex flex-col items-center justify-center text-center
//                              shadow-sm hover:shadow-md transition-all cursor-pointer"
//                 >
//                   <div className="w-16 h-16 rounded-full bg-[#eafff5]
//                                   flex items-center justify-center text-[#00a878] mb-4">
//                     {item.icon}
//                   </div>
//                   <p className="text-sm font-semibold text-slate-800 px-2">
//                     {item.title}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT – INFO BOX */}
//             <div className="lg:col-span-7">
//               <div className="h-[460px] bg-[#f2fdf9] border border-[#c7f0df]
//                               rounded-2xl flex items-center justify-center text-center px-12">
//                 <p className="text-slate-500 text-sm max-w-md leading-relaxed">
//                   Please select a status from the options on the left to see
//                   confirmation details here...
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     );
//   }
//   /* =========================
//      STEP 1 – FORM PAGE
//   ========================= */
//   return (
//     <div className="min-h-screen bg-[#f8fafc] py-24 px-6 flex flex-col items-center">

//       {/* CATEGORIES */}
//       <div className="w-full max-w-7xl flex flex-col items-center space-y-20 mb-40">
//         <h2 className="text-4xl md:text-5xl font-bold text-center">
//           Who Should File Their ITR in 2026?
//         </h2>

//         <p className="text-slate-500 text-lg max-w-4xl text-center">
//           Filing your Income Tax Return (ITR) for AY 2026–27 is a smart financial decision.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
//           {categories.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-10 rounded-2xl border border-slate-100
//                          flex flex-col items-center text-center shadow-sm"
//             >
//               <div className="w-14 h-14 bg-[#f0fdf4] rounded-full
//                               flex items-center justify-center text-[#2bb673] mb-3">
//                 {item.icon}
//               </div>
//               <h3 className="font-bold text-lg">{item.title}</h3>
//               <p className="text-slate-500 text-sm">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//        <div className="w-full max-w-4xl space-y-32">
//         <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">

//           <div className="pt-32 pb-16 px-10 text-center border-b border-slate-50 space-y-20 mb-40">
//             <h2 className="text-4xl md:text-5xl font-extrabold">
//               File Your <span className="text-[#00d29d]">Income Tax Return</span>
//               <br />By Yourself
//             </h2>

//             <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
//               <span className="font-bold text-slate-700">eTaxMentor</span> makes ITR filing simple,
//               smart, and stress-free. Our intelligent assistant guides you step-by-step.
//             </p>
//           </div>
//           <div className="h-10" />
//           {/* Selection */}
//           <div className="p-12 md:p-16 bg-[#f1f5f9]/30">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
              
//               <div className="flex flex-col space-y-6">
//                 <label className="font-bold">Assessment Year</label>
//                 <div className="h-6" />
//                 <select
//                   value={ay}
//                   onChange={(e) => setAy(e.target.value)}
//                   className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#00d29d]/20 focus:border-[#00d29d] transition-all shadow-sm"
//                 >
                  
//                   <option value="">Please Select Assessment Year</option>
//                   <option value="2025-26">FY 2025-26 (AY 2025-26)</option>
//                   <option value="2025-26">FY 2024-25 (AY 2024-25)</option>
//                   <option value="2025-26">FY 2023-24 (AY 2023-24)</option>
//                   <option value="2025-26">FY 2022-23 (AY 2022-23)</option>
//                   <option value="2025-26">FY 2021-22 (AY 2021-22)</option>
//                   <option value="2025-26">FY 2020-21 (AY 2020-21)</option>
//                   <option value="2025-26">FY 2019-20 (AY 2019-20)</option>
//                   <option value="2025-26">FY 2018-19 (AY 2018-19)</option>
//                   <option value="2025-26">FY 2017-18 (AY 2017-18)</option>
//                   <option value="2025-26">FY 2016-17 (AY 2016-17)</option>
//                   <option value="2025-26">FY 2015-16 (AY 2015-16)</option>
//                 </select>
//               </div>

//               <div className="flex flex-col space-y-8">
//                 <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">
//                   Select Your Regime
//                 </label>
                
//                 <div className="h-12">
//                   {['old', 'new'].map((type) => (
//                     <div
//                       key={type}
//                       onClick={() => setRegime(type)}
//                       className={`flex items-center p-5 border rounded-xl cursor-pointer transition-all ${
//                         regime === type
//                           ? 'border-[#00d29d] bg-white shadow-sm'
//                           : 'border-slate-200 bg-white/50 hover:border-slate-300'
//                       }`}
//                     >
//                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                         regime === type ? 'border-[#00d29d]' : 'border-slate-300'
//                       }`}>
                        
//                         {regime === type && <div className="w-2.5 h-2.5 bg-[#00d29d] rounded-full" />}
//                       </div>
//                       <span className={`ml-4 font-bold capitalize ${
//                         regime === type ? 'text-slate-900' : 'text-slate-500'
//                       }`}>
//                         {type} Regime
//                       </span>
//                       <div className="h-10" />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>
//             <div className="h-12" />
//             <div className="mt-28 flex justify-center">
//               <div className="h-12" />
//               <button
//                 onClick={() => setStep("status")}
//                 className="bg-[#2bb673] hover:bg-[#229e60] text-white font-bold py-4 px-20 rounded-xl uppercase"
//               >
//                 Continue
//             </button>
              
//             </div>
//             <div className="h-12" />
//           </div>
//         </div>
//         <div className="h-20" />
//       </div>      
//     </div>
//   );
// };
// export default ITRFilingPage;
