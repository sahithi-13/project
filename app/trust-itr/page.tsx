// "use client";
// import { useState } from "react";
// import { 
//   CheckCircle2, 
//   UploadCloud, 
//   RefreshCcw, 
//   ChevronLeft, 
//   ChevronRight 
// } from "lucide-react";

// export default function TrustITRPage() {
//   const [step, setStep] = useState(1);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleFinalNext = () => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       setIsProcessing(false);
//       setStep(3);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
//       <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-xl p-12 border border-slate-100
//         flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden">

//         {/* ================= HEADER ================= */}
//         <h1 className="text-3xl font-bold text-slate-800 mb-14 text-center">
//           Entity <span className="text-[#00a878]">Assessment Platform</span>
//         </h1>

//         {/* ================= PROGRESS ================= */}
//         {step < 3 && !isProcessing && (
//           <div className="flex items-center justify-between mb-20 px-12 relative w-full max-w-3xl">
//             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
//             {[1, 2, 3].map((num) => (
//               <div
//                 key={num}
//                 className={`z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
//                   step >= num
//                     ? "bg-[#00a878] text-white"
//                     : "bg-white border-2 border-slate-200 text-slate-400"
//                 }`}
//               >
//                 {num}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ================= PROCESSING ================= */}
//         {isProcessing ? (
//           <div className="flex flex-col items-center justify-center py-32 animate-in fade-in zoom-in">
//             <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878]
//               flex items-center justify-center mb-6">
//               <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
//             </div>
//             <p className="text-[#00a878] font-bold text-xl">
//               Processing your answers...
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* ================= STEP 1 ================= */}
//             {step === 1 && (
//               <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4">
//                 <div className="flex items-center gap-3 mb-10">
//                   <span className="bg-[#e6f7f1] text-[#00a878] px-4 py-1 rounded-full text-xs font-bold uppercase">
//                     Trust
//                   </span>
//                   <span className="text-slate-400 text-sm">
//                     Question 1 of 3
//                   </span>
//                 </div>

//                 <h2 className="text-[24px] font text-slate-500 mb-20 leading-relaxed text-center">
//                   Is your organization a charitable or religious trust, or registered
//                   under tax exemption schemes like 12AB or 10(23C)?
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
//                   {["Yes", "No"].map((opt) => (
//                     <label
//                       key={opt}
//                       className="flex items-center p-8 border-2 border-slate-100 rounded-2xl
//                         cursor-pointer transition-all hover:border-[#00a878] hover:bg-[#f0fdfa]"
//                     >
//                       <input
//                         type="radio"
//                         name="trust-q"
//                         className="w-6 h-6 accent-[#00a878] mr-6"
//                       />
//                       <span className="text-slate-600 font-bold text-xl">
//                         {opt}
//                       </span>
//                     </label>
//                   ))}
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setStep(2)}
//                     className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold
//                       flex items-center gap-2 hover:bg-[#00966a] transition-all"
//                   >
//                     Next <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* ================= STEP 2 ================= */}
//             {step === 2 && (
//               <div className="w-full max-w-3xl animate-in fade-in">
//                 <h2 className="text-[28px] font-bold text-slate-700 mb-10 text-center">
//                   Additional Entity Details
//                 </h2>

//                 <p className="text-slate-500 mb-20 text-lg text-center">
//                   Are you a registered political party under section 29A of the
//                   Representation of the People Act?
//                 </p>

//                 <div className="flex gap-10 mb-20">
//                   {["Yes", "No"].map((opt) => (
//                     <button
//                       key={opt}
//                       onClick={handleFinalNext}
//                       className="w-full p-8 border-2 border-slate-100 rounded-2xl
//                         font-bold transition-all hover:border-[#00a878] hover:bg-[#f0fdfa]"
//                     >
//                       {opt}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setStep(1)}
//                   className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600"
//                 >
//                   <ChevronLeft size={18} /> Back
//                 </button>
//               </div>
//             )}

//             {/* ================= STEP 3 ================= */}
//             {step === 3 && (
//               <div className="text-center py-24 flex flex-col items-center animate-in zoom-in-95">
//                 <CheckCircle2 size={60} className="text-[#00a878] mb-6" />

//                 <h2 className="text-2xl font-bold text-slate-700 mb-4">
//                   Based on your answers, the correct ITR form is:
//                 </h2>

//                 <div className="text-4xl font-black text-[#00a878] mb-10">
//                   ITR-5
//                 </div>

//                 <p className="text-slate-500 max-w-md mb-16 leading-relaxed text-lg">
//                   Upload your documents and relax — our tax experts will take it from here.
//                 </p>

//                 <div className="flex flex-col items-center gap-14">
//                   <button className="flex flex-col items-center gap-3 group">
//                     <div className="w-24 h-24 rounded-full bg-[#e6f7f1] flex items-center justify-center
//                       text-[#00a878] group-hover:scale-110 transition-transform shadow-md">
//                       <UploadCloud size={40} />
//                     </div>
//                     <span className="font-bold text-slate-600 text-lg">
//                       Upload Your ITR Docs
//                     </span>
//                   </button>

//                   <button
//                     onClick={() => setStep(1)}
//                     className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold
//                       hover:bg-[#00966a] transition-all shadow-lg"
//                   >
//                     Start New Assessment
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



