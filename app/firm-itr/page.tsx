"use client";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Briefcase, 
  ChevronLeft,
  RefreshCcw,
  CheckCircle2,
  UploadCloud 
} from "lucide-react";

export default function FirmFileITRPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix Hydration Error
  useEffect(() => { 
    setMounted(true); 
  }, []);

  const startProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50
        flex flex-col items-center justify-center min-h-[550px]">

        {/* ================= PROCESSING ================= */}
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in duration-500 text-center">
            <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878] 
              flex items-center justify-center mb-6 relative">
              <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
              <div className="absolute -top-2 -right-2 text-yellow-400 font-serif">✦</div>
              <div className="absolute -bottom-2 -left-2 text-yellow-400 font-serif">✦</div>
            </div>
            <p className="text-[#00a878] font-bold text-xl">
              Processing your answers...
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">

            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <div className="text-center flex flex-col items-center w-full animate-in fade-in slide-in-from-right-4">
                <h2 className="text-[32px] font-bold text-[#4e557d] mb-10">
                  Firm Assessment
                </h2>

                <p className="text-black font-bold text-xl mb-20 max-w-2xl">
                  Is the Firm liable for Audit under Section 44AB?
                </p>

                <div className="w-full space-y-10 max-w-md mb-20">
                  {["Yes, Audit Required", "No, Audit Not Required"].map((opt) => (
                    <label 
                      key={opt} 
                      className="flex items-center p-8 border-2 border-slate-100 rounded-2xl cursor-pointer
                        transition-all hover:border-[#00a878] hover:bg-[#f0fdfa]"
                    >
                      <input 
                        type="radio" 
                        name="audit" 
                        className="w-6 h-6 accent-[#00a878] mr-6" 
                      />
                      <span className="text-slate-600 font-bold text-lg">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(2)} 
                  className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold 
                    hover:bg-[#00966a] transition-all shadow-lg"
                >
                  Next Step
                </button>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <div className="text-center py-20 flex flex-col items-center w-full animate-in fade-in">
                <h2 className="text-[32px] font-bold text-[#4e557d] mb-6">
                  Select Income Source
                </h2>

                <p className="text-slate-500 mb-20 text-lg max-w-xl">
                  Choose the Firm&apos;s primary revenue source
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 w-full max-w-2xl">
                  {[
                    { id: "Business", label: "Business", icon: <Building2 size={28} /> },
                    { id: "Professional", label: "Professional Services", icon: <Briefcase size={28} /> }
                  ].map((src) => (
                    <button 
                      key={src.id}
                      onClick={startProcessing}
                      className="flex flex-col items-center justify-center p-10 border-2 border-slate-100 
                        rounded-[2rem] transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa]"
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-slate-50 text-slate-400
                        hover:bg-[#00a878] hover:text-white transition">
                        {src.icon}
                      </div>
                      <span className="font-bold text-sm uppercase tracking-wide text-slate-500">
                        {src.label}
                      </span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(1)} 
                  className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              </div>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <div className="text-center py-24 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <CheckCircle2 size={56} className="text-[#00a878] mb-6" />

                <h2 className="text-2xl font-bold text-slate-700 mb-4">
                  Based on the firm&apos;s details, file:
                </h2>

                <div className="text-4xl font-black text-[#00a878] mb-10">
                  ITR-5
                </div>

                <p className="text-slate-500 max-w-md mb-16 leading-relaxed text-lg italic">
                  “Expert tax assistance for your Firm. Why fear when we&apos;re near?”
                </p>
                
                <button className="flex flex-col items-center gap-3 group">
                  <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center 
                    text-[#00a878] group-hover:scale-110 transition-transform shadow-md 
                    border border-[#00a878]/20">
                    <UploadCloud size={40} />
                  </div>
                  <span className="font-bold text-slate-600 text-lg">
                    Upload Firm Documents
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// "use client";
// import { useState, useEffect } from "react";
// import { 
//   Building2, 
//   Briefcase, 
//   ChevronLeft,
//   RefreshCcw,
//   CheckCircle2,
//   UploadCloud 
// } from "lucide-react";

// export default function FirmFileITRPage() {
//   const [step, setStep] = useState(1);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Fixes the Hydration Error
//   useEffect(() => { setMounted(true); }, []);

//   const startProcessing = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setStep(3); // Result Step
//     }, 2000);
//   };

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
//       <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-50 relative overflow-hidden flex flex-col items-center">
        
//         {isProcessing ? (
//           /* NEAT CENTERED PROCESSING STATE */
//           <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500 text-center">
//             <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878] flex items-center justify-center mb-6 relative">
//                <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
//                <div className="absolute -top-2 -right-2 text-yellow-400 font-serif">✦</div>
//                <div className="absolute -bottom-2 -left-2 text-yellow-400 font-serif">✦</div>
//             </div>
//             <p className="text-[#00a878] font-bold text-xl tracking-tight">Processing your answers...</p>
//           </div>
//         ) : (
//           <div className="w-full flex flex-col items-center">
//             {/* STEP 1: AUDIT CHECK */}
//             {step === 1 && (
//               <div className="text-center flex flex-col items-center w-full animate-in fade-in slide-in-from-right-4">
//                 <h2 className="text-[32px] font-bold text-[#4e557d] mb-2">Firm Assessment</h2>
//                 <p className="text-black font-bold text-xl mb-10">Is the Firm liable for Audit under Section 44AB?</p>
//                 <div className="w-full space-y-4 max-w-md mb-10">
//                   {["Yes, Audit Required", "No, Audit Not Required"].map((opt) => (
//                     <label key={opt} className="flex items-center p-6 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#00a878] hover:bg-[#f0fdfa] transition-all group text-left">
//                       <input type="radio" name="audit" className="w-6 h-6 accent-[#00a878] mr-6" />
//                       <span className="text-slate-600 font-bold text-lg group-hover:text-[#00a878]">{opt}</span>
//                     </label>
//                   ))}
//                 </div>
//                 <button onClick={() => setStep(2)} className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold shadow-lg hover:bg-[#00966a] transition-all">
//                   Next Step
//                 </button>
//               </div>
//             )}

//             {/* STEP 2: SOURCE SELECTION */}
//             {step === 2 && (
//               <div className="text-center flex flex-col items-center w-full animate-in fade-in">
//                 <h2 className="text-[32px] font-bold mb-2 text-[#4e557d]">Select Income Source</h2>
//                 <p className="text-slate-500 mb-10 text-lg">Choose the Firm's primary revenue source</p>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-2xl">
//                   {[
//                     { id: "Business", label: "Business", icon: <Building2 size={28} /> },
//                     { id: "Professional", label: "Professional Services", icon: <Briefcase size={28} /> }
//                   ].map((src) => (
//                     <button 
//                       key={src.id}
//                       onClick={startProcessing}
//                       className="flex flex-col items-center justify-center p-8 border-2 border-slate-100 rounded-[2rem] transition-all duration-300 hover:border-[#00a878] hover:bg-[#f0fdfa] group"
//                     >
//                       <div className="mb-4 p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#00a878] group-hover:text-white transition-colors">
//                         {src.icon}
//                       </div>
//                       <span className="font-bold text-sm uppercase tracking-wider text-slate-500 group-hover:text-[#00a878]">{src.label}</span>
//                     </button>
//                   ))}
//                 </div>
//                 <button onClick={() => setStep(1)} className="text-slate-400 font-bold flex items-center gap-1 hover:text-slate-600">
//                   <ChevronLeft size={20} /> Back
//                 </button>
//               </div>
//             )}

//             {/* STEP 3: FINAL RESULT */}
//             {step === 3 && (
//               <div className="text-center flex flex-col items-center animate-in zoom-in-95 duration-500 py-6">
//                 <CheckCircle2 size={50} className="text-[#00a878] mb-6" />
//                 <h2 className="text-2xl font-bold text-slate-700 mb-2">Based on the firm's details, file:</h2>
//                 <div className="text-4xl font-black text-[#00a878] mb-8">ITR-5</div>
//                 <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed text-lg italic">
//                   "Expert tax assistance for your Firm. Why fear when we're near?"
//                 </p>
                
//                 <button className="flex flex-col items-center gap-3 group">
//                   <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center text-[#00a878] group-hover:scale-110 transition-transform shadow-md border border-[#00a878]/20">
//                     <UploadCloud size={40} />
//                   </div>
//                   <span className="font-bold text-slate-600 text-lg">Upload Firm Documents</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }