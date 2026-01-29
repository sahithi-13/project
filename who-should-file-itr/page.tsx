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
      <div className="h-14" />
        <div className="text-center px-6 max-w-3xl mx-auto mt-32">
          <p className="text-slate-800 text-lg font-bold md:text-xl max-w-4xl text-center leading-relaxed gap-8 w-full">
            Not sure if you must file? Don’t worry — send us your details today.
            Our tax experts will guide you!
          </p>
        </div>
      </div>
      <div className="h-20" />
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

