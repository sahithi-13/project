"use client";
import { useState } from "react";
import { 
  User, 
  Banknote, 
  Briefcase, 
  TrendingUp, 
  ChevronLeft,
  RefreshCcw,
  CheckCircle2,
  UploadCloud
} from "lucide-react";

export default function IndividualITRPage() {
  const [step, setStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(5);
    }, 2000);
  };

  const getITR = (source: string) => {
    switch (source) {
      case "Salary":
        return "ITR-1";
      case "Business":
        return "ITR-3";
      case "Capital Gains":
        return "ITR-2";
      default:
        return "ITR-1";
    }
  };

  const sourceOptions = [
    { id: "Salary", label: "Salary / Pension", icon: <Banknote size={28} /> },
    { id: "Business", label: "Business / Prof.", icon: <Briefcase size={28} /> },
    { id: "Capital Gains", label: "Capital Gains", icon: <TrendingUp size={28} /> },
    { id: "Others", label: "Other Sources", icon: <User size={28} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50
        flex flex-col items-center justify-center min-h-[550px]">

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 rounded-xl border-2 border-[#00a878] flex items-center justify-center mb-6">
              <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
            </div>
            <p className="text-[#00a878] font-bold text-xl">
              Processing your answers...
            </p>
          </div>

        ) : (
          <>
            {step === 1 && (
              <QuestionUI
                title="Individual Assessment"
                question="What is your residential status for this financial year?"
                options={[
                  "Resident and Ordinarily Resident (ROR)",
                  "Resident but Not Ordinarily Resident (RNOR)",
                  "Non-Resident (NR)",
                ]}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <QuestionUI
                title="Income Details"
                question="Is your total income exceeding the basic exemption limit (₹2.5L+ or as per age)?"
                options={["Yes", "No"]}
                onNext={() => setStep(3)}
                onPrev={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <QuestionUI
                title="Global Income"
                question="Do you hold any foreign assets or have income from outside India?"
                options={["Yes", "No"]}
                onNext={() => setStep(4)}
                onPrev={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <div className="text-center py-20 flex flex-col items-center animate-in fade-in">
                <h2 className="text-[32px] font-bold text-[#4e557d] mb-6">
                  Select Primary Income Source
                </h2>
                <p className="text-slate-500 mb-20 text-lg max-w-xl">
                  Choose where most of your income comes from
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 w-full max-w-3xl">
                  {sourceOptions.map((src) => (
                    <button
                      key={src.id}
                      onClick={() => handleSourceSelect(src.id)}
                      className="flex flex-col items-center justify-center p-10 border-2 border-slate-100 rounded-[2rem]
                        transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa]"
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-slate-50 text-slate-400
                        hover:bg-[#00a878] hover:text-white transition">
                        {src.icon}
                      </div>
                      <span className="font-bold text-sm text-slate-500 uppercase tracking-wide">
                        {src.label}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-24 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <CheckCircle2 size={56} className="text-[#00a878] mb-6" />
                <h2 className="text-2xl font-bold text-slate-700 mb-4">
                  Based on your answers, the right ITR form for you is:
                </h2>

                <div className="text-4xl font-black text-[#00a878] mb-10">
                  {getITR(selectedSource)}
                </div>

                <p className="text-slate-500 text-lg text-center max-w-md mb-16">
                  Upload your documents and relax — our tax experts will take it from here.
                </p>

                <div className="flex flex-col items-center gap-14">
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center 
                      text-[#00a878] group-hover:scale-110 transition-transform shadow-md">
                      <UploadCloud size={40} />
                    </div>
                    <span className="font-bold text-slate-600 text-lg">
                      Upload Your ITR Docs
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedSource("");
                    }}
                    className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold 
                      hover:bg-[#00966a] transition-all"
                  >
                    Start New Assessment
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function QuestionUI({ title, question, options, onNext, onPrev }: any) {
  return (
    <div className="flex justify-center animate-in fade-in">
      <div className="w-full max-w-3xl">

        <h2 className="text-[32px] font-bold text-[#4e557d] mb-10 text-center">
          {title}
        </h2>

        <p className="text-black font-bold text-xl mb-20 text-center">
          {question}
        </p>

        <div className="space-y-10 mb-20">
          {options.map((opt: string) => (
            <label
              key={opt}
              className="flex items-center p-8 border-2 border-slate-100 rounded-2xl cursor-pointer
                transition-all hover:border-[#00a878] hover:bg-[#f0fdfa]"
            >
              <input
                type="radio"
                name="q"
                className="w-6 h-6 accent-[#00a878] mr-6"
              />
              <span className="text-slate-600 font-bold text-lg">
                {opt}
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10">
          {onPrev ? (
            <button
              onClick={onPrev}
              className="flex items-center gap-1 text-slate-400 font-bold hover:text-slate-600"
            >
              <ChevronLeft size={20} /> Back
            </button>
          ) : <div />}

          <button
            onClick={onNext}
            className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold 
              hover:bg-[#00966a] transition-all"
          >
            Next Step
          </button>
        </div>

      </div>
    </div>
  );
}