// // "use client";
// // import { useState, useEffect } from "react";
// // import { CheckCircle2, UploadCloud, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

// // export default function TrustITRPage() {
// //   const [step, setStep] = useState(1);
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   // Trigger processing animation before showing result
// //   const handleFinalNext = () => {
// //     setIsProcessing(true);
// //     setTimeout(() => {
// //       setIsProcessing(false);
// //       setStep(3);
// //     }, 1500); // 1.5 second loading feel
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-6">
// //       <h1 className="text-3xl font-bold text-slate-800 mb-8">
// //         Entity <span className="text-[#00a878]">Assessment Platform</span>
// //       </h1>

// //       <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-12 relative overflow-hidden">
        
// //         {/* PROGRESS BAR */}
// //         {step < 3 && !isProcessing && (
// //           <div className="flex items-center justify-between mb-12 px-10 relative">
// //             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
// //             {[1, 2, 3].map((num) => (
// //               <div key={num} className={`z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
// //                 step >= num ? "bg-[#00a878] text-white" : "bg-white border-2 border-slate-200 text-slate-400"
// //               }`}>
// //                 {num}
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {isProcessing ? (
// //           /* PROCESSING VIEW (Your image 269e6d) */
// //           <div className="flex flex-col items-center justify-center py-20 animate-pulse">
// //             <div className="w-24 h-32 bg-[#00a878]/10 rounded-xl border-2 border-[#00a878] flex items-center justify-center mb-6">
// //                <RefreshCcw size={48} className="text-[#00a878] animate-spin" />
// //             </div>
// //             <p className="text-[#00a878] font-semibold text-lg">Processing your answers...</p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* STEP 1: THE SPECIFIC TRUST QUESTION (Your image 26a210) */}
// //             {step === 1 && (
// //               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
// //                 <div className="flex items-center gap-2 mb-6">
// //                   <span className="bg-[#e6f7f1] text-[#00a878] px-3 py-1 rounded-full text-xs font-bold uppercase">Trust</span>
// //                   <span className="text-slate-400 text-sm">Question 1 of 3</span>
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-700 mb-10 leading-relaxed">
// //                   Is your organization a charitable or religious trust, or registered under government tax exemption schemes like 12AB or 10(23C)?
// //                 </h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
// //                   {["Yes", "No"].map((opt) => (
// //                     <label key={opt} className="flex items-center p-6 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-[#00a878] hover:bg-[#f0fdfa] transition-all group">
// //                       <input type="radio" name="trust-q" className="w-6 h-6 accent-[#00a878] mr-6" />
// //                       <span className="text-slate-600 font-bold text-xl">{opt}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //                 <div className="flex justify-end">
// //                   <button onClick={() => setStep(2)} className="bg-[#00a878] text-white px-16 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#00966a] transition-all">
// //                     Next <ChevronRight size={20} />
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 2: PLACEHOLDER FOR REMAINING QUESTIONS */}
// //             {step === 2 && (
// //               <div className="animate-in fade-in duration-500">
// //                  <h2 className="text-2xl font-bold text-slate-700 mb-10">Additional Entity Details</h2>
// //                  <p className="text-slate-500 mb-10 text-lg">Are you a registered political party under section 29A of the Representation of the People Act?</p>
// //                  <div className="flex gap-4 mb-12">
// //                     <button onClick={handleFinalNext} className="w-full p-6 border-2 border-slate-100 rounded-2xl font-bold hover:border-[#00a878]">Yes</button>
// //                     <button onClick={handleFinalNext} className="w-full p-6 border-2 border-slate-100 rounded-2xl font-bold hover:border-[#00a878]">No</button>
// //                  </div>
// //                  <button onClick={() => setStep(1)} className="text-slate-400 font-bold flex items-center gap-1"><ChevronLeft size={18}/> Previous</button>
// //               </div>
// //             )}

// //             {/* STEP 3: RESULT ITR-5 (Your image 269e32) */}
// //             {step === 3 && (
// //               <div className="text-center animate-in zoom-in-95 duration-500 py-6">
// //                 <div className="flex justify-center mb-6">
// //                   <CheckCircle2 size={60} className="text-[#00a878]" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-700 mb-2">Thanks! Based on your answers, here's the right ITR form for you:</h2>
// //                 <div className="text-8xl font-black text-[#00a878] mb-8">ITR-5</div>
// //                 <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
// //                   For that, please upload your documents. Our tax experts are here why fear when we're near? Just relax, we've got this!
// //                 </p>
                
// //                 <div className="flex flex-col items-center gap-6">
// //                   <button className="flex flex-col items-center gap-2 group">
// //                     <div className="w-20 h-20 rounded-full bg-[#e6f7f1] flex items-center justify-center text-[#00a878] group-hover:scale-110 transition-transform shadow-inner">
// //                       <UploadCloud size={32} />
// //                     </div>
// //                     <span className="font-bold text-slate-600">Upload Your ITR Docs</span>
// //                   </button>
                  
// //                   <button onClick={() => setStep(1)} className="mt-6 bg-[#00a878] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#00966a] transition-all shadow-lg">
// //                     Start New Assessment
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }