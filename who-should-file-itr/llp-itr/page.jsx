"use client";
import { useState, useEffect } from "react";
import { Building2, Briefcase, ChevronLeft, RefreshCcw, CheckCircle2, UploadCloud } from "lucide-react";

export default function LLPItrPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent Hydration Mismatch
  useEffect(() => setMounted(true), []);

  const startProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Show final ITR-5 result
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 text-center">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50 relative overflow-hidden flex flex-col items-center justify-center min-h-[550px]">

        {/* ================= PROCESSING ================= */}
        {isProcessing ? (
          <Processing message="Analyzing LLP Status..." />
        ) : (
          <>
            {/* STEP 1: Audit Requirement */}
            {step === 1 && (
              <QuestionStep
                title="LLP Assessment"
                question="Is the LLP's Turnover > 40 Lakhs or Contribution > 25 Lakhs?"
                options={["Yes, Audit Required", "No, Audit Not Required"]}
                onNext={() => setStep(2)}
              />
            )}

            {/* STEP 2: Income Source */}
            {step === 2 && (
              <SourceStep
                sources={[
                  { id: "Business", label: "Trading / Manufacturing", icon: <Building2 size={28} /> },
                  { id: "Professional", label: "Professional Services", icon: <Briefcase size={28} /> },
                ]}
                onNext={startProcessing}
                onPrev={() => setStep(1)}
              />
            )}

            {/* STEP 3: Result */}
            {step === 3 && (
              <FinalStep
                itrForm="ITR-5"
                description="Expert tax assistance for your LLP. Why fear when we're near?"
                uploadLabel="Upload LLP Documents"
                onReset={() => setStep(1)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =======================
   Processing Component
======================= */
function Processing({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878] flex items-center justify-center mb-6 relative">
        <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
        <div className="absolute -top-2 -right-2 text-yellow-400 font-serif">✦</div>
        <div className="absolute -bottom-2 -left-2 text-yellow-400 font-serif">✦</div>
      </div>
      <p className="text-[#00a878] font-bold text-xl tracking-tight">{message}</p>
    </div>
  );
}

/* =======================
   Question Step Component
======================= */
function QuestionStep({ title, question, options, onNext }) {
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-4">
      <h2 className="text-[32px] font-bold text-[#4e557d] mb-2">{title}</h2>
      <p className="text-black font-bold text-xl mb-10 text-center">{question}</p>

      <div className="w-full space-y-4 max-w-md mb-10">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center p-6 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#00a878] hover:bg-[#f0fdfa] transition-all group w-full text-left"
          >
            <input type="radio" name="llp-audit" className="w-6 h-6 accent-[#00a878] mr-6" />
            <span className="text-slate-600 font-bold text-lg group-hover:text-[#00a878]">{opt}</span>
          </label>
        ))}
      </div>

      <button
        onClick={onNext}
        className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold shadow-lg hover:bg-[#00966a] transition-all"
      >
        Next Step
      </button>
    </div>
  );
}

/* =======================
   Source Step Component
======================= */
function SourceStep({ sources, onNext, onPrev }) {
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in">
      <h2 className="text-[32px] font-bold mb-2 text-[#4e557d]">Income Source</h2>
      <p className="text-slate-500 mb-10 text-lg">Select primary field of operation for the LLP</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-2xl">
        {sources.map((src) => (
          <button
            key={src.id}
            onClick={onNext}
            className="flex flex-col items-center justify-center p-8 border-2 border-slate-100 rounded-[2rem] transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa] group"
          >
            <div className="mb-4 p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#00a878] group-hover:text-white transition-colors">
              {src.icon}
            </div>
            <span className="font-bold text-sm uppercase tracking-wider text-slate-500 group-hover:text-[#00a878]">
              {src.label}
            </span>
          </button>
        ))}
      </div>

      {onPrev && (
        <button
          onClick={onPrev}
          className="text-slate-400 font-bold flex items-center gap-1 hover:text-slate-600"
        >
          <ChevronLeft size={20} /> Back
        </button>
      )}
    </div>
  );
}

/* =======================
   Final Step Component
======================= */
function FinalStep({ itrForm, description, uploadLabel, onReset }) {
  return (
    <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-500 py-6">
      <CheckCircle2 size={50} className="text-[#00a878] mb-6" />
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Requirement Identified:</h2>
      <div className="text-4xl font-black text-[#00a878] mb-8">{itrForm}</div>
      <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed text-lg italic">{description}</p>

      <button className="flex flex-col items-center gap-3 group mb-6">
        <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center text-[#00a878] group-hover:scale-110 transition-transform shadow-md border border-[#00a878]/20">
          <UploadCloud size={40} />
        </div>
        <span className="font-bold text-slate-600 text-lg">{uploadLabel}</span>
      </button>

      <button
        onClick={onReset}
        className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold hover:bg-[#00966a] transition-all shadow-lg"
      >
        Start New Assessment
      </button>
    </div>
  );
}
